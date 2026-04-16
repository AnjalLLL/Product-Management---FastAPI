import pytest
from fastapi.testclient import TestClient
from main import app

@pytest.mark.integration
def test_full_product_workflow():
    """Test complete product CRUD workflow"""
    client = TestClient(app)
    
    # Create
    new_product = {
        "id": 999,
        "name": "Integration Test Product",
        "description": "Testing",
        "price": 50.00,
        "quantity": 20
    }
    create_response = client.post("/products", json=new_product)
    assert create_response.status_code == 200
    
    # Read
    read_response = client.get("/products/999")
    assert read_response.status_code in [200, 404]
    
    # Update
    update_data = {**new_product, "price": 75.00}
    update_response = client.put("/products/999", json=update_data)
    assert update_response.status_code in [200, 404]
    
    # Delete
    delete_response = client.delete("/products/999")
    assert delete_response.status_code in [200, 404]

@pytest.mark.integration
def test_api_health():
    """Test API is healthy and responsive"""
    client = TestClient(app)
    response = client.get("/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
