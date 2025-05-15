from fastapi import APIRouter, Depends, APIRouter, HTTPException
from .. import models, schemas, hashed
from .database.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/signup", response_model=schemas.UserInDB)
def signUp(user: schemas.User, db: Session = Depends(get_db)):

    if(user.password1 == user.password2):
        hashed_password=hashed.get_password_hash(user.password1)
        db.add(models.User(email=user.email, password = hashed_password))
        db.commit()
        created_user = db.query(models.User).filter(models.User.email == user.email).first()
        return created_user
    else:
        raise HTTPException(status_code=400, detail="Passwords do not match")