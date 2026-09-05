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
