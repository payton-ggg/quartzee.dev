import { useEffect, useState } from "react";
import { TrackData } from "../types";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_PUBLIC_CLIENT_ID;
const REDIRECT_URI = window.location.origin;
const SCOPES = "user-read-currently-playing";

const CurrentlyPlaying = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [track, setTrack] = useState<TrackData | null>(null);

  // Step 1: Extract token from URL after auth redirect
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        window.history.replaceState({}, document.title, "/"); // Clean URL
      }
    }
  }, []);

  // Step 2: Fetch current track
  useEffect(() => {
    if (!accessToken) return;

    const fetchTrack = async () => {
      const res = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 204 || res.status >= 400) {
        setTrack(null);
        return;
      }

      const data = await res.json();
      const trackInfo: TrackData = {
        name: data.item.name,
        artists: data.item.artists
          .map((a: { name: string }) => a.name)
          .join(", "),
        albumImage: data.item.album.images[0]?.url ?? "",
        progress: data.progress_ms,
        duration: data.item.duration_ms,
      };
      setTrack(trackInfo);
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [accessToken]);

  const handleLogin = () => {
    const authURL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authURL;
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="mt-10 bg-[#212121] border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl text-white mb-6">
        <span className="text-gray-500">## </span>
        currently coding
      </h2>
      <p className="text-base text-gray-400 mb-6">
        below lies the track that i'm currently listening to on spotify... or,
        well, simply nothing if i'm not listening to anything atm :p
      </p>

      {accessToken ? (
        track ? (
          <div className="flex items-center space-x-6 bg-[#161616] border border-gray-600 rounded-lg p-4">
            <img
              src={track.albumImage}
              alt="Album Cover"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="text-white font-semibold text-base">
                {track.name}
              </div>
              <div className="text-gray-400 text-sm">by {track.artists}</div>
            </div>
            <div className="text-gray-400 text-sm">
              {formatTime(track.progress)} / {formatTime(track.duration)}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Not playing anything.</p>
        )
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
        >
          Connect to Spotify
        </button>
      )}

      <p className="text-xs text-gray-500 mt-3">
        this data is approximate and may be delayed by a few seconds.
      </p>
    </div>
  );
};

export default CurrentlyPlaying;
