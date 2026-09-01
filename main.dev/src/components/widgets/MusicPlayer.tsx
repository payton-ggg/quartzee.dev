import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Music,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";

const TRACK = {
  title: "Forever Young",
  artist: "FACE",
  src: "/ForeverYoung.m4a",
  cover: "https://i1.sndcdn.com/artworks-000186016976-4hxtr9-t500x500.jpg",
};

const MusicPlayer = ({ onReady }: { onReady?: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Only attempt auto-play on desktop/larger screens (>= 768px)
    const isMobileDevice =
      typeof window !== "undefined" && window.innerWidth < 768;

    if (audioRef.current && !isMobileDevice) {
      audioRef.current.volume = 0.3;

      const handleCanPlay = () => {
        if (onReady) onReady();

        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay prevented by browser:", err);
          });
      };

      audioRef.current.addEventListener("canplaythrough", handleCanPlay);
      return () => {
        audioRef.current?.removeEventListener("canplaythrough", handleCanPlay);
      };
    }
  }, [onReady]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={TRACK.src} loop preload="auto" />

      {/* Hidden on mobile, only visible on desktop / tablet (md+) */}
      <div className="hidden md:flex fixed bottom-6 left-6 z-50 items-end gap-0 transition-all duration-500 ease-out">
        <div className="bg-black/80 backdrop-blur-md border border-gray-800 rounded-xl p-3 pr-0 flex items-center shadow-2xl overflow-hidden group hover:border-terminal-green/50 transition-colors">
          <div className="flex flex-col gap-2 pr-4 min-w-[120px]">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-terminal-green/10 text-terminal-green flex items-center justify-center hover:bg-terminal-green/20 transition-all border border-terminal-green/20"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="ml-1" />
                )}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={toggleMute}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <div className="flex items-end gap-[2px] h-4 pb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-terminal-green rounded-t-sm transition-all duration-300 ${
                        isPlaying ? "animate-pulse" : "h-1"
                      }`}
                      style={{
                        height: isPlaying
                          ? `${Math.random() * 80 + 20}%`
                          : "20%",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden w-full">
              <div
                className={`whitespace-nowrap font-mono text-xs text-gray-300 ${
                  isPlaying ? "animate-[marquee_10s_linear_infinite]" : ""
                }`}
              >
                {TRACK.title} -{" "}
                <span className="text-gray-500">{TRACK.artist}</span>
              </div>
            </div>
          </div>

          <div className="relative w-20 h-20 shrink-0 border-l border-gray-800">
            <img
              src={TRACK.cover}
              alt="Album Art"
              className={`w-full h-full object-cover rounded-r-lg transition-all duration-[4s] ease-linear ${
                isPlaying ? "grayscale-0" : "grayscale opacity-70"
              }`}
            />
            <div
              className={`absolute inset-2 rounded-full border border-white/20 border-t-white/60 ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3s" }}
            />

            <div className="absolute inset-0 m-auto w-4 h-4 bg-black rounded-full border border-gray-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-terminal-green rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
