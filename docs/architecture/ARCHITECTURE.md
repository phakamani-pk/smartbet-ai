# SmartBet AI System Architecture

## Overview

SmartBet AI is a full-stack mobile application combining AI-powered analytics with betting and lottery platforms. The system is built on a **layered architecture** with clear separation of concerns:

- **Presentation Layer**: Flutter mobile app (iOS/Android)
- **API Layer**: FastAPI REST + WebSocket endpoints
- **Business Logic Layer**: Services, ML models, data processing
- **Data Layer**: PostgreSQL, Redis, external APIs

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                  (Flutter Mobile App)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Dashboard    │  │ Lottery UI   │  │ Sports UI    │      │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤      │
│  │ AI Chatbot   │  │ Budget Mgmt  │  │ Predictions  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬─────────────────────────────────────┘
                         │ REST/WebSocket
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER (FastAPI)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Auth        │  │ Lottery     │  │ Sports      │         │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤         │
│  │ Users       │  │ Trends      │  │ Analytics   │         │
│  │ AI Agent    │  │ Predictions │  │ Value Bets  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└────────────────────────┬─────────────────────────────────────┘
                         │
      ┌──────────────────┼──────────────────┐
      ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Business     │  │ ML Pipeline  │  │ Cache Layer  │
│ Services     │  │ (Scikit/TF)  │  │ (Redis)      │
└──────────────┘  └──────────────┘  └──────────────┘
      │
      ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  ┌──────────────────┐  ┌──────────────────────┐            │
│  │ PostgreSQL DB    │  │ External APIs        │            │
│  │ - Users          │  │ - Sports Data        │            │
│  │ - Results        │  │ - Lottery Results    │            │
│  │ - Analytics      │  │ - Betting Odds       │            │
│  └──────────────────┘  └──────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Frontend (Flutter)

**Purpose**: Deliver premium mobile experience with real-time analytics

**Key Components**:
- **Screens**: Dashboard, Lottery Analytics, Sports Analytics, AI Chatbot, Account
- **State Management**: Provider/Riverpod for reactive UI
- **Services**: API client for FastAPI communication, WebSocket for real-time updates
- **Theme**: Premium dark theme with Material 3 design
- **Local Storage**: Secure storage for tokens, cached data

**Tech Stack**:
- Flutter 3.0+, Dart
- Provider for state management
- FL Chart for visualizations
- WebSocketChannel for real-time sync
- Firebase for push notifications

### 2. API Layer (FastAPI)

**Purpose**: Expose business logic through RESTful and WebSocket APIs

**Endpoints Structure** (`/api/v1/`):

```
/auth
  POST /register          # User registration
  POST /login            # User authentication
  POST /refresh          # Token refresh
  POST /logout           # User logout

/users
  GET /me                # Current user profile
  PUT /me                # Update profile
  GET /statistics        # User statistics
  PUT /budget            # Update spending limits
  GET /analytics         # User analytics history

/lottery
  GET /analysis/{lottery_id}     # Analyze lottery
  GET /trends/{lottery_id}       # Get hot/cold numbers
  GET /predictions/{lottery_id}  # Get AI predictions
  POST /recommendation           # Get personalized recommendation
  GET /historical/{lottery_id}   # Historical results

/sports
  GET /teams              # List teams
  GET /matches/{match_id} # Match analysis
  GET /predictions        # Sports betting predictions
  GET /value-bets         # Detect value bets
  GET /injury-report      # Injury tracking

/ai
  POST /chat              # Chat with AI agent
  POST /analyze           # Analyze pattern/trend
  GET /explanation/{id}   # Get reasoning for prediction
  WS /subscribe           # WebSocket for real-time updates

/subscriptions
  GET /plans              # Available plans
  POST /subscribe         # Subscribe to plan
  GET /usage              # Check usage limits
```

### 3. Business Logic Layer

**Services** (`app/services/`):

1. **Authentication Service**
   - JWT token generation and validation
   - Password hashing with bcrypt
   - OAuth2 integration

2. **User Service**
   - Profile management
   - Budget tracking
   - Spending alerts
   - Statistics calculation

3. **Lottery Analytics Service**
   - Historical result analysis
   - Frequency calculations
   - Trend detection
   - Number recommendations

4. **Sports Analytics Service**
   - Team performance analysis
   - Injury tracking
   - Head-to-head statistics
   - Odds value calculation

5. **AI Agent Service**
   - Natural language processing
   - Confidence scoring
   - Explanation generation
   - Reasoning chains

6. **ML Pipeline Service**
   - Model loading and inference
   - Feature engineering
   - Prediction generation
   - Confidence calculation

### 4. ML/AI Layer

**ML Models** (`backend/ml_models/`):

#### Lottery Analytics Models
- **Hot/Cold Number Detection**: Statistical frequency analysis
- **Overdue Number Detector**: Delta-time analysis
- **Trend Forecasting**: Time series prediction (ARIMA/Prophet)
- **Pattern Recognition**: Sequence analysis with Markov chains

#### Sports Analytics Models
- **Team Performance Predictor**: Linear regression on historical stats
- **Injury Impact Analysis**: Regression model with injury factors
- **Odds Value Detection**: Compare predicted vs market odds
- **Match Outcome Prediction**: Multi-class classifier

**Model Training Pipeline**:
```python
# Data Collection → Feature Engineering → Model Training → Validation → Serialization
```

### 5. Data Layer

#### PostgreSQL Database

**Key Tables**:

```sql
-- Users and authentication
users (id, email, username, password_hash, created_at, updated_at)
subscriptions (id, user_id, plan_id, status, started_at, expires_at)
spending_limits (id, user_id, daily_limit, monthly_limit, weekly_limit)

-- Lottery data
lotteries (id, name, type, country, draws_per_week)
lottery_results (id, lottery_id, draw_date, numbers, prize_breakdown)
lottery_analysis (id, lottery_id, hot_numbers, cold_numbers, updated_at)

-- Sports data
teams (id, name, league, country)
matches (id, team_a, team_b, scheduled_time, status)
match_stats (id, match_id, team_id, points_for, points_against)
injuries (id, team_id, player_name, injury_type, expected_return)

-- User activity
user_analyses (id, user_id, lottery_id, analysis_type, result, confidence)
predictions (id, user_id, numbers_picked, result, profit_loss)
ai_conversations (id, user_id, user_message, ai_response, confidence)

-- Budgeting
spending_logs (id, user_id, amount, type, timestamp)
budget_alerts (id, user_id, alert_type, threshold, triggered_at)
```

#### Redis Cache

- **Session storage**: User sessions with 24-hour TTL
- **Hot numbers cache**: Lottery analysis results (1-hour TTL)
- **Prediction cache**: Recent predictions (30-minute TTL)
- **User statistics**: Cached analytics (1-hour TTL)
- **Real-time subscriptions**: WebSocket connection tracking

### 6. Security Architecture

**Authentication & Authorization**:
- JWT tokens with 24-hour expiration
- Refresh token rotation
- Role-based access control (RBAC)
- API key for external service integration

**Data Protection**:
- Passwords hashed with bcrypt (cost=12)
- PII encrypted at rest
- TLS/SSL for transport security
- Redis persistence with encryption

**Input Validation**:
- Pydantic schemas for request validation
- SQL injection prevention with parameterized queries
- Rate limiting on sensitive endpoints
- CORS policy enforcement

## Data Flow

### 1. Lottery Analysis Request

```
User selects lottery
    ↓
Frontend sends POST /api/v1/lottery/analysis/{lottery_id}
    ↓
FastAPI receives request & validates token
    ↓
Check Redis cache for recent analysis (1-hour TTL)
    ↓
If not cached:
  - Fetch lottery results from PostgreSQL
  - Load ML models from disk
  - Calculate hot/cold numbers
  - Generate frequency trends
  - Calculate confidence score
  - Cache result in Redis
    ↓
Return analysis with confidence score
    ↓
Frontend displays results with responsible gambling disclaimer
```

### 2. AI Agent Prediction

```
User sends message to AI chatbot
    ↓
Frontend sends POST /api/v1/ai/chat
    ↓
FastAPI validates and enriches request
    ↓
AI Agent Service:
  - Parse user intent (NLU)
  - Retrieve context (user history, preferences)
  - Run relevant ML models
  - Generate explanations with OpenAI GPT
  - Calculate confidence score
    ↓
Return response with:
  - Prediction/recommendation
  - Confidence score (0-1)
  - Reasoning explanation
  - Probability distribution
    ↓
Frontend displays with disclaimer
    ↓
Log interaction to PostgreSQL for continuous learning
```

### 3. Real-Time Updates

```
Multiple users subscribed via WebSocket
    ↓
New lottery results published to external API
    ↓
Backend scheduled job (every 30 minutes):
  - Fetch new results
  - Recompute hotness scores
  - Update Redis cache
  - Publish update to WebSocket subscribers
    ↓
Connected Flutter clients receive update
    ↓
UI refreshes with new data in real-time
```

## Scalability Considerations

### Horizontal Scaling
- **Stateless API servers**: Multiple FastAPI instances behind load balancer
- **Database replication**: PostgreSQL replication for read scaling
- **Redis clustering**: Redis Sentinel for high availability
- **ML model serving**: Separate inference servers for ML models

### Caching Strategy
- **Redis for hot data**: Recent analyses, predictions
- **CDN for static assets**: Images, icons, fonts
- **Browser cache**: Client-side caching with ETag

### Performance Optimization
- **Database indexing**: Indexes on frequently queried columns
- **Query optimization**: Avoid N+1 queries with eager loading
- **Async I/O**: Non-blocking database and API calls
- **Model quantization**: Lightweight ML models for mobile inference

## Deployment Architecture

### Development
```
Local Machine
├── Flutter app (emulator/device)
├── FastAPI dev server (localhost:8000)
├── PostgreSQL (local or Docker)
└── Redis (local or Docker)
```

### Production
```
Cloud (AWS/GCP/Azure)
├── Mobile App
│   ├── iOS (App Store)
│   └── Android (Google Play)
├── API Layer (Kubernetes)
│   ├── FastAPI pods
│   ├── Load balancer
│   └── Auto-scaling (CPU/memory)
├── Database (Managed PostgreSQL)
├── Cache (Managed Redis)
├── ML Models (Separate inference service)
└── CI/CD (GitHub Actions)
```

## Technology Trade-offs

### Why FastAPI over Node.js?
- **Type Safety**: Python type hints with Pydantic validation
- **ML Integration**: Native Python ecosystem (scikit-learn, TensorFlow)
- **Performance**: ASGI server with async/await support
- **OpenAPI**: Automatic API documentation

### Why Flutter over React Native?
- **Performance**: Native compilation for iOS/Android
- **Hot Reload**: Faster development iteration
- **Material Design**: Premium UI components
- **Single Codebase**: One codebase for both platforms

### Why PostgreSQL over NoSQL?
- **ACID Compliance**: Data consistency for financial transactions
- **Complex Queries**: Join analysis across users/results/predictions
- **Transactions**: Multi-table consistency
- **JSON Support**: Flexibility with PostgreSQL JSON types

## Security Considerations

1. **API Security**
   - Rate limiting per user
   - Endpoint-level authorization checks
   - Request size limits
   - Timeout configurations

2. **Database Security**
   - Encrypted connections (SSL)
   - Row-level security for sensitive data
   - Regular backups with encryption
   - Audit logging of data access

3. **ML Model Security**
   - Model versioning and integrity checks
   - Input validation before model inference
   - Output sanitization to prevent prompt injection
   - Regular model retraining with validation

## Monitoring & Observability

**Key Metrics**:
- API response times (p50, p95, p99)
- Database query performance
- Cache hit rates
- Error rates and exceptions
- User engagement metrics
- Model accuracy metrics

**Logging**:
- Structured JSON logs
- Centralized log aggregation
- Debug/info/warning/error levels
- Correlation IDs for request tracing

**Alerting**:
- API downtime notifications
- High error rate alerts
- Database connection pool exhaustion
- Redis cache misses above threshold
- Model prediction accuracy degradation
