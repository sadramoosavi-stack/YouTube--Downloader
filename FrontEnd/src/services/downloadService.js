import api from "./api";


export async function createDownload(youtube_url, file_type, quality) {
  const response = await api.post("/downloads", {
    youtube_url,
    file_type,
    quality,
  });
  return response.data;    /*{download_id, status} */
}


export async function getDownloads() {
  const response = await api.get("/downloads");
  return response.data; 
}


export async function deleteDownload(id) {
  const response = await api.delete(`/downloads/${id}`);
  return response.data; // { message }
}

// Fetches the actual downloaded file and hands it to the browser.
// This endpoint needs the auth token, so a plain <a href> link won't
// work (the browser won't attach the Authorization header). We fetch
// it via axios instead and trigger the save manually.
export async function downloadFile(id, fileName) {
  const response = await api.get(`/downloads/${id}/file`, {
    responseType: "blob",
  });

  const blobUrl = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}
