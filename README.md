# Rajvi B. — Portfolio

Full-stack personal portfolio with React frontend and FastAPI backend.

## Structure

```
rajvi-portfolio/
├── frontend/          # React + Vite app
└── backend/           # FastAPI + SQLite + Gmail SMTP
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # fill in your Gmail credentials
python main.py
```

## Environment Variables (backend/.env)
```
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # Google App Password (16 chars)
RECIPIENT_EMAIL=rajvibhatt21@gmail.com
FRONTEND_URL=http://localhost:5173
```

### How to get a Google App Password
1. Go to myaccount.google.com → Security
2. Enable 2-Step Verification
3. Search "App passwords" → Create one for "Mail"
4. Copy the 16-char password into .env
