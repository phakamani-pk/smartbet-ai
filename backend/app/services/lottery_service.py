import random
from typing import List

from fastapi import HTTPException

from app.schemas.lottery import LotteryAnalysisResponse


class LotteryAnalysisService:
    """Generate deterministic, probabilistic lottery insight data."""

    @staticmethod
    def analyze(lottery_id: str, days: int) -> LotteryAnalysisResponse:
        normalized_id = (lottery_id or "powerball").strip().lower()

        if not normalized_id:
            raise HTTPException(status_code=400, detail="lottery_id is required")

        if days <= 0 or days > 3650:
            raise HTTPException(status_code=400, detail="days must be between 1 and 3650")

        seed = sum(ord(ch) for ch in normalized_id) + days * 31
        rng = random.Random(seed)

        counts: List[int] = [rng.randint(1, 35) for _ in range(70)]
        hot_numbers = [n for n, _ in sorted(enumerate(range(1, 71), start=1), key=lambda item: counts[item[0] - 1], reverse=True)[:5]]
        cold_numbers = [n for n, _ in sorted(enumerate(range(1, 71), start=1), key=lambda item: counts[item[0] - 1])[:5]]

        avg_hot = sum(counts[number - 1] for number in hot_numbers) / max(len(hot_numbers), 1)
        avg_total = sum(counts) / len(counts)
        confidence = min(0.97, max(0.45, round(0.5 + ((avg_hot / max(avg_total, 1)) - 0.7) * 0.7, 4)))

        return LotteryAnalysisResponse(
            lottery_id=normalized_id,
            hot_numbers=hot_numbers,
            cold_numbers=cold_numbers,
            confidence=float(confidence),
            disclaimer="Probabilistic predictions only — not guaranteed outcomes.",
        )
