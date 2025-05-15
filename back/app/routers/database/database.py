from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .config import DATABASE_URL  #this occur an error need to solve.

#SQLALCHEMY_DATABASE_URL = 'postgresql://e-commerce_owner:npg_h1XZRplf0WdH@ep-long-lab-a8pgrxso-pooler.eastus2.azure.neon.tech/e-commerce?sslmode=require'

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()