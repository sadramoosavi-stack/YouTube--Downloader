import os
from pathlib import Path

import yt_dlp
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from source.database import Download, User, get_db
from source.schemas import DownloadRequest, DownloadResponse
from source.routers.users import get_current_user

router = APIRouter(prefix="/downloads", tags=["Downloads"])

DOWNLOAD_FOLDER = Path("downloads")


@router.post("", response_model=DownloadResponse)
def create_download(data: DownloadRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    if data.file_type not in ["video", "audio"]:

        raise HTTPException(status_code=400, detail="file_type must be video or audio")

    if not data.youtube_url.strip():

        raise HTTPException(status_code=400, detail="YouTube URL is required")

    new_download = Download(
        user_id=current_user.id,
        youtube_url=data.youtube_url,
        file_type=data.file_type,
        quality=data.quality,
        download_status="pending"
    )

    db.add(new_download)
    db.commit()
    db.refresh(new_download)

    download_folder = DOWNLOAD_FOLDER / str(new_download.id)
    download_folder.mkdir(parents=True, exist_ok=True)

    new_download.download_status = "downloading"
    db.commit()

    try:

        if data.file_type == "video":

            quality = data.quality or "720"

            if quality not in ["1080", "720", "480", "360"]:

                raise HTTPException(status_code=400, detail="Invalid video quality")

            format_option = f"bestvideo[height<={quality}]+bestaudio/best[height<={quality}]"

            ydl_options = {
                "format": format_option,
                "outtmpl": str(download_folder / "%(title)s.%(ext)s"),
                "merge_output_format": "mp4",
                "noplaylist": True,
                "restrictfilenames": True
            }

        else:

            ydl_options = {
                "format": "bestaudio/best",
                "outtmpl": str(download_folder / "%(title)s.%(ext)s"),
                "noplaylist": True,
                "restrictfilenames": True,
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "mp3",
                        "preferredquality": "192"
                    }
                ]
            }

        with yt_dlp.YoutubeDL(ydl_options) as ydl:

            info = ydl.extract_info(data.youtube_url, download=True)

            video_title = info.get("title", "Unknown")

        downloaded_files = []

        for file in download_folder.iterdir():

            if file.is_file():

                downloaded_files.append(file)

        if not downloaded_files:

            raise Exception("Downloaded file was not found")

        downloaded_file = downloaded_files[0]

        new_download.video_title = video_title
        new_download.file_name = downloaded_file.name
        new_download.download_status = "completed"

        db.commit()
        db.refresh(new_download)

        return {
            "download_id": new_download.id,
            "status": new_download.download_status
        }

    except HTTPException:

        new_download.download_status = "failed"
        db.commit()

        raise

    except Exception as e:

        new_download.download_status = "failed"
        db.commit()

        raise HTTPException(status_code=500, detail=str(e))


@router.get("")
def get_download_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    downloads = db.query(Download).filter(Download.user_id == current_user.id).order_by(Download.created_at.desc()).all()

    return downloads

@router.get("/{download_id}")
def get_download(download_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    download = db.query(Download).filter(Download.id == download_id, Download.user_id == current_user.id).first()

    if not download:
        raise HTTPException(status_code=404, detail="Download not found")

    return download


@router.get("/{download_id}/file")
def download_file(download_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    download = db.query(Download).filter(Download.id == download_id, Download.user_id == current_user.id).first()

    if not download:
        raise HTTPException(status_code=404, detail="Download not found")

    if download.download_status != "completed":
        raise HTTPException(status_code=400, detail="Download is not completed")

    if not download.file_name:
        raise HTTPException(status_code=404, detail="Downloaded file not found")

    file_path = DOWNLOAD_FOLDER / str(download.id) / download.file_name

    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="Downloaded file not found")

    if download.file_type == "video":
        media_type = "video/mp4"
    else:
        media_type = "audio/mpeg"

    return FileResponse(path=file_path, media_type=media_type, filename=download.file_name)

@router.delete("/{download_id}")
def remove_download(download_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    download = db.query(Download).filter(Download.id == download_id, Download.user_id == current_user.id).first()

    if not download:

        raise HTTPException(status_code=404, detail="Download not found")

    db.delete(download)
    db.commit()

    return {"message": "Download removed succesfully"}