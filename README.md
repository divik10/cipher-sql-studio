# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where users can practice SQL queries against pre-configured assignments using real sample data. The platform focuses on learning, experimentation, and guidance — not database creation.

---

## Features

- Assignment listing with difficulty levels (Easy / Medium / Hard)
- SQL editor with real-time query execution
- Intelligent, non-revealing hints using an LLM (Gemini)
- Query results and error feedback in tabular format
- Mobile-first, responsive user interface
- Graceful handling when backend services are unavailable

---

## Tech Stack

### Frontend
- React
- Vite
- SCSS (vanilla, mobile-first)

### Backend
- Node.js
- Express.js

### Databases
- PostgreSQL (read-only sandbox for assignments)
- MongoDB (for saving user attempts)

### LLM
- Google Gemini (Free Tier)

---

## Running the Project Locally

### Backend (Required for full functionality)

```bash
cd backend
npm install
npm run dev

The backend will start on:

http://localhost:4000

### Frontend
cd frontend
npm install
npm run dev

The frontend will run on:

http://localhost:5173

## Deployment Notes

The frontend is deployed on Vercel for demonstration purposes.

##The backend is intended to be run locally due to free-tier hosting limitations.

All backend APIs, database integrations, and LLM logic are fully implemented and documented.

The frontend gracefully displays informative messages if the backend is unavailable.

Project Scope

##This project is not a database creation tool.

All assignments and sample data are pre-inserted by administrators. The focus is on:

Writing SQL queries

Executing queries safely

Understanding SQL concepts

Guided learning through intelligent hints

Author

##Divik Satija
