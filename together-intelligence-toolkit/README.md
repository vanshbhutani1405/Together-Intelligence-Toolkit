# Together Intelligence Toolkit

Initial scaffold for the Together Intelligence Toolkit.

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Health check:

```bash
curl http://127.0.0.1:8000/health
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server defaults to `http://127.0.0.1:5173`.
