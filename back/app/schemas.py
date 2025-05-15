
from pydantic import BaseModel
class User(BaseModel):
    email: str
    password1: str
    password2: str

class signIn(BaseModel):
    email:str
    password:str
    
class Email(BaseModel):
    email:str

class UserInDB(BaseModel):
    email:str
    class Config:
        from_attributes = True

class UserEmail(BaseModel):
    email:str
    
    class Config:
        from_attributes = True

class userOtp(BaseModel):
    otp:str

class resetPass(BaseModel):
    password1:str
    password2:str