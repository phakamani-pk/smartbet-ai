# SmartBet AI API Specification v1.0

## Base URL

```
Development: http://localhost:8000/api/v1
Production: https://api.smartbet-ai.com/api/v1
```

## Authentication

All endpoints (except `/auth/register` and `/auth/login`) require JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Too Many Requests (Rate Limited) |
| 500 | Internal Server Error |

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePassword123!",
  "full_name": "John Doe"
}
```

**Response** (201):
```json
{
  "id": "usr_123abc",
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "created_at": "2024-01-15T10:30:00Z",
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

### POST /auth/login

Authenticate user and get access token.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 86400,
  "user": {
    "id": "usr_123abc",
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

### POST /auth/refresh

Refresh expired access token using refresh token.

**Request**:
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "expires_in": 86400
}
```

### POST /auth/logout

Invalidate current session (revoke tokens).

**Request**: Empty body

**Response** (200):
```json
{
  "message": "Successfully logged out"
}
```

## User Endpoints

### GET /users/me

Get current authenticated user profile.

**Response** (200):
```json
{
  "id": "usr_123abc",
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "profile_picture_url": "https://...",
  "subscription_plan": "premium",
  "subscription_status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "last_login": "2024-01-20T14:20:00Z"
}
```

### PUT /users/me

Update user profile.

**Request**:
```json
{
  "full_name": "John Doe",
  "profile_picture_url": "https://...",
  "phone_number": "+1234567890"
}
```

**Response** (200): Updated user object

### GET /users/me/statistics

Get comprehensive user statistics.

**Response** (200):
```json
{
  "total_analyses": 156,
  "total_predictions": 89,
  "accuracy_rate": 0.73,
  "total_spent": 4200.00,
  "total_won": 3850.00,
  "net_profit_loss": -350.00,
  "analyses_this_month": 34,
  "joined_date": "2024-01-15T10:30:00Z",
  "favorite_lottery": "lotto_us_powerball",
  "favorite_sport": "football"
}
```

### PUT /users/me/budget

Set spending limits for responsible gambling.

**Request**:
```json
{
  "daily_limit": 100.00,
  "weekly_limit": 500.00,
  "monthly_limit": 2000.00
}
```

**Response** (200):
```json
{
  "daily_limit": 100.00,
  "weekly_limit": 500.00,
  "monthly_limit": 2000.00,
  "daily_spent_today": 45.50,
  "weekly_spent": 320.00,
  "monthly_spent": 1850.00,
  "next_reset_daily": "2024-01-21T00:00:00Z",
  "next_reset_weekly": "2024-01-22T00:00:00Z"
}
```

## Lottery Analytics Endpoints

### GET /lottery

List all available lotteries.

**Query Parameters**:
- `skip` (int, default=0): Number of results to skip
- `limit` (int, default=20): Maximum results to return
- `country` (string, optional): Filter by country
- `type` (string, optional): Filter by type (daily, weekly, mega)

**Response** (200):
```json
{
  "items": [
    {
      "id": "lotto_us_powerball",
      "name": "US Powerball",
      "country": "USA",
      "type": "mega",
      "draws_per_week": 3,
      "numbers_range": [1, 69],
      "bonus_range": [1, 26],
      "next_draw": "2024-01-22T10:59:00Z",
      "jackpot": 157000000.00
    }
  ],
  "total": 150,
  "skip": 0,
  "limit": 20
}
```

### POST /lottery/{lottery_id}/analysis

Analyze lottery with ML models.

**Request**:
```json
{
  "time_period_days": 180
}
```

**Response** (200):
```json
{
  "id": "analysis_abc123",
  "lottery_id": "lotto_us_powerball",
  "hot_numbers": [7, 23, 41, 15, 32],
  "cold_numbers": [2, 18, 5, 44, 11],
  "overdue_numbers": [13, 27, 8],
  "frequency_data": {
    "7": 28,
    "23": 25,
    "41": 24,
    "15": 23,
    "32": 22
  },
  "trends": {
    "trend_type": "ascending",
    "pattern": "Hot numbers trending up",
    "confidence": 0.68
  },
  "last_updated": "2024-01-20T14:00:00Z",
  "valid_until": "2024-01-21T14:00:00Z"
}
```

### GET /lottery/{lottery_id}/predictions

Get AI predictions for lottery.

**Query Parameters**:
- `include_reasoning` (bool, default=false): Include explanation of predictions

**Response** (200):
```json
{
  "id": "pred_xyz789",
  "lottery_id": "lotto_us_powerball",
  "predictions": [
    {
      "numbers": [7, 23, 41, 15, 32, 5],
      "confidence": 0.71,
      "reasoning": "Based on frequency analysis and trend detection",
      "model_version": "v2.1",
      "probability_distribution": [0.08, 0.09, 0.08, 0.07, 0.08, 0.06],
      "recommendation_strength": "MODERATE"
    }
  ],
  "analysis_timestamp": "2024-01-20T14:00:00Z",
  "disclaimer": "These are probabilistic predictions, not guarantees. Past performance does not guarantee future results."
}
```

### POST /lottery/{lottery_id}/recommendation

Get personalized lottery recommendation.

**Request**:
```json
{
  "budget": 50.00,
  "strategy": "conservative",
  "preferred_numbers": [7, 23]
}
```

**Response** (200):
```json
{
  "recommendation_id": "rec_xyz123",
  "lottery_id": "lotto_us_powerball",
  "recommended_numbers": [7, 23, 41, 15, 32, 5],
  "confidence": 0.68,
  "estimated_probability": 0.00000145,
  "expected_value": -0.65,
  "strategy_applied": "conservative",
  "reasoning": "Conservative strategy focuses on frequently drawn numbers with proven track record.",
  "risk_level": "LOW",
  "cost_per_ticket": 2.00,
  "suggested_plays": 5,
  "total_investment": 10.00,
  "expected_return": 9.35,
  "created_at": "2024-01-20T15:30:00Z",
  "expires_at": "2024-01-22T10:59:00Z"
}
```

### GET /lottery/{lottery_id}/historical

Get historical lottery results.

**Query Parameters**:
- `limit` (int, default=20): Number of draws to return
- `start_date` (string, optional): ISO 8601 date
- `end_date` (string, optional): ISO 8601 date

**Response** (200):
```json
{
  "lottery_id": "lotto_us_powerball",
  "results": [
    {
      "draw_id": "draw_20240120",
      "draw_date": "2024-01-20T10:59:00Z",
      "numbers": [7, 23, 41, 15, 32],
      "bonus_number": 5,
      "jackpot_amount": 157000000.00,
      "winners_breakdown": {
        "jackpot": 1,
        "match_5_plus_1": 5,
        "match_5": 45,
        "match_4_plus_1": 234
      }
    }
  ],
  "total_results": 523,
  "span_days": 365
}
```

## Sports Analytics Endpoints

### GET /sports/teams

List all available teams.

**Query Parameters**:
- `league` (string, optional): Filter by league
- `country` (string, optional): Filter by country
- `sport` (string, optional): Filter by sport

**Response** (200):
```json
{
  "items": [
    {
      "id": "team_nfl_sf49ers",
      "name": "San Francisco 49ers",
      "league": "NFL",
      "sport": "American Football",
      "country": "USA",
      "season_record": "12-5",
      "ranking": 3
    }
  ],
  "total": 2400
}
```

### GET /sports/matches/{match_id}

Get detailed match analysis.

**Response** (200):
```json
{
  "id": "match_20240122_nfl",
  "home_team": {
    "id": "team_nfl_sf49ers",
    "name": "San Francisco 49ers",
    "ranking": 3,
    "recent_form": "W-W-W-L-W"
  },
  "away_team": {
    "id": "team_nfl_detroit",
    "name": "Detroit Lions",
    "ranking": 1,
    "recent_form": "W-W-W-W-W"
  },
  "scheduled_time": "2024-01-22T23:30:00Z",
  "status": "scheduled",
  "head_to_head": {
    "total_games": 34,
    "home_team_wins": 12,
    "away_team_wins": 19,
    "draws": 3,
    "home_team_win_percentage": 0.35
  },
  "home_team_stats": {
    "points_for_avg": 28.5,
    "points_against_avg": 22.3,
    "passing_yards_avg": 285,
    "rushing_yards_avg": 115,
    "turnover_margin": 1.2
  },
  "injuries": [
    {
      "team": "San Francisco",
      "player": "Brandon Aiyuk",
      "position": "WR",
      "status": "QUESTIONABLE",
      "expected_return": "2024-01-22T23:30:00Z"
    }
  ],
  "prediction": {
    "predicted_winner": "Detroit Lions",
    "confidence": 0.67,
    "predicted_score": "24-21",
    "over_under": 45.5,
    "recommendation": "Value bet on Detroit Lions at +2.5"
  }
}
```

### GET /sports/predictions

Get sports betting predictions.

**Query Parameters**:
- `sport` (string, optional): Filter by sport
- `league` (string, optional): Filter by league
- `date` (string, optional): ISO 8601 date
- `min_confidence` (float, optional, default=0.55): Minimum confidence threshold

**Response** (200):
```json
{
  "predictions": [
    {
      "match_id": "match_20240122_nfl",
      "prediction_id": "pred_xyz123",
      "matchup": "San Francisco 49ers vs Detroit Lions",
      "predicted_winner": "Detroit Lions",
      "confidence": 0.67,
      "win_probability": 0.67,
      "moneyline_value": -140,
      "recommendation": "Strong buy",
      "confidence_explanation": "Detroit has better recent form and home field advantage"
    }
  ],
  "count": 15,
  "generated_at": "2024-01-20T15:30:00Z"
}
```

## AI Agent Endpoints

### POST /ai/chat

Send message to AI agent for analysis and advice.

**Request**:
```json
{
  "message": "What lottery should I play this week?",
  "context": {
    "budget": 100.00,
    "risk_tolerance": "moderate",
    "preferred_lotteries": ["lotto_us_powerball", "lotto_us_megamillions"]
  },
  "conversation_id": "conv_xyz789"
}
```

**Response** (200):
```json
{
  "response_id": "resp_abc123",
  "conversation_id": "conv_xyz789",
  "message": "Based on this week's data, I recommend US Powerball. The hot numbers (7, 23, 41) are showing strong frequency trends with 68% confidence. However, remember these are probabilistic predictions, not guarantees.",
  "confidence": 0.68,
  "reasoning": "Frequency analysis of 180-day period shows consistent pattern in these numbers",
  "recommendations": [
    {
      "type": "lottery",
      "name": "US Powerball",
      "action": "play",
      "confidence": 0.68
    }
  ],
  "follow_up_questions": [
    "Would you like historical performance of these numbers?",
    "Interested in sports betting predictions?",
    "Want to set spending limits?"
  ],
  "timestamp": "2024-01-20T15:30:00Z",
  "disclaimer": "These are probabilistic predictions based on historical data. Gamble responsibly and within your budget."
}
```

### WS /ai/subscribe

WebSocket endpoint for real-time AI updates and streaming responses.

**Connection URL**:
```
ws://localhost:8000/api/v1/ai/subscribe?token=<jwt_token>
```

**Message Format**:
```json
{
  "type": "message",
  "content": "Analyze the current lottery trends",
  "timestamp": "2024-01-20T15:30:00Z"
}
```

**Response Stream**:
```json
{
  "type": "stream_start",
  "request_id": "req_xyz123"
}
{
  "type": "token",
  "content": "Based",
  "request_id": "req_xyz123"
}
{
  "type": "token",
  "content": " on current analysis...",
  "request_id": "req_xyz123"
}
{
  "type": "stream_end",
  "request_id": "req_xyz123",
  "confidence": 0.72
}
```

## Rate Limiting

API implements rate limiting per user:

| Endpoint | Limit |
|----------|-------|
| Authentication | 10 requests/minute |
| Lottery Analysis | 20 requests/minute |
| Sports Predictions | 20 requests/minute |
| AI Chat | 50 requests/minute |
| All other endpoints | 60 requests/minute |

**Response Headers**:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1642781430
```

**429 Response**:
```json
{
  "detail": "Rate limit exceeded. Please try again in 30 seconds.",
  "retry_after": 30
}
```

## Error Responses

### Validation Error (422)
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "invalid email format",
      "type": "value_error.email"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "detail": "Invalid or expired token"
}
```

### Not Found (404)
```json
{
  "detail": "Lottery not found"
}
```

## API Documentation

Interactive API documentation available at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI Schema**: `http://localhost:8000/openapi.json`

## Changelog

### v1.0.0 (Initial Release)
- Authentication endpoints
- Lottery analytics endpoints
- Sports analytics endpoints
- AI agent chat endpoints
- Real-time WebSocket support
