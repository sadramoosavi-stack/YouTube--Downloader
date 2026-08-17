from fastapi import *


from fastapi.middleware.cors import CORSMiddleware

from source.database import base, engine

from source.routers import auth
from source.routers import users
from source.routers import downloads


base.metadata.create_all(bind=engine)



app = FastAPI(title="YouTube Downloader API", version="0.1.0")


app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(downloads.router)


@app.get("/")
def home():
    return {"message": "YouTube Downloader API is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}