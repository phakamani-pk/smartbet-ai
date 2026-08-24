# SmartBet AI

An AI-powered betting and lottery analytics assistant built with Flutter and FastAPI.

## 📱 Overview

SmartBet AI combines machine learning, statistical analysis, and natural language processing to provide intelligent insights for:
- **Lottery Analytics** — Trend analysis, hot/cold numbers, frequency patterns
- **Sports Betting** — Team performance analysis, injury tracking, value detection
- **AI Agent** — Conversational assistant with confidence-based recommendations
- **Responsible Gambling** — Budget management, spending limits, risk warnings

## 🏗️ Architecture

**Tech Stack:**
- **Frontend**: Flutter (Dart) — iOS/Android mobile app with dark theme UI
- **Backend**: FastAPI (Python) — High-performance REST + WebSocket APIs
- **Database**: PostgreSQL + Redis — Persistent storage and real-time caching
- **AI/ML**: Scikit-learn, TensorFlow — Statistical models and trend detection
- **LLM**: OpenAI GPT API — Natural language explanations and chatbot
- **Auth**: JWT + OAuth2 — Secure authentication and session management

## 📂 Project Structure

```
smartbet-ai/
├── frontend/                 # Flutter mobile app
│   ├── lib/
│   │   ├── screens/         # UI screens
│   │   ├── widgets/         # Reusable components
│   │   ├── models/          # Data models
│   │   ├── services/        # API clients
│   │   ├── providers/       # State management
│   │   ├── theme/           # Dark theme configuration
│   │   └── utils/           # Utilities
│   └── pubspec.yaml
├── backend/                  # FastAPI server
│   ├── app/
│   │   ├── api/v1/          # API endpoints
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utilities
│   │   └── ml/              # ML pipelines
│   ├── ml_models/           # Pre-trained models
│   ├── tests/               # Test suite
│   └── requirements.txt
├── docs/                     # Project documentation
│   ├── architecture/        # System design docs
│   ├── api/                 # API specifications
│   └── database/            # Schema documentation
└── .github/                 # GitHub configs

```

## 🚀 Quick Start

### Prerequisites
- Flutter 3.0+ (with Dart)
- Python 3.10+
- PostgreSQL 13+
- Redis 6+

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
flutter pub get
flutter run
```

## 🎯 Development Workflow

1. **Design First** — Review architecture docs in `/docs`
2. **Backend Development** — Build APIs in `/backend/app/api/v1`
3. **Frontend Development** — Build screens in `/frontend/lib/screens`
4. **Integration Testing** — Test end-to-end flows
5. **Deployment** — Use Docker for containerization

## ⚠️ Important Notes

- **Probabilistic Predictions** — All AI outputs include confidence scores; no guarantees
- **Responsible Gambling** — Mandatory warnings and spending limits enforced
- **Security First** — All sensitive data encrypted; PII handling compliant
- **Error Handling** — Comprehensive validation on financial transactions

## 📚 Documentation

- [System Architecture](docs/architecture/ARCHITECTURE.md)
- [API Reference](docs/api/API.md)
- [Database Schema](docs/database/SCHEMA.md)
- [Development Guide](DEVELOPMENT.md)

## 🔧 Configuration

Copy `.env.example` to `.env` and update with your credentials:
```env
DATABASE_URL=postgresql://user:password@localhost/smartbet_ai
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your-key-here
JWT_SECRET=your-secret-key
```

## 🧪 Testing

```bash
# Backend tests
cd backend && pytest tests/

# Frontend tests
cd frontend && flutter test
```

## 📦 Deployment

See `.github/workflows/` for CI/CD pipelines and deployment instructions.

## 📝 License

Proprietary — SmartBet AI

## 🤝 Contributing

See [DEVELOPMENT.md](DEVELOPMENT.md) for contributor guidelines.
