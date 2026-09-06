import { useState } from "react";
import { createDownload } from "../services/downloadService";

export default function DownloadBox() {
  const [url, setUrl] = useState("");
  const [fileType, setFileType] = useState("video");
  const [quality, setQuality] = useState("720p");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: "" }

  const handleDownload = async () => {
    if (!url.trim()) {
      setMessage({ type: "error", text: "your link..." });
      return;
    }

    setMessage(null);
    setLoading(true);

    try {
      const result = await createDownload(url, fileType, quality);
      setMessage({
        type: "success",
        text: `Status: ${result.status}`,
      });
      setUrl("");
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage({
          type: "error",
          text: "You should log in to your account to download.",
        });
      } else {
        const detail =
          err.response?.data?.detail || "Oops! Something went wrong.";
        setMessage({ type: "error", text: detail });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="download-box">
      <div className="download-header">
        <h2>Download from YouTube</h2>
        <p>Paste your YouTube link and download it instantly.</p>
      </div>

      <div className="download-input-row">
        <input
          type="text"
          placeholder="Paste your YouTube URL here..."
          className="download-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <select
          className="download-select"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>

        {fileType === "video" && (
          <select
            className="download-select"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="1080p">1080p</option>
            <option value="720p">720p</option>
            <option value="480p">480p</option>
            <option value="360p">360p</option>
          </select>
        )}

        <button
          className="download-button"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Sending..." : "Download"}
        </button>
      </div>

      {message && (
        <p
          className={
            message.type === "error" ? "download-message-error" : "download-message-success"
          }
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
