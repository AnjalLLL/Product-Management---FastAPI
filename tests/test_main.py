import pytest
from fastapi.testclient import TestClient
from main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.mark.unit
def test_read_products(client):
    """Test getting all products"""
    response = client.get("/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.unit
def test_create_product(client):
    """Test creating a new product"""
    new_product = {
        "id": 100,
        "name": "Test Product",
        "description": "Test Description",
        "price": 99.99,
        "quantity": 5
    }
    response = client.post("/products", json=new_product)
    assert response.status_code == 200

@pytest.mark.unit
def test_get_product_by_id(client):
    """Test getting a specific product"""
    response = client.get("/products/1")
    assert response.status_code == 200

@pytest.mark.unit
def test_delete_product(client):
    """Test deleting a product"""
    response = client.delete("/products/100")
    assert response.status_code in [200, 404]

@pytest.mark.unit
def test_update_product(client):
    """Test updating a product"""
    update_data = {
        "id": 1,
        "name": "Updated Product",
        "description": "Updated Description",
        "price": 150.00,
        "quantity": 10
    }
    response = client.put("/products/1", json=update_data)
    assert response.status_code in [200, 404]
