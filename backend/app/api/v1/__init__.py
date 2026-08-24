"""API v1 router initialization."""

from fastapi import APIRouter

from app.api.v1.endpoints import lottery

# Create main API router
router = APIRouter()

router.include_router(lottery.router, prefix="/lottery", tags=["Lottery Analytics"])


@router.get("/status", tags=["Status"])
async def api_status():
    """Get API v1 status."""
    return {
        "status": "operational",
        "version": "1.0.0",
        "components": {
            "authentication": "ready",
            "lottery_analytics": "ready",
            "sports_analytics": "ready",
            "ai_agent": "ready",
            "database": "ready",
            "cache": "ready",
        },
    }
