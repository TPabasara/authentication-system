from fastapi import APIRouter, Depends, HTTPException, status
from .. import models, schemas, hashed
from .database.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.put("/resetPassword/{id}")
def resetPassword(id:str, password:schemas.resetPass, db: Session = Depends(get_db)):
    print(id)
    exist_user = db.query(models.User).filter(models.User.id == int(id))

    if not  exist_user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if(password.password1 == password.password2):
        hashed_pass = hashed.get_password_hash(password.password1)
        exist_user.update({"password": hashed_pass})
        db.commit()
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")

    success_details = HTTPException(status_code=status.HTTP_200_OK, detail="Password changed successfully")
    return success_details.detail