import { useState, useEffect } from "react";

import DownloadItem from "@/components/DownloadItem";
import { IconTrash } from "@tabler/icons-react";
import { getDownloads, deleteDownload } from "../services/downloadService";

import "./Downloads.css";
import Sidebar from "./Sidebar";


function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDownloads();
  }, []);

  async function loadDownloads() {
    setLoading(true);
    setError("");

    try {
      const data = await getDownloads();
      setDownloads(data);
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    // .
    const previous = downloads;
    setDownloads((prev) => prev.filter((d) => d.id !== id));

    try {
      await deleteDownload(id);
    } catch (err) {
      setDownloads(previous);
      setError("An error occurred while deleting this item.");
    }
  };

  const handleClearHistory = async () => {
    const previous = downloads;
    setDownloads([]);

    try {
      await Promise.all(previous.map((d) => deleteDownload(d.id)));
    } catch (err) {
      setError("An Error occurred.");
      loadDownloads(); 
    }
  };

  return (
    <>
      <Sidebar />
      <main className="downloads-page">
        <section className="downloads-container">
          <div className="downloads-header">
            <div>
              <h1>Download History</h1>
              <p>Your previously downloaded files</p>
            </div>

            {downloads.length > 0 && (
              <button
                className="clear-history-button"
                onClick={handleClearHistory}
              >
                <IconTrash size={18} />
                clear History
              </button>
            )}
          </div>

          {loading && <p>uploading...</p>}

          {!loading && error && <p className="downloads-error">{error}</p>}

          {!loading && !error && downloads.length === 0 && (
            <p>No downloads yet.</p>
          )}

          {!loading && downloads.length > 0 && (
            <div className="downloads-list">
              {downloads.map((download) => (
                <DownloadItem
                  key={download.id}
                  download={download}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Downloads;
