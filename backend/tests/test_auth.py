def test_register_user(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "password": "password123",
            "full_name": "Test User",
            "role": "guest"
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert data["role"] == "guest"

def test_login_user(client):
    # Register first
    client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "password": "password123",
            "role": "guest"
        },
    )
    
    # Login
    response = client.post(
        "/api/auth/login",
        data={"username": "test@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
