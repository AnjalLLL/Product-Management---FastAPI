from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
db_url = "postgresql://postgres:root@localhost:5433/Product"
engine = create_engine(db_url)
Session = sessionmaker(autoflush=False,autocommit=False,bind=engine)