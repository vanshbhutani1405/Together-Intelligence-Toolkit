from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.candidate import Candidate
from app.schemas.candidate import CandidateCreate


async def create(db: AsyncSession, candidate_in: CandidateCreate) -> Candidate:
    candidate = Candidate(**candidate_in.model_dump())
    db.add(candidate)
    await db.commit()
    await db.refresh(candidate)
    return candidate


async def get_by_id(db: AsyncSession, candidate_id: int) -> Candidate | None:
    return await db.get(Candidate, candidate_id)


async def list_all(db: AsyncSession) -> list[Candidate]:
    result = await db.execute(select(Candidate).order_by(Candidate.created_at.desc()))
    return list(result.scalars().all())
