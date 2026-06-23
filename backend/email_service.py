"""
Email service using Gmail SMTP with a Google App Password.

Google App Password setup:
  1. Enable 2-Step Verification on your Google account
  2. Go to: myaccount.google.com → Security → App passwords
  3. Create one for "Mail" → copy the 16-character password
  4. Paste it into your .env as GMAIL_APP_PASSWORD
"""

import os
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import aiosmtplib

logger = logging.getLogger(__name__)

GMAIL_USER     = os.getenv("GMAIL_USER", "")
GMAIL_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "").replace(" ", "")   # strip spaces
RECIPIENT      = os.getenv("RECIPIENT_EMAIL", GMAIL_USER)

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587   # STARTTLS


def _build_html(name: str, email: str, message: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body     {{ font-family: 'Segoe UI', sans-serif; background: #0a0a0a; margin: 0; padding: 0; }}
        .wrap    {{ max-width: 560px; margin: 40px auto; background: #111; border: 2px solid #e8d5b0;
                   box-shadow: 4px 4px 0 #e8d5b0; padding: 32px; color: #f0ece4; }}
        .logo    {{ font-family: monospace; font-size: 1.1rem; font-weight: 700;
                   color: #e8d5b0; letter-spacing: -0.02em; margin-bottom: 24px; }}
        h2       {{ font-size: 1.3rem; margin-bottom: 20px; color: #f0ece4; }}
        .row     {{ margin-bottom: 16px; }}
        .lbl     {{ font-family: monospace; font-size: 0.65rem; color: #9a9489;
                   text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 4px; }}
        .val     {{ font-size: 0.95rem; color: #f0ece4; line-height: 1.6; }}
        .msg     {{ background: #181818; border-left: 3px solid #e8d5b0;
                   padding: 16px; margin-top: 4px; font-size: 0.9rem;
                   color: #a09a90; line-height: 1.75; white-space: pre-wrap; }}
        .footer  {{ margin-top: 28px; padding-top: 16px; border-top: 1px solid #222;
                   font-family: monospace; font-size: 0.62rem; color: #555; }}
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="logo">RAJVI B. · Portfolio</div>
        <h2>New Contact Message</h2>
        <div class="row">
          <div class="lbl">Name</div>
          <div class="val">{name}</div>
        </div>
        <div class="row">
          <div class="lbl">Email</div>
          <div class="val"><a href="mailto:{email}" style="color:#e8d5b0">{email}</a></div>
        </div>
        <div class="row">
          <div class="lbl">Message</div>
          <div class="msg">{message}</div>
        </div>
        <div class="footer">Sent via portfolio contact form · rajvibhatt21@gmail.com</div>
      </div>
    </body>
    </html>
    """


async def send_contact_email(name: str, email: str, message: str) -> bool:
    """
    Send a notification email to the portfolio owner via Gmail SMTP.
    Returns True on success, False on failure (so the caller can still
    return 200 — the message is already saved to SQLite).
    """
    if not GMAIL_USER or not GMAIL_PASSWORD:
        logger.warning("Gmail credentials not configured — skipping email.")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Portfolio Contact — {name}"
    msg["From"]    = f"Rajvi Portfolio <{GMAIL_USER}>"
    msg["To"]      = RECIPIENT
    msg["Reply-To"] = email

    # Plain-text fallback
    plain = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    msg.attach(MIMEText(plain, "plain"))
    msg.attach(MIMEText(_build_html(name, email, message), "html"))

    try:
        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=GMAIL_USER,
            password=GMAIL_PASSWORD,
            start_tls=True,
        )
        logger.info("Contact email sent to %s", RECIPIENT)
        return True
    except Exception as exc:
        logger.error("Failed to send email: %s", exc)
        return False
