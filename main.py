from fastapi import Depends, FastAPI
from models import Product
from database import engine, Session
import database_models
from sqlalchemy.orm import Session as DBSession
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


database_models.Base.metadata.create_all(bind=engine)

products = [
    Product(id=1, name="Iphone", description="low budget", price=101.12, quantity=10),
    Product(id=2, name="Laptop", description="high budget", price=300.99, quantity=10),
    Product(id=3, name="Tablet", description="medium budget", price=200.50, quantity=5),
    Product(id=4, name="Monitor", description="high budget", price=150.00, quantity=7),
]

# db dependency
def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

#initialize DB
def init_db():
    db = Session()
    count = db.query(database_models.Product).count()
    if count == 0:
        for product in products:
            db.add(database_models.Product(**product.model_dump()))
        db.commit()
    db.close()

init_db()

@app.get("/products")
def get_all_products(db: DBSession = Depends(get_db)):
    return db.query(database_models.Product).all()

@app.get("/products/{id}")
def get_product_by_id(id: int, db: DBSession = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if db_product:
        return db_product
    return {"error": "Product not found"}

@app.post("/products")
def add_products(product: Product, db: DBSession = Depends(get_db)):
    db.add(database_models.Product(**product.model_dump()))
    db.commit()
    return product

@app.put("/products/{id}")
def update_products(id: int, product: Product, db: DBSession = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if db_product:
        db_product.name = product.name
        db_product.description = product.description
        db_product.price = product.price
        db_product.quantity = product.quantity
        db.commit()
        return {"message": "Data updated"}
    else:
        return {"error": "No object found"}

@app.delete("/products/{id}")
def delete_products(id: int, db: DBSession = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return {"message": "Deleted successfully"}
    return {"error": "Product not found"}