"""
Application configuration and settings management.

Uses pydantic-settings for environment variable management
with type validation and default values.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Configuration
    API_TITLE: str = "SmartBet AI API"
    API_DESCRIPTION: str = "AI-powered betting and lottery analytics platform"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/smartbet_ai"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # JWT
    JWT_SECRET: str = "change-this-secret-key-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4"
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8081"]
    
    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    # ML Models
    ML_MODELS_PATH: str = "ml_models/"
    
    # External APIs
    SPORTS_API_KEY: str = ""
    LOTTERY_API_KEY: str = ""
    
    class Config:
        """Pydantic config for environment loading."""
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
