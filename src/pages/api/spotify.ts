import type { APIRoute } from "astro";

// --- ENV ---
const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

// Spotify TOKEN URL
const TOKEN_URL = "https://accounts.spotify.com/api/token";

// --- Fungsi untuk refresh access token ---
async function getAccessToken() {
  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Failed getting access token:", data);
    return null;
  }

  return data.access_token;
}

// --- Fungsi request recently played ---
async function getRecentlyPlayed(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return data;
}

// --- API ROUTE ---
export const GET: APIRoute = async () => {
  // 1. Refresh access token
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return new Response(
      JSON.stringify({ error: "Failed to refresh access token" }),
      { status: 500 }
    );
  }

  // 2. Get recent track
  const recent = await getRecentlyPlayed(accessToken);

  if (!recent.items || recent.items.length === 0) {
    return new Response(JSON.stringify({ error: "No songs found" }), {
      status: 404,
    });
  }

  const track = recent.items[0].track;

  // 3. Format clean JSON
  const result = {
    name: track.name,
    artist: track.artists.map((a: { name: string }) => a.name).join(", "),
    url: track.external_urls.spotify,
    cover: track.album.images[0]?.url ?? null,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
