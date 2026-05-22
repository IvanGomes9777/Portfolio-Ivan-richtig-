"""Backend tests for Gomes Webdesign portfolio API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://webdesign-showcase-4.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- Health -----
class TestHealth:
    def test_health_ok(self, session):
        r = session.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"

    def test_root(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert "message" in r.json()


# ----- Contact: validation -----
class TestContactValidation:
    def test_missing_fields(self, session):
        r = session.post(f"{API}/contact", json={}, timeout=15)
        assert r.status_code == 422

    def test_invalid_email(self, session):
        payload = {"name": "TEST_User", "email": "not-an-email", "message": "Hallo, dies ist eine Testnachricht."}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_short_message(self, session):
        payload = {"name": "TEST_User", "email": "test@example.com", "message": "hi"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_empty_name(self, session):
        payload = {"name": "", "email": "test@example.com", "message": "Hallo, eine valide Testnachricht."}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422


# ----- Contact: happy path + persistence -----
class TestContactFlow:
    def test_create_and_persist(self, session):
        payload = {
            "name": "TEST_Ivan",
            "email": "test_user@example.com",
            "message": "TEST_MESSAGE - dies ist eine vollständige Testnachricht aus pytest.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        # acceptable statuses per spec
        assert data["status"] in ("success", "saved_email_failed")
        assert isinstance(data["message"], str) and len(data["message"]) > 0

        # GET list verifies persistence + _id exclusion
        r2 = session.get(f"{API}/contact", timeout=15)
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        assert len(items) >= 1
        # No _id field
        for it in items:
            assert "_id" not in it, f"Mongo _id leaked: {it}"
            assert "name" in it and "email" in it and "message" in it
            assert "created_at" in it

        # Our message should be in the list
        found = next((it for it in items if it.get("name") == "TEST_Ivan" and "TEST_MESSAGE" in it.get("message", "")), None)
        assert found is not None, "Persisted message not found in GET /api/contact"

    def test_contact_response_excludes_id_field(self, session):
        """Ensure list response objects do not contain MongoDB _id."""
        r = session.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        for it in r.json():
            assert "_id" not in it
