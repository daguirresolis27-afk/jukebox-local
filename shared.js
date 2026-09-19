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
