export function extractYoutubeId(url) {
  if (!url) return null;

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  return match ? match[1] : null;
}

export function getThumbnailUrl(url) {
  const videoId = extractYoutubeId(url);
  return videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : "/placeholder-thumbnail.png";
}



export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
