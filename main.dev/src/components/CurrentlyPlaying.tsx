import { useEffect, useState } from "react";
import { Track } from "../types";

const SPOTIFY_ACCESS_TOKEN = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;

export default function CurrentlyPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentlyPlaying = async () => {
    try {
      const res = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
          },
        }
      );

      if (res.status === 204 || res.status === 202 || res.status === 400) {
        setTrack(null);
        return;
      }

      const data = await res.json();

      if (!data?.item) {
        setTrack(null);
        return;
      }

      setTrack({
        name: data.item.name,
        artist: data.item.artists
          .map((a: { name: string }) => a.name)
          .join(", "),

        image: data.item.album.images[0].url,
        progress: data.progress_ms,
        duration: data.item.duration_ms,
      });
    } catch (err) {
      console.error("Error fetching track", err);
      setTrack(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentlyPlaying();
    const interval = setInterval(fetchCurrentlyPlaying, 10000); // обновление каждые 10 сек
    return () => clearInterval(interval);
  }, []);

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
        <span className="text-gray-500">### </span>
        currently coding
      </h2>
      <p className="text-base text-gray-400 mb-6">
        below lies the track that i'm currently listening to on spotify... or,
        well, simply nothing if i'm not listening to anything atm :p
      </p>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : track ? (
        <div className="flex items-center space-x-6 bg-[#161616] border border-gray-600 rounded-lg p-4">
          <img
            src={track.image}
            alt="Album Cover"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="text-white font-semibold text-base">
              {track.name}
            </div>
            <div className="text-gray-400 text-sm">by {track.artist}</div>
          </div>
          <div className="text-gray-400 text-sm">
            {formatTime(track.progress)} / {formatTime(track.duration)}
          </div>
        </div>
      ) : (
        <div className="text-gray-400">Not playing anything 😴</div>
      )}

      <p className="text-xs text-gray-500 mt-3">
        this data is approximate and may be delayed by a few seconds.
      </p>
    </div>
  );
}
