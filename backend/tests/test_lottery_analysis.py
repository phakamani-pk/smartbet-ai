from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_lottery_analysis_returns_hot_numbers_and_confidence():
    response = client.get("/api/v1/lottery/analysis/powerball?days=30")

    assert response.status_code == 200

    payload = response.json()
    assert payload["lottery_id"] == "powerball"
    assert "hot_numbers" in payload
    assert "cold_numbers" in payload
    assert isinstance(payload["confidence"], float)
    assert 0.0 <= payload["confidence"] <= 1.0
    assert len(payload["hot_numbers"]) >= 1
    assert "probabilistic" in payload["disclaimer"].lower()
