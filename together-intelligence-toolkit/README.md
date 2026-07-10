# 🚀 Together Intelligence Toolkit

> **An AI-powered decision-support platform built for Together Fund that augments the early investment workflow — from startup discovery to AI diligence and founder routing.**

![Python](https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent-orange?style=for-the-badge)
![Groq](https://img.shields.io/badge/Groq-LLM-red?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-336791?style=for-the-badge&logo=postgresql)

---

## 📌 Overview

Together Intelligence Toolkit is a **full-stack AI platform** designed specifically for **Together Fund**, an operator-led AI venture capital firm.

Instead of building isolated AI agents, this project models the actual workflow of an investment team by combining **three connected but independently runnable AI systems**.

```text
        Discover
            ↓
        Evaluate
            ↓
          Route
```

---

# 🏗 System Architecture

<p align="center">
  <img src="docs/Together%20System%20Architecture.png" width="900"/>
</p>

---

# 🛰 Corridor Atlas

> AI-powered startup discovery engine.

<p align="center">
  <img src="docs/CorridorAtlas%20Agent%20Diagram.png" width="850"/>
</p>

### Features

- Discover startups from GitHub, Hacker News & arXiv
- Portfolio semantic similarity using pgvector
- "Why Together?" reasoning
- Confidence scoring
- Candidate generation
- Structured reports

---

# 🧠 AI MoatLens

> Multi-agent AI-native diligence engine.

<p align="center">
  <img src="docs/MoatLens%20Agent%20Diagram.png" width="850"/>
</p>

### Multi-Agent Workflow

```text
Bull Agent
      ↓
Bear Agent
      ↓
Reflection
      ↓
Synthesis
```

Evaluates:

- Wrapper Risk
- Model Dependency
- Data Moat
- Technical Defensibility
- AI Differentiation
- Human Review Recommendation

---

# 🧭 SwarmSpace Navigator

> Founder routing and pathway recommendation engine.

<p align="center">
  <img src="docs/SwarmSpace%20Agent%20Diagram.png" width="850"/>
</p>

### Recommends

- Investment
- AI Studio
- Research Lab
- Community
- Monitor

Generates:

- Routing Recommendation
- Confidence Score
- Interview Questions
- Human Review
- Missing Evidence

---

# 🔄 Complete Workflow

```text
GitHub + Hacker News + arXiv
              │
              ▼
      Corridor Atlas
              │
        Candidate Profile
              │
              ▼
        AI MoatLens
              │
      Diligence Report
              │
              ▼
   SwarmSpace Navigator
              │
              ▼
 Final Recommendation
```

---

# ⚙️ Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, Vite, TailwindCSS, shadcn/ui |
| Backend | FastAPI |
| AI Framework | LangGraph |
| LLM | Groq |
| Embeddings | sentence-transformers (all-MiniLM-L6-v2) |
| Database | Supabase PostgreSQL |
| Vector Search | pgvector |
| ORM | SQLAlchemy |
| Deployment | Vercel, Render, Supabase |

---

# 📂 Project Structure

```text
together-intelligence-toolkit/
│
├── backend/
├── frontend/
├── docs/
├── scripts/
└── README.md
```

---

# 📖 Technical Documentation

Detailed implementation, architecture decisions, and engineering write-up are available here:

➡️ **[Technical Writeup](docs/writeup.md)**

---

# 🚀 Quick Start

### Backend

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file using `.env.example`.

Required:

```text
GROQ_API_KEY
DATABASE_URL
SUPABASE_URL
SUPABASE_KEY
GITHUB_TOKEN
MODEL_NAME
EMBEDDING_MODEL
LOG_LEVEL
```

---

# 🌟 Future Roadmap

- Portfolio Pulse
- Founder Backchannel Briefing
- Founder Evolution Graph
- Institutional Memory
- Continuous Portfolio Monitoring

---

# 📌 Assignment Context

This project was developed as part of the **Together Fund Technical Intern Assignment**.

The objective was to design practical AI-powered decision-support systems tailored specifically to Together Fund's operator-led investment workflow.

---

<div align="center">

### ⭐ Built with FastAPI • LangGraph • Groq • React • PostgreSQL • pgvector ⭐

</div>
