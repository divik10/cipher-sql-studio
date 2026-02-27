# CipherSQLStudio

**CipherSQLStudio** is a fully deployed, browser-based SQL learning platform where users can practice SQL queries against pre-configured assignments using real sample data. The platform is designed for structured learning, experimentation, and guided problem-solving — not database creation.

All services (frontend, backend, databases, and LLM integration) are fully deployed and running in production.

---

##  Features

- Assignment listing categorized by difficulty levels (Easy / Medium / Hard)  
- Interactive SQL editor with real-time query execution  
- Intelligent, non-revealing hints powered by Google Gemini (LLM)  
- Query results and error feedback displayed in clean tabular format  
- Mobile-first, fully responsive UI  
- Robust error handling and graceful fallback mechanisms  
- Persistent user attempts stored securely  

---

##  Tech Stack

### Frontend
- React  
- Vite  
- SCSS (vanilla, mobile-first architecture)  

### Backend
- Node.js  
- Express.js  

### Databases
- PostgreSQL (read-only sandbox environment for SQL assignments)  
- MongoDB (for storing user attempts and progress)

### LLM Integration
- Google Gemini (Free Tier)

---

## Deployment

- Frontend: Deployed on Vercel  
- Backend: Deployed and fully operational  
- PostgreSQL: Hosted sandbox database for safe query execution  
- MongoDB: Cloud-hosted for persistent storage  

All APIs, database integrations, and LLM logic are fully implemented and connected in the deployed environment.

---

##  Project Scope

CipherSQLStudio is **not** a database creation tool.

All assignments and sample data are pre-configured by administrators. The platform focuses on:

- Writing SQL queries  
- Executing queries safely in a controlled environment  
- Understanding SQL concepts through practice  
- Guided learning via intelligent hints  

---

##  Author

**Divik Satija**
