from typing import List

from pydantic import BaseModel, Field


class LotteryAnalysisResponse(BaseModel):
    """Response payload for lottery trend analysis."""

    lottery_id: str
    hot_numbers: List[int] = Field(..., min_length=1, max_length=10)
    cold_numbers: List[int] = Field(..., min_length=1, max_length=10)
    confidence: float = Field(..., ge=0.0, le=1.0)
    disclaimer: str = "Probabilistic predictions only — not guaranteed outcomes."
