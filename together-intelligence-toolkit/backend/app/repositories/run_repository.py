from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.run import Run


async def create(db: AsyncSession, module_name: str, status: str) -> Run:
    run = Run(module_name=module_name, status=status)
    db.add(run)
    await db.commit()
    await db.refresh(run)
    return run


async def update_status(
    db: AsyncSession,
    run_id: int,
    status: str,
    completed_at: datetime | None = None,
) -> Run | None:
    run = await db.get(Run, run_id)
    if run is None:
        return None

    run.status = status
    if completed_at is not None:
        run.completed_at = completed_at

    await db.commit()
    await db.refresh(run)
    return run
