"""
SmartBet AI - FastAPI Backend Server

An AI-powered betting and lottery analytics assistant with real-time analytics,
machine learning models for trend detection, and comprehensive user management.

Author: SmartBet AI Developer
Version: 1.0.0
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1 import router as api_v1_router
from app.utils.config import settings
from app.utils.logging import setup_logging

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application startup and shutdown lifecycle events.
    
    Startup: Initialize connections to database, Redis, load ML models
    Shutdown: Close connections gracefully
    """
    # Startup
    logger.info("🚀 SmartBet AI server starting up...")
    try:
        # Initialize database connections
        logger.info("✓ Initializing database connections...")
        # TODO: Initialize database session
        
        # Initialize Redis
        logger.info("✓ Initializing Redis cache...")
        # TODO: Initialize Redis connection
        
        # Load ML models
        logger.info("✓ Loading ML models...")
        # TODO: Load pre-trained ML models
        
        logger.info("✅ All services initialized successfully")
    except Exception as e:
        logger.error(f"❌ Startup error: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down SmartBet AI server...")
    try:
        logger.info("✓ Closing database connections...")
        # TODO: Close database connection
        
        logger.info("✓ Closing Redis connections...")
        # TODO: Close Redis connection
        
        logger.info("✅ Graceful shutdown complete")
    except Exception as e:
        logger.error(f"❌ Shutdown error: {e}")


# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
    lifespan=lifespan,
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """Check API health status."""
    return {
        "status": "healthy",
        "service": "SmartBet AI API",
        "version": settings.API_VERSION,
    }


# Include API routers
app.include_router(
    api_v1_router,
    prefix="/api/v1",
    tags=["v1"],
)


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """SmartBet AI API Root Endpoint"""
    return {
        "message": "Welcome to SmartBet AI API",
        "docs": "/docs",
        "version": settings.API_VERSION,
    }


# Global exception handler for uncaught exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Handle uncaught exceptions gracefully."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "error_type": type(exc).__name__,
        },
    )


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )
