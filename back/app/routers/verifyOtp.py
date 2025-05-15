from datetime import datetime, timezone
from fastapi.responses import JSONResponse
from app.routers.database.database import get_db
from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from .. import schemas,models


router = APIRouter()


@router.post("/otp")
def verifyOtp(user:schemas.userOtp, db: Session = Depends(get_db)):
    exist_user = db.query(models.Otp).filter(models.Otp.otp == user.otp).first()

    current_time = datetime.now(timezone.utc)
    if exist_user.expire_at < current_time:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Otp Expired")

    if not exist_user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Otp does not match") #to send error message in the range of 400 to 499 other wise it send success respond to the front end.
    
    return exist_user.user_id
