"""
Async SQLite database layer using aiosqlite.
Creates the contacts table on startup and provides helper functions.
"""

import aiosqlite
from pathlib import Path

DB_PATH = Path(__file__).parent / "contacts.db"


async def init_db() -> None:
    """Create tables if they don't exist."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                name       TEXT    NOT NULL,
                email      TEXT    NOT NULL,
                message    TEXT    NOT NULL,
                ip_address TEXT,
                created_at TEXT    DEFAULT (datetime('now'))
            )
        """)
        await db.commit()


async def save_contact(name: str, email: str, message: str, ip: str | None = None) -> int:
    """Insert a contact message and return the new row id."""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "INSERT INTO contacts (name, email, message, ip_address) VALUES (?, ?, ?, ?)",
            (name, email, message, ip),
        )
        await db.commit()
        return cursor.lastrowid


async def get_all_contacts() -> list[dict]:
    """Return all stored contact messages (for admin use)."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM contacts ORDER BY created_at DESC"
        )
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]
