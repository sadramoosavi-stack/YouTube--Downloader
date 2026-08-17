from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime


database_url = "sqlite:///./database.db"

engine = create_engine(database_url, connect_args={"check_same_thread": False})

session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

base = declarative_base()


class User(base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    downloads = relationship("Download", back_populates="user", cascade="all, delete")


class Download(base):
    __tablename__ = "downloads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    youtube_url = Column(String(500), nullable=False)
    video_title = Column(String(300), nullable=True)

    file_type = Column(String(20), nullable=False)
    quality = Column(String(30), nullable=True)

    download_status = Column(String(30), default="pending")

    file_name = Column(String(300), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="downloads")


def get_db():
    db = session_local()

    try:
        yield db
    finally:
        db.close()