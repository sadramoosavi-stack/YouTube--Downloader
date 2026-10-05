export function extractYoutubeId(url) {
  if (!url) return null;

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  return match ? match[1] : null;
}

export function getThumbnailUrl(url) {
  const videoId = extractYoutubeId(url);
  if (videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  // Inline fallback so we don't depend on a missing /public asset
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">' +
        '<rect width="100%" height="100%" fill="#27272a"/>' +
        '<text x="50%" y="50%" fill="#71717a" font-size="16" ' +
        'text-anchor="middle" dominant-baseline="middle">No preview</text>' +
        "</svg>"
    )
  );
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
