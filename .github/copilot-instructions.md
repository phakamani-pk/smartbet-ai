---
name: smartbet-ai-project-guide
description: "Instructions for SmartBet AI development and architecture-first workflow"
---

# SmartBet AI Development Guide

Welcome to **SmartBet AI**, an AI-powered betting and lottery analytics platform built with Flutter and FastAPI.

## 🎯 Quick Navigation

- **Getting Started**: See [README.md](../../README.md)
- **Development Setup**: See [DEVELOPMENT.md](../../DEVELOPMENT.md)
- **System Architecture**: See [docs/architecture/ARCHITECTURE.md](../../docs/architecture/ARCHITECTURE.md)
- **API Reference**: See [docs/api/API.md](../../docs/api/API.md)
- **Using the AI Agent**: See instructions below

## 🤖 SmartBet AI Developer Agent

This project includes a specialized VS Code agent for architecture-first development. To use it:

1. **Open Command Palette** (Ctrl+Shift+P / Cmd+Shift+P)
2. **Type**: `@smartbet-ai`
3. **Describe your task**, e.g.:
   - "Design the database schema for lottery analytics"
   - "Create the Flutter dashboard component"
   - "Build the FastAPI lottery analysis endpoint"
   - "Implement the ML confidence scoring model"

### Example Queries for the Agent

**Architecture Requests**:
```
@smartbet-ai Design the database schema for tracking lottery results, 
number frequencies, and analysis trends
```

**Backend Development**:
```
@smartbet-ai Create the FastAPI endpoints for the AI agent with 
response models, error handling, and confidence scoring
```

**Frontend Development**:
```
@smartbet-ai Build the Flutter dashboard screen with real-time 
chart updates, dark theme, and responsible gambling warnings
```

**ML Model Development**:
```
@smartbet-ai Design the ML pipeline for detecting hot/cold lottery 
numbers with statistical confidence scoring
```

## 📁 Project Structure Overview

```
smartbet-ai/
├── frontend/                    # Flutter mobile app
│   ├── lib/
│   │   ├── screens/            # UI screens (Dashboard, Analytics, Chat)
│   │   ├── widgets/            # Reusable components
│   │   ├── models/             # Data models and serialization
│   │   ├── services/           # API clients, WebSocket handlers
│   │   ├── providers/          # State management (Provider/Riverpod)
│   │   ├── theme/              # Dark theme configuration
│   │   └── utils/              # Utilities and helpers
│   └── pubspec.yaml            # Flutter dependencies
│
├── backend/                     # FastAPI Python server
│   ├── app/
│   │   ├── api/v1/             # REST/WebSocket API endpoints
│   │   ├── models/             # SQLAlchemy database models
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   ├── services/           # Business logic (Auth, Analytics, AI)
│   │   ├── ml/                 # ML pipeline implementations
│   │   └── utils/              # Config, logging, helpers
│   ├── ml_models/              # Pre-trained ML models
│   ├── tests/                  # Test suite
│   ├── requirements.txt        # Python dependencies
│   ├── main.py                 # FastAPI application entry
│   └── .env.example            # Environment configuration template
│
├── docs/                        # Project documentation
│   ├── architecture/           # ARCHITECTURE.md
│   ├── api/                    # API.md
│   └── database/               # Database schema documentation
│
├── .github/                     # GitHub configuration
│   ├── workflows/              # CI/CD pipelines
│   └── copilot-instructions.md # This file
│
├── README.md                    # Project overview
├── DEVELOPMENT.md              # Detailed setup and contribution guide
└── .gitignore                  # Git ignore rules
```

## 🚀 Development Workflow

### 1. Architecture-First Approach

**For any new feature**, follow this sequence:

1. **Design Phase** (Use the AI Agent)
   - Ask the agent to design the database schema
   - Ask the agent to define API endpoints
   - Ask the agent to sketch UI structure
   - Review and approve architecture

2. **Backend Implementation**
   - Create models in `backend/app/models/`
   - Define schemas in `backend/app/schemas/`
   - Implement services in `backend/app/services/`
   - Create endpoints in `backend/app/api/v1/endpoints/`
   - Write tests in `backend/tests/`

3. **Frontend Implementation**
   - Create screens in `frontend/lib/screens/`
   - Create widgets in `frontend/lib/widgets/`
   - Implement services in `frontend/lib/services/`
   - Add state management in `frontend/lib/providers/`

4. **Integration & Testing**
   - Test API with backend tests
   - Test UI with widget tests
   - Test end-to-end flow

### 2. Key Technologies

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | Flutter | 3.0+ |
| Backend | FastAPI | 0.104+ |
| Database | PostgreSQL | 13+ |
| Cache | Redis | 6+ |
| State Mgmt | Provider | 6.0+ |
| ML Framework | scikit-learn | 1.3+ |

### 3. Important Constraints

**DO:**
- ✅ Include confidence scores in all predictions
- ✅ Add responsible gambling disclaimers
- ✅ Validate all financial inputs
- ✅ Use JWT for authentication
- ✅ Encrypt sensitive data
- ✅ Write comprehensive error messages

**DO NOT:**
- ❌ Claim predictions are guaranteed
- ❌ Store passwords in plain text
- ❌ Minimize responsible gambling warnings
- ❌ Skip input validation
- ❌ Commit .env files
- ❌ Use hardcoded secrets

## 📝 Coding Conventions

### Backend (Python/FastAPI)

**File Naming**:
```
models/          → user.py, lottery.py, prediction.py
schemas/         → auth.py, lottery.py, sports.py
services/        → lottery_service.py, ai_agent_service.py
endpoints/       → auth.py, lottery.py, ai.py
```

**Response Format**:
```python
from pydantic import BaseModel

class LotteryAnalysisResponse(BaseModel):
    """Always include docstring."""
    analysis_id: str
    hot_numbers: List[int]
    confidence: float = Field(..., ge=0.0, le=1.0)  # Always validate confidence
    disclaimer: str = "Probabilistic predictions only"
```

### Frontend (Flutter/Dart)

**File Naming**:
```
screens/        → dashboard_screen.dart, lottery_screen.dart
widgets/        → number_grid.dart, chart_widget.dart
providers/      → lottery_provider.dart, user_provider.dart
services/       → api_client.dart, websocket_service.dart
```

**Responsible Gambling Widget**:
```dart
class ResponsibleGamblingBanner extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.orange,
      padding: EdgeInsets.all(12),
      child: Text(
        '⚠️ These are probabilistic predictions, not guarantees. '
        'Gamble responsibly and within your budget.',
      ),
    );
  }
}
```

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
pytest tests/

# Run with coverage
pytest --cov=app tests/

# Run specific test
pytest tests/test_lottery.py::test_analysis
```

### Frontend Tests

```bash
# Run all tests
flutter test

# Run specific test
flutter test test/screens/dashboard_test.dart

# Generate coverage
flutter test --coverage
```

## 🔧 Common Development Tasks

### Add New API Endpoint

Use the AI Agent:
```
@smartbet-ai Create FastAPI endpoint for predicting lottery numbers 
with request/response schemas, validation, and confidence scoring
```

### Create New Flutter Screen

Use the AI Agent:
```
@smartbet-ai Build a Flutter screen for displaying lottery analytics 
with charts, hot/cold numbers, and trend visualization
```

### Implement ML Model

Use the AI Agent:
```
@smartbet-ai Design an ML model for detecting overdue lottery numbers 
with statistical confidence scoring and explanation
```

## 🐛 Debugging

### Backend Debugging

```python
# Add logging
import logging
logger = logging.getLogger(__name__)

logger.info("Analysis started")
logger.debug(f"Hot numbers: {hot_numbers}")
logger.error(f"Error: {e}", exc_info=True)
```

### Frontend Debugging

```dart
print('Debug: $variable');
debugPrint('Detailed debug: ${object.toJson()}');
```

### View Logs

```bash
# Backend logs
tail -f logs/smartbet_ai.log

# Frontend logs
flutter logs
```

## 📚 Documentation Standards

All code should include:

**Python Functions**:
```python
def analyze_lottery(lottery_id: str, days: int = 180) -> AnalysisResult:
    """
    Analyze lottery data and generate predictions.
    
    Args:
        lottery_id: ID of the lottery to analyze
        days: Number of days of historical data to analyze (default: 180)
    
    Returns:
        AnalysisResult with hot/cold numbers and confidence scores
    
    Raises:
        LotteryNotFoundError: If lottery_id does not exist
        ValueError: If days <= 0
    """
```

**Dart Methods**:
```dart
/// Analyzes lottery trends and returns predictions.
///
/// Takes [lotteryId] and analyzes the past [days] of results.
/// Returns [LotteryAnalysis] with confidence scores.
Future<LotteryAnalysis> analyzeLottery(
  String lotteryId, {
  int days = 180,
}) async {
  // Implementation
}
```

## 🚀 Deployment

### Development
```bash
# Backend
python -m uvicorn app.main:app --reload

# Frontend (emulator)
flutter run
```

### Staging/Production
See [DEVELOPMENT.md](../../DEVELOPMENT.md#deployment) for Docker and cloud deployment instructions.

## 💡 Tips for Using the AI Agent

1. **Be Specific**: "Create lottery analysis service" is vague; "Design ML model for detecting hot numbers with confidence scoring" is better

2. **Include Context**: Mention related components; "Create sports betting prediction endpoint that integrates with existing lottery analysis service"

3. **Request Output Format**: "Generate code with comprehensive docstrings and type hints"

4. **Ask for Integration**: "Show how this connects to the existing API and database schema"

5. **Request Documentation**: "Include architecture diagram and API examples"

## 📖 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Flutter Documentation](https://flutter.dev/docs)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Pydantic Validation](https://docs.pydantic.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes following conventions above
3. Write tests for new functionality
4. Run full test suite: `pytest tests/` + `flutter test`
5. Submit PR with clear description and architecture docs

## 📞 Support

- Check [DEVELOPMENT.md](../../DEVELOPMENT.md) for setup issues
- Review [ARCHITECTURE.md](../../docs/architecture/ARCHITECTURE.md) for system design questions
- Check [API.md](../../docs/api/API.md) for API integration questions

---

**Happy coding! Use the SmartBet AI Agent to design and build features efficiently.** 🚀
