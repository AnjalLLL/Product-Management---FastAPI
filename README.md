# Product-Management---FastAPI
this project is a small full-stack product management app built with FastAPI, PostgreSQL, SQLAlchemy, and React.

The backend exposes a simple CRUD API for products, and the frontend provides a lightweight interface for adding, updating, listing, and deleting products. It feels like a learning project or starter app, which makes it easy to understand and extend.

## What this project does

- Stores products in PostgreSQL
- Seeds the database with a few sample products on first run
- Exposes REST endpoints with FastAPI
- Lets the React frontend create, update, view, and delete products

Each product has:

- `id`
- `name`
- `description`
- `price`
- `quantity`

## Tech stack

Backend:

- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL

Frontend:

- React
- Axios
- Create React App

## Project structure

```text
.
|-- main.py                  # FastAPI app and API routes
|-- database.py              # SQLAlchemy engine and session setup
|-- database_models.py       # SQLAlchemy Product table model
|-- models.py                # Pydantic Product schema
|-- README.md
`-- product-frontend/
    |-- src/App.js           # Main React UI
    `-- package.json
```

## How the backend works

When the app starts, it:

1. Creates the database tables if they do not already exist
2. Checks whether the `product` table is empty
3. Inserts a few default products if no rows exist yet

Available API routes:

- `GET /products` - return all products
- `GET /products/{id}` - return a single product
- `POST /products` - create a product
- `PUT /products/{id}` - update a product
- `DELETE /products/{id}` - delete a product

Create and activate a virtual environment if needed, then install the backend packages you use in the codebase:

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary
```

Start the API server from the project root:

```bash
uvicorn main:app --reload
```

The backend will be available at:

- `http://127.0.0.1:8000`

## Running the frontend

Move into the frontend folder:

```bash
cd product-frontend
```

Install dependencies:

```bash
npm install
```

Start the React app:

```bash
npm start
```

The frontend will open at:

- `http://localhost:3000`

The React app is already configured in [product-frontend/src/App.js](/D:/Product%20Management%20-%20FastApi/Product-Management---FastAPI/product-frontend/src/App.js) to call the backend at:

```text
http://127.0.0.1:8000
```

## Example product payload

```json
{
  "id": 5,
  "name": "Keyboard",
  "description": "compact mechanical keyboard",
  "price": 79.99,
  "quantity": 12
}
```


## Summary

This is a clean beginner-friendly full-stack CRUD project. The backend is easy to follow, the frontend is direct, and the overall structure is a solid base for learning FastAPI with a React client.

# Product Management App

This project is a small full-stack product management app built with FastAPI, PostgreSQL, SQLAlchemy, and React.

The backend exposes a simple CRUD API for products, and the frontend provides a lightweight interface for adding, updating, listing, and deleting products. It feels like a learning project or starter app, which makes it easy to understand and extend.

## What this project does

- Stores products in PostgreSQL
- Seeds the database with a few sample products on first run
- Exposes REST endpoints with FastAPI
- Lets the React frontend create, update, view, and delete products

Each product has:

- `id`
- `name`
- `description`
- `price`
- `quantity`

## Tech stack

Backend:

- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL

Frontend:

- React
- Axios
- Create React App

## Project structure

```text
.
|-- main.py                  # FastAPI app and API routes
|-- database.py              # SQLAlchemy engine and session setup
|-- database_models.py       # SQLAlchemy Product table model
|-- models.py                # Pydantic Product schema
|-- README.md
`-- product-frontend/
    |-- src/App.js           # Main React UI
    `-- package.json
```

## How the backend works

When the app starts, it:

1. Creates the database tables if they do not already exist
2. Checks whether the `product` table is empty
3. Inserts a few default products if no rows exist yet

Available API routes:

- `GET /products` - return all products
- `GET /products/{id}` - return a single product
- `POST /products` - create a product
- `PUT /products/{id}` - update a product
- `DELETE /products/{id}` - delete a product

## Database configuration

The backend currently uses a hardcoded PostgreSQL connection string in [database.py](/D:/Product%20Management%20-%20FastApi/Product-Management---FastAPI/database.py):

```python
postgresql://postgres:root@localhost:5433/Product
```

Before running the backend, make sure you have:

- PostgreSQL running locally
- a database named `Product`
- a PostgreSQL user/password that matches the connection string above
- PostgreSQL listening on port `5433`

If your local setup is different, update the value of `db_url` in [database.py](/D:/Product%20Management%20-%20FastApi/Product-Management---FastAPI/database.py).

## Running the backend

Create and activate a virtual environment if needed, then install the backend packages you use in the codebase:

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary
```

Start the API server from the project root:

```bash
uvicorn main:app --reload
```

The backend will be available at:

- `http://127.0.0.1:8000`

## Running the frontend

Move into the frontend folder:

```bash
cd product-frontend
```

Install dependencies:

```bash
npm install
```

Start the React app:

```bash
npm start
```

The frontend will open at:

- `http://localhost:3000`

The React app is already configured in [product-frontend/src/App.js](/D:/Product%20Management%20-%20FastApi/Product-Management---FastAPI/product-frontend/src/App.js) to call the backend at:

```text
http://127.0.0.1:8000
```

## Example product payload

```json
{
  "id": 5,
  "name": "Keyboard",
  "description": "compact mechanical keyboard",
  "price": 79.99,
  "quantity": 12
}
```

## Notes and limitations

- CORS is fully open right now (`allow_origins=["*"]`), which is convenient for development but not ideal for production.
- The backend returns simple JSON error messages instead of FastAPI `HTTPException` responses.
- The database credentials are hardcoded instead of coming from environment variables.
- There is no `requirements.txt` file yet, so Python dependencies need to be installed manually.
- The frontend is intentionally simple and does not include form validation or advanced UI handling.

## Good next improvements

If you want to keep building on this project, these would be useful upgrades:

- move database settings into environment variables
- add a `requirements.txt` or `pyproject.toml`
- return proper HTTP status codes and error responses
- add validation and user feedback in the React form
- add tests for both backend and frontend
- split routes, schemas, and database logic into separate modules

## Summary

This is a clean beginner-friendly full-stack CRUD project. The backend is easy to follow, the frontend is direct, and the overall structure is a solid base for learning FastAPI with a React client.
