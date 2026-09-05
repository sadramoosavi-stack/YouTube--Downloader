import { useState, useEffect, useRef } from "react";
import {
  IconDotsVertical,
  IconExternalLink,
  IconTrash,
} from "@tabler/icons-react";
import { getThumbnailUrl, formatDate } from "../utils/youtube";

function DownloadItem({ download, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const title = download.video_title || download.youtube_url;
  const formatLabel = download.file_type === "audio" ? "Audio" : "Video";

  return (
    <article className="download-item">
      <img
        src={getThumbnailUrl(download.youtube_url)}
        alt={title}
        className="download-thumbnail"
      />

      <div className="download-info">
        <h3>{title}</h3>

        <p>
          {formatLabel} • {download.quality || "—"} •{" "}
          <span className={`status-badge status-${download.download_status}`}>
            {download.download_status}
          </span>
        </p>

        <span>Requested {formatDate(download.created_at)}</span>
      </div>

      <div className="download-actions" ref={menuRef}>
        <button
          type="button"
          className="download-menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <IconDotsVertical size={20} />
        </button>

        {menuOpen && (
          <div className="download-menu">
            <a
              href={download.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink size={17} />
              Open in Youtube
            </a>

            <button
              type="button"
              className="delete-option"
              onClick={() => onDelete(download.id)}
            >
              <IconTrash size={17} />
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default DownloadItem;
