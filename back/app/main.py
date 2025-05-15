from fastapi import FastAPI
from .models import Base
from .routers.database.database import engine
from .routers import otpCreate, signUp, signIn, verifyOtp, resetPassword
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(signUp.router)
app.include_router(signIn.router)
app.include_router(otpCreate.router)
app.include_router(verifyOtp.router)
app.include_router(resetPassword.router)