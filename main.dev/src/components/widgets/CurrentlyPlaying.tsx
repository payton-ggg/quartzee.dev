import { useEffect, useState } from "react";
import { Track } from "../../types";

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
				},
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
		<div className="mt-4 sm:mt-6 bg-black/50 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5">
					<span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
					<span>CURRENTLY CODING</span>
				</h2>
				<span className="text-[10px] text-gray-500 font-mono">
					SPOTIFY SYNC
				</span>
			</div>

			{loading ? (
				<div className="text-xs text-gray-500 font-mono py-1">
					Connecting to stream...
				</div>
			) : track ? (
				<div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-lg p-2.5">
					<img
						src={track.image}
						alt="Album Cover"
						className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover flex-shrink-0"
					/>
					<div className="flex-1 min-w-0">
						<div className="text-white font-semibold text-xs sm:text-sm truncate">
							{track.name}
						</div>
						<div className="text-gray-400 text-[11px] sm:text-xs truncate">
							by {track.artist}
						</div>
					</div>
					<div className="text-gray-500 text-[10px] sm:text-xs font-mono flex-shrink-0">
						{formatTime(track.progress)} / {formatTime(track.duration)}
					</div>
				</div>
			) : (
				<div className="text-xs text-gray-400 font-mono py-1 flex items-center gap-2">
					<span>🎧 Idle / offline session</span>
				</div>
			)}
		</div>
	);
}
