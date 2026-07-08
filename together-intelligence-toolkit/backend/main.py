from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.corridor import router as corridor_router
from app.core.config import settings
from app.utils.logger import get_logger

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator[None, None]:
    logger.info("Together Intelligence Toolkit backend starting")
    logger.debug("Configured model: %s", settings.model_name)
    yield


app = FastAPI(title="Together Intelligence Toolkit", lifespan=lifespan)
app.include_router(corridor_router)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
