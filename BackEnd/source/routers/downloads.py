from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from source.database import Download, User, get_db
from source.schemas import (DownloadRequest, DownloadResponse)
from source.routers.users import get_current_user


router = APIRouter(prefix="/downloads", tags=["Downloads"])


@router.post("", response_model=DownloadResponse)
def create_download(data: DownloadRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if data.file_type not in ["video", "audio"]:
        raise HTTPException(status_code=400, detail="file_type must be video or audio")

    new_download = Download(user_id=current_user.id, youtube_url=data.youtube_url, file_type=data.file_type, quality=data.quality, download_status="pending")

    db.add(new_download)
    db.commit()
    db.refresh(new_download)

    return {"download_id": new_download.id, "status": new_download.download_status}


@router.get("")
def get_download_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    downloads = db.query(Download).filter(Download.user_id == current_user.id).order_by(Download.created_at.desc()).all()

    return downloads


@router.delete("/{download_id}")
def remove_download(download_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    download = db.query(Download).filter(Download.id == download_id, Download.user_id == current_user.id).first()

    if not download:
        raise HTTPException(status_code=404, detail="Download not found")

    db.delete(download)
    db.commit()

    return {"message": "Download removed succesfully"}