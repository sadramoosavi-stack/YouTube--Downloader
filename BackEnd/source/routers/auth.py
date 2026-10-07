from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from source.database import User, get_db

from source.schemas import (RegisterRequest, RegisterResponse, LoginRequest, TokenResponse)

from source.security import (hash_password, verify_password, create_access_token)


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=RegisterResponse)
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):
    old_email = db.query(User).filter(User.email == data.email).first()

    if old_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    old_username = db.query(User).filter(User.username == data.username).first()

    if old_username:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = User(username=data.username, email=data.email, password_hash=hash_password(data.password))

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully", "user_id": new_user.id}


@router.post("/login", response_model=TokenResponse)
def login_user(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(user.id)

    return {"access_token": token, "token_type": "bearer"}