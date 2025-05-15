from fastapi import APIRouter, Depends, APIRouter, HTTPException
from .. import models, schemas, hashed
from .database.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/signin", response_model=schemas.UserEmail)
def signInUser(user:schemas.signIn, db: Session = Depends(get_db)):

    existUser = db.query(models.User).filter(models.User.email == user.email).first()

    if not existUser:
        raise HTTPException(status_code=404, detail="You are not signed up yet")
    
    hashed_password = existUser.password
    
    if not hashed.verify_password(user.password, hashed_password):
        raise HTTPException(status_code=404, detail="password incorrect")
    
    return existUser