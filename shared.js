// Extrae el ID de video de cualquier formato de link de YouTube
export function extractVideoId(input) {
  if (!input) return null;
  const text = input.trim();

  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1];
  }

  // Si el usuario pegó directamente el ID (11 caracteres)
  if (/^[a-zA-Z0-9_-]{11}$/.test(text)) return text;

  return null;
}

// Obtiene el título del video usando el oEmbed público de YouTube (no requiere API key)
export async function getVideoTitle(videoId) {
  try {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.title || null;
  } catch (e) {
    return null;
  }
}

// Busca videos en YouTube usando la YouTube Data API v3
export async function searchVideos(apiKey, queryText) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(queryText)}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.error?.message || "Error al buscar en YouTube");
  }
  const data = await res.json();
  return (data.items || []).map(item => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${item.id.videoId}/default.jpg`,
  }));
}

// Trae los videos musicales más populares del momento (tendencias), para usar como
// música de fondo cuando nadie ha pedido nada. regionCode: "PE" = Perú.
export async function getTrendingMusic(apiKey, regionCode = "PE") {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=10&maxResults=50&regionCode=${regionCode}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.error?.message || "Error al obtener tendencias de YouTube");
  }
  const data = await res.json();
  return (data.items || []).map(item => ({
    videoId: item.id,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
  }));
}
