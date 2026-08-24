# SmartBet AI Development Guide

## Getting Started

### Prerequisites

- **Flutter**: 3.0+ with Dart 3.0+
- **Python**: 3.10+
- **PostgreSQL**: 13+
- **Redis**: 6+
- **Node.js**: 18+ (for build tooling, optional)

### Environment Setup

#### Backend Setup

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Run database migrations:**
```bash
alembic upgrade head
```

6. **Start development server:**
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: `http://localhost:8000`
Interactive docs: `http://localhost:8000/docs`

#### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Get dependencies:**
```bash
flutter pub get
```

3. **Run on device/emulator:**
```bash
flutter run
```

4. **Build for production:**
```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release
```

## Project Structure

### Backend (`backend/`)

```
app/
├── api/v1/           # REST/WebSocket API endpoints
│   ├── endpoints/    # Endpoint implementations
│   └── dependencies/ # Dependency injection
├── models/           # SQLAlchemy database models
├── schemas/          # Pydantic request/response schemas
├── services/         # Business logic layers
├── ml/              # ML pipeline implementations
└── utils/           # Utilities and helpers

ml_models/
├── lottery/         # Lottery analysis models
└── sports/          # Sports analytics models

tests/               # Test suite
```

### Frontend (`frontend/`)

```
lib/
├── screens/         # Full-page UI screens
├── widgets/         # Reusable UI components
├── models/          # Dart data models
├── services/        # API clients and external services
├── providers/       # State management (Provider/Riverpod)
├── theme/           # Theme configuration
└── utils/           # Utilities and helpers

assets/
├── images/          # Image assets
├── icons/           # Icon assets
└── fonts/           # Custom fonts
```

## Development Workflow

### 1. Creating a New Feature

#### Design Phase
- Create issue/PR on GitHub
- Update relevant architecture doc
- Define API endpoints and database schema

#### Backend Implementation
```bash
# Create feature branch
git checkout -b feature/my-feature

# Create new endpoint file in app/api/v1/endpoints/
# Implement database models in app/models/
# Implement business logic in app/services/
# Write tests in tests/

# Run tests
pytest tests/

# Format code
black app/ tests/
isort app/ tests/
```

#### Frontend Implementation
- Create screens in `lib/screens/`
- Create reusable widgets in `lib/widgets/`
- Implement state management with Provider/Riverpod
- Create models for API responses in `lib/models/`
- Implement API client in `lib/services/`

### 2. Testing

#### Backend Tests
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_endpoints.py

# Run with verbose output
pytest -v
```

#### Frontend Tests
```bash
# Run all tests
flutter test

# Run specific test
flutter test test/screens/dashboard_test.dart

# Generate coverage report
flutter test --coverage
```

### 3. Code Quality

#### Python
```bash
# Format code with Black
black app/ tests/

# Sort imports
isort app/ tests/

# Type checking with mypy
mypy app/

# Linting with flake8
flake8 app/ tests/
```

#### Dart/Flutter
```bash
# Format code
dart format lib/ test/

# Analyze code
flutter analyze

# Check for issues
dart fix --dry-run
dart fix
```

## API Development

### Creating New Endpoints

1. **Define Schema** (`app/schemas/my_feature.py`):
```python
from pydantic import BaseModel, Field
from typing import List

class MyFeatureRequest(BaseModel):
    """Request schema for my feature."""
    param1: str = Field(..., description="Parameter description")
    param2: int = Field(default=0)

class MyFeatureResponse(BaseModel):
    """Response schema for my feature."""
    result: str
    confidence: float = Field(0.0, ge=0.0, le=1.0)
```

2. **Create Service** (`app/services/my_feature.py`):
```python
from app.schemas.my_feature import MyFeatureRequest, MyFeatureResponse

class MyFeatureService:
    """Business logic for my feature."""
    
    async def process(self, request: MyFeatureRequest) -> MyFeatureResponse:
        # Implement business logic
        return MyFeatureResponse(result="...", confidence=0.75)
```

3. **Create Endpoint** (`app/api/v1/endpoints/my_feature.py`):
```python
from fastapi import APIRouter
from app.schemas.my_feature import MyFeatureRequest, MyFeatureResponse
from app.services.my_feature import MyFeatureService

router = APIRouter()
service = MyFeatureService()

@router.post("/my-feature", response_model=MyFeatureResponse)
async def my_feature(request: MyFeatureRequest):
    """Description of the endpoint."""
    return await service.process(request)
```

4. **Include in Router** (`app/api/v1/__init__.py`):
```python
from app.api.v1.endpoints import my_feature
router.include_router(my_feature.router, prefix="/my-feature", tags=["My Feature"])
```

## Database

### Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Models

```python
from sqlalchemy import Column, String, Integer, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class MyModel(Base):
    __tablename__ = "my_model"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
```

## Machine Learning

### Adding ML Models

1. **Create model in** `backend/ml_models/your_model/`:
```
model_name/
├── train.py       # Training script
├── model.pkl      # Serialized model
├── scaler.pkl     # Preprocessing scaler
└── config.json    # Model configuration
```

2. **Create inference service** in `app/services/ml/`:
```python
import pickle
import json

class YourModelService:
    def __init__(self):
        self.model = pickle.load(open("ml_models/your_model/model.pkl", "rb"))
        self.config = json.load(open("ml_models/your_model/config.json"))
    
    def predict(self, data: dict) -> dict:
        prediction = self.model.predict([data])
        return {
            "prediction": prediction[0],
            "confidence": self.config["min_confidence"]
        }
```

## Deployment

### Docker

```bash
# Build image
docker build -t smartbet-ai:latest .

# Run container
docker run -p 8000:8000 --env-file .env smartbet-ai:latest
```

### Environment Variables

See `.env.example` for all required variables.

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Implement changes following code style guidelines
3. Write tests for new functionality
4. Run full test suite: `pytest tests/` + `flutter test`
5. Submit PR with clear description

## Common Issues

### "Module not found" errors
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
flutter pub get
```

### Database connection errors
- Check PostgreSQL is running: `psql -U smartbet_user`
- Verify DATABASE_URL in .env
- Run migrations: `alembic upgrade head`

### Redis connection errors
- Check Redis is running: `redis-cli ping`
- Verify REDIS_URL in .env

## Documentation

- [System Architecture](docs/architecture/ARCHITECTURE.md)
- [API Reference](docs/api/API.md)
- [Database Schema](docs/database/SCHEMA.md)

## Support

For issues and questions:
1. Check documentation in `docs/`
2. Search existing GitHub issues
3. Create new issue with detailed description
