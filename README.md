# Together Intelligence Toolkit

Together Intelligence Toolkit is a full-stack research and decision-support app for sourcing candidates, evaluating diligence, and routing recommendations. The backend is a FastAPI service with graph-driven workflows, and the frontend is a Vite + React interface that consumes those APIs.

## What it does

The product is organized around three backend workflows: Corridor discovers candidate companies, MoatLens synthesizes a diligence report for a saved candidate, and Navigator turns that diligence into a routing recommendation. The frontend provides dashboards and detail views for browsing candidates, reports, and history.

## Requirements

- Python 3.12+
- Node.js 18+
- A Postgres database with vector support
- API keys for Groq and GitHub

## Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Set these environment variables before starting the backend:

- `GROQ_API_KEY`
- `DATABASE_URL`
- `EMBEDDING_MODEL`
- `GITHUB_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `MODEL_NAME`
- `LOG_LEVEL`

Start the API:

```bash
uvicorn main:app --reload
```

Health check:

```bash
curl http://127.0.0.1:8000/health
```

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Optional frontend environment variable:

- `VITE_API_URL` default: `http://localhost:8000`

The dev server runs at `http://127.0.0.1:5173`.

## Main API endpoints

- `POST /api/corridor/discover` with `{ "query": "AI infrastructure startups" }`
- `POST /api/moatlens/evaluate` with `{ "candidate_id": 1 }`
- `POST /api/navigator/route` with `{ "candidate_id": 1, "application_text": "..." }`

## Helper scripts

Backend utilities live in `backend/scripts/` and include table creation and portfolio seeding.

## Deployment

The repo includes a `render.yaml` for backend deployment. The frontend is meant to be deployed separately.
