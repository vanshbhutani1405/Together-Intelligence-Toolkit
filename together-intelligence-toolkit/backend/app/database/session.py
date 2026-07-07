from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.asyncio.engine import AsyncEngine

from app.core.config import settings

async_engine: AsyncEngine | None = None
AsyncSessionLocal: async_sessionmaker[AsyncSession] | None = None


def get_async_engine() -> AsyncEngine:
    global async_engine

    if async_engine is None:
        if not settings.database_url:
            raise RuntimeError(
                "DATABASE_URL must be configured before using database sessions."
            )
        async_engine = create_async_engine(settings.database_url, pool_pre_ping=True)

    return async_engine


def get_sessionmaker() -> async_sessionmaker[AsyncSession]:
    global AsyncSessionLocal

    if AsyncSessionLocal is None:
        AsyncSessionLocal = async_sessionmaker(
            bind=get_async_engine(),
            class_=AsyncSession,
            expire_on_commit=False,
        )

    return AsyncSessionLocal


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with get_sessionmaker()() as session:
        yield session
