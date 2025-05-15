from datetime import datetime, timedelta, timezone
from app import models, schemas
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.routers.database.database import get_db
import random
from .. import email

router = APIRouter()

@router.post("/forgot-password")
def Otpsend(user: schemas.Email, db: Session = Depends(get_db)):
    existUser = db.query(models.User).filter(models.User.email == user.email).first()  #we need to access email like user.email and can not access as user
    exist_email = existUser.email
    if not exist_email:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email does not exist.")

    expire_at = datetime.now(timezone.utc) + timedelta(seconds=30)
    print(expire_at)
    otp = random.randint(1234, 8987)
    db.add(models.Otp(otp = otp, expire_at = expire_at, user_id = existUser.id))
    db.commit()
    email.send_otp_email(otp, exist_email)
    
    error_details = HTTPException(status_code=status.HTTP_201_CREATED, detail="OTP sent successfully. Check your emails.")

    return error_details.detail