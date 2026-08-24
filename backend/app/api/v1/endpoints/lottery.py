from fastapi import APIRouter, Query

from app.services.lottery_service import LotteryAnalysisService

router = APIRouter()


@router.get("/analysis/{lottery_id}", tags=["Lottery Analysis"])
async def analyze_lottery(
    lottery_id: str,
    days: int = Query(30, ge=1, le=3650),
):
    """Return probabilistic lottery trend insights for a given draw type."""
    return LotteryAnalysisService.analyze(lottery_id, days).model_dump()
