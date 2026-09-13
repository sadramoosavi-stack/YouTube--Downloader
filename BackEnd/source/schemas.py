from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterResponse(BaseModel):
    message: str
    user_id: int


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class ProfileResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime


class DownloadRequest(BaseModel):
    youtube_url: str
    file_type: str
    quality: Optional[str] = None


class DownloadResponse(BaseModel):
    download_id: int
    status: str


class DownloadHistoryResponse(BaseModel):
    id: int
    youtube_url: str
    video_title: Optional[str] = None
    file_type: str
    quality: Optional[str] = None
    download_status: str
    file_name: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
