"""
Rajvi B. Portfolio — FastAPI Backend
=====================================
POST /api/contact   → saves message to SQLite + sends Gmail notification
GET  /api/health    → health check
GET  /api/contacts  → list all messages (protect this in production)

Run:
    python main.py
    # or
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
POST /api/contact   → saves message to SQLite + sends Gmail notification
GET  /api/health    → health check
GET  /api/contacts  → list all messages (protect this in production)

Run:
    python main.py
    # or
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""

import logging
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, field_validator

from database import init_db, save_contact, get_all_contacts
from email_service import send_contact_email

# ── Config ────────────────────────────────────────────────────────────────────
load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("portfolio")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:2109")
HOST         = os.getenv("HOST", "0.0.0.0")
PORT         = int(os.getenv("PORT", 8000))


# ── Lifespan (startup / shutdown) ─────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up — initialising database …")
    await init_db()
    logger.info("Database ready.")
    yield
    logger.info("Shutting down.")


# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Rajvi B. Portfolio API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ───────────────────────────────────────────────────────────────────
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be empty.")
        if len(v) > 120:
            raise ValueError("Name is too long.")
        return v

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message cannot be empty.")
        if len(v) > 4000:
            raise ValueError("Message is too long (max 4000 chars).")
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str
    id: int | None = None


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "rajvi-portfolio-api"}


@app.post(
    "/api/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact form message",
)
async def contact(payload: ContactRequest, request: Request):
    """
    1. Validate the payload (Pydantic handles this).
    2. Save to SQLite.
    3. Fire Gmail notification (async, non-blocking to the response).
    4. Return success regardless of email status — message is already persisted.
    """
    ip = request.headers.get("X-Forwarded-For", request.client.host if request.client else None)

    # 1. Persist
    try:
        row_id = await save_contact(
            name=payload.name,
            email=payload.email,
            message=payload.message,
            ip=ip,
        )
        logger.info("Contact #%d saved — %s <%s>", row_id, payload.name, payload.email)
    except Exception as exc:
        logger.error("DB error: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save your message. Please try again.",
        )

    # 2. Email (fire-and-forget — failure is logged, not surfaced to user)
    email_sent = await send_contact_email(
        name=payload.name,
        email=payload.email,
        message=payload.message,
    )
    if not email_sent:
        logger.warning("Email notification skipped or failed for contact #%d", row_id)

    return ContactResponse(
        success=True,
        message="Your message has been received. I'll get back to you soon!",
        id=row_id,
    )


@app.get("/api/contacts", summary="List all contact submissions (admin)")
async def list_contacts():
    """
    ⚠️  Protect this endpoint in production!
    Add API-key auth or restrict to localhost before deploying publicly.
    """
    rows = await get_all_contacts()
    return {"count": len(rows), "contacts": rows}


# ── Validation error handler ───────────────────────────────────────────────────
from fastapi.exception_handlers import RequestValidationError
from fastapi.exceptions import RequestValidationError as PydanticValError

@app.exception_handler(PydanticValError)
async def validation_error_handler(request: Request, exc: PydanticValError):
    errors = exc.errors()
    first  = errors[0]["msg"] if errors else "Validation error."
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": first},
    )


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
