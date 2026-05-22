import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, ArrowUpRight, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Bitte gib deinen Namen an.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    if (!form.message.trim() || form.message.trim().length < 5)
      e.message = "Deine Nachricht ist zu kurz.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      if (res.data?.status === "success") {
        toast.success("Nachricht gesendet — ich melde mich bei dir!");
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else if (res.data?.status === "saved_email_failed") {
        toast.success(
          "Deine Nachricht wurde gespeichert. Ivan meldet sich bei dir.",
        );
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Etwas ist schiefgelaufen. Bitte versuche es erneut.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-40 max-w-7xl mx-auto px-6 md:px-12"
      data-testid="contact-section"
    >
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        {/* Left: heading + email */}
        <div className="col-span-12 lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#E6C229]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4C5B9]">
              04 — Kontakt
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-medium mb-8"
            data-testid="contact-title"
          >
            Lass uns{" "}
            <span className="italic font-light text-[#E6C229]">sprechen</span>.
          </motion.h2>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-12 max-w-md">
            Hast du ein Projekt im Kopf? Erzähl mir davon. Ich freue mich auf
            spannende Ideen, kreative Konzepte und neue Herausforderungen.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">
                Schreib mir direkt
              </p>
              <a
                href="mailto:ivanvilargomes@gmail.com"
                className="group inline-flex items-center gap-3 font-display text-2xl md:text-3xl text-white hover:text-[#E6C229] transition-colors"
                data-testid="contact-email-link"
              >
                <Mail className="text-[#E6C229]" size={22} />
                ivanvilargomes@gmail.com
                <ArrowUpRight
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  size={18}
                />
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">
                Ansprechpartner
              </p>
              <p className="text-lg">Ivan Vilar Gomes</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">
                Status
              </p>
              <p className="text-sm inline-flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E6C229] animate-pulse" />
                Verfügbar für neue Projekte
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="col-span-12 lg:col-span-7">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-10 md:p-16 text-center"
              data-testid="contact-success"
            >
              <div className="w-16 h-16 rounded-full bg-[#E6C229]/20 border border-[#E6C229] flex items-center justify-center mx-auto mb-6">
                <Send className="text-[#E6C229]" size={24} />
              </div>
              <h3 className="font-display text-3xl mb-4">
                Nachricht versendet.
              </h3>
              <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                Danke für deine Nachricht. Ich melde mich so schnell wie
                möglich bei dir zurück.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm uppercase tracking-[0.25em] text-[#E6C229] link-underline"
                data-testid="contact-reset-btn"
              >
                Weitere Nachricht senden
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={onSubmit}
              className="glass rounded-2xl p-8 md:p-12 space-y-8"
              data-testid="contact-form"
              noValidate
            >
              <FormField
                id="name"
                label="Wie ist dein Name?"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={errors.name}
                placeholder="Max Mustermann"
                testId="contact-name-input"
              />
              <FormField
                id="email"
                label="Deine E-Mail-Adresse"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={errors.email}
                placeholder="max@firma.de"
                testId="contact-email-input"
              />
              <FormField
                id="message"
                label="Deine Nachricht"
                type="textarea"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                error={errors.message}
                placeholder="Erzähl mir von deinem Projekt..."
                testId="contact-message-input"
              />

              <button
                type="submit"
                disabled={submitting}
                className="btn-magnetic group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E6C229] text-[#050505] font-medium text-sm uppercase tracking-wider relative overflow-hidden disabled:opacity-60"
                data-testid="contact-submit-btn"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Wird gesendet…
                    </>
                  ) : (
                    <>
                      Nachricht senden
                      <Send
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </span>
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  testId,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          data-testid={testId}
          className={`w-full bg-transparent border-b ${
            error ? "border-red-500" : "border-white/15"
          } focus:border-[#E6C229] outline-none pb-3 text-lg placeholder-neutral-600 transition-colors resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          data-testid={testId}
          className={`w-full bg-transparent border-b ${
            error ? "border-red-500" : "border-white/15"
          } focus:border-[#E6C229] outline-none pb-3 text-lg placeholder-neutral-600 transition-colors`}
        />
      )}
      {error && (
        <p
          className="mt-2 text-xs text-red-400"
          data-testid={`${testId}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
