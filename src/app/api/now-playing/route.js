import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

/* Prevent caching */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Fetches the access token from Spotify
 * @returns {Promise<{access_token: string, token_type: string, expires_in: number, scope: string}>}
 */
const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  });
  return response.json();
};

/**
 * Fetches the currently playing song from Spotify
 * @param {string} client_id 
 * @param {string} client_secret 
 * @param {string} refresh_token 
 * @returns {Promise<{albumImageUrl: string, artist: string, isPlaying: boolean, songUrl: string, title: string, status: number}>}
 */
async function getNowPlayingItem() {
    const { access_token } = await getAccessToken();
    return fetch(NOW_PLAYING_ENDPOINT, {headers: { Authorization: `Bearer ${access_token}`}}, {cache: "no-store"});
}

export async function GET(Request) {
  
  const response = await getNowPlayingItem();

    if (response.status === 204 || response.status > 400) {
        return new NextResponse(JSON.stringify({ isPlaying: false, errorStatus: "response was 204 or >= 400" }), { status: 200});
    }

    const song = await response.json();

    if (song.item === null) {
        return new NextResponse(JSON.stringify({ isPlaying: false, errorStatus: "song.item was null" }), { status: 200});
    }

    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const songType = song.currently_playing_type;

    return new NextResponse(JSON.stringify({ albumImageUrl, artist, isPlaying, songUrl, title, songType }), { status: 200});
}
