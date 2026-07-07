from fastapi import FastAPI

app = FastAPI(title="Together Intelligence Toolkit")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
