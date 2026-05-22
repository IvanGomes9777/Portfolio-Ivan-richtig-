from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', 'ivanvilargomes@gmail.com')

# Create the main app without a prefix
app = FastAPI(title="Gomes Webdesign API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# =========================
# Models
# =========================
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=5, max_length=5000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_status: str = "pending"  # pending | sent | failed
    email_provider_id: str | None = None


class ContactResponse(BaseModel):
    id: str
    status: str
    message: str


# =========================
# Routes
# =========================
@api_router.get("/")
async def root():
    return {"message": "Gomes Webdesign API is live"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "gomes-webdesign"}


def _build_email_html(name: str, email: str, message: str) -> str:
    safe_message = message.replace("\n", "<br/>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#050505;padding:32px 0;font-family:Arial,sans-serif;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" border="0" style="background-color:#0A0A0A;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:32px;">
            <tr><td>
              <p style="margin:0;color:#E6C229;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Gomes Webdesign</p>
              <h1 style="margin:8px 0 24px 0;color:#FAFAFA;font-size:24px;font-weight:600;">Neue Kontaktanfrage</h1>
              <p style="margin:0 0 8px 0;color:#A3A3A3;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Name</p>
              <p style="margin:0 0 24px 0;color:#FAFAFA;font-size:16px;">{name}</p>
              <p style="margin:0 0 8px 0;color:#A3A3A3;font-size:12px;letter-spacing:2px;text-transform:uppercase;">E-Mail</p>
              <p style="margin:0 0 24px 0;color:#FAFAFA;font-size:16px;"><a href="mailto:{email}" style="color:#E6C229;text-decoration:none;">{email}</a></p>
              <p style="margin:0 0 8px 0;color:#A3A3A3;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Nachricht</p>
              <p style="margin:0;color:#FAFAFA;font-size:16px;line-height:1.6;">{safe_message}</p>
            </td></tr>
          </table>
          <p style="margin:24px 0 0 0;color:#525252;font-size:11px;">Gesendet von gomeswebdesign.com</p>
        </td>
      </tr>
    </table>
    """


async def _send_contact_email(name: str, email: str, message: str) -> tuple[str, str | None]:
    """Returns (status, provider_id)"""
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not configured – skipping email send")
        return "skipped", None
    params = {
        "from": f"Gomes Webdesign <{SENDER_EMAIL}>",
        "to": [CONTACT_RECIPIENT],
        "reply_to": email,
        "subject": f"Neue Kontaktanfrage von {name}",
        "html": _build_email_html(name, email, message),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        provider_id = result.get("id") if isinstance(result, dict) else None
        return "sent", provider_id
    except Exception as e:
        logger.error(f"Failed to send contact email: {e}")
        return "failed", None


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactCreate):
    contact = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        message=payload.message.strip(),
    )

    # Try to send email first (non-blocking via thread)
    status, provider_id = await _send_contact_email(contact.name, contact.email, contact.message)
    contact.email_status = status
    contact.email_provider_id = provider_id

    # Persist to MongoDB
    doc = contact.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as e:
        logger.error(f"Failed to persist contact message: {e}")
        raise HTTPException(status_code=500, detail="Nachricht konnte nicht gespeichert werden.")

    if status == "failed":
        # Saved but email failed
        return ContactResponse(
            id=contact.id,
            status="saved_email_failed",
            message="Deine Nachricht wurde gespeichert, aber der E-Mail-Versand ist fehlgeschlagen. Ivan wird sich trotzdem bei dir melden.",
        )

    return ContactResponse(
        id=contact.id,
        status="success",
        message="Vielen Dank! Deine Nachricht wurde erfolgreich übermittelt.",
    )


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts(x_admin_token: str | None = Header(default=None)):
    admin_token = os.environ.get("ADMIN_TOKEN")
    if not admin_token or x_admin_token != admin_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for item in items:
        if isinstance(item.get("created_at"), str):
            item["created_at"] = datetime.fromisoformat(item["created_at"])
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
