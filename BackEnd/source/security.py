from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext



secret_key = "change-this-later"
algorithm = "HS256"
token_minutes = 60


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return password_context.hash(password)


def verify_password(password: str, hashed_password: str):
    return password_context.verify(password, hashed_password)


def create_access_token(user_id: int):
    expire_time = datetime.now(timezone.utc) + timedelta(minutes=token_minutes)

    payload = {"sub": str(user_id),"exp": expire_time}

    return jwt.encode(payload, secret_key, algorithm=algorithm)