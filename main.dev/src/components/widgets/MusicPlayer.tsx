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
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [autoExpandActive, setAutoExpandActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mobileTimerRef = useRef<number | null>(null);
  const autoExpandTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;

      const handleCanPlay = () => {
        // Notify parent that audio is ready
        if (onReady) onReady();

        // Auto-play the music
        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true);

            // Auto-expand on mobile for 10 seconds
            setIsMobileExpanded(true);
            setAutoExpandActive(true);

            autoExpandTimerRef.current = window.setTimeout(() => {
              setIsMobileExpanded(false);
              setAutoExpandActive(false);
            }, 10000);
          })
          .catch((err) => {
            console.log("Autoplay prevented by browser:", err);
          });
      };

      audioRef.current.addEventListener("canplaythrough", handleCanPlay);
      return () => {
        audioRef.current?.removeEventListener("canplaythrough", handleCanPlay);
        if (autoExpandTimerRef.current) {
          clearTimeout(autoExpandTimerRef.current);
        }
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

  const handleMobileToggle = () => {
    // Don't allow manual toggle during auto-expand period
    if (autoExpandActive) return;

    if (isMobileExpanded) {
      setIsMobileExpanded(false);
      if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    } else {
      setIsMobileExpanded(true);
      mobileTimerRef.current = setTimeout(() => {
        setIsMobileExpanded(false);
      }, 5000);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={TRACK.src} loop preload="auto" />

      <div
        className={`fixed bottom-4 md:bottom-6 left-4 md:left-6 z-50 flex items-end gap-0 transition-all duration-500 ease-out
          ${
            isMobileExpanded
              ? "translate-x-0 opacity-100"
              : "-translate-x-[120%] opacity-0 md:translate-x-0 md:opacity-100"
          }
        `}
      >
        <div className="bg-black/80 backdrop-blur-md border border-gray-800 rounded-xl p-2 md:p-3 pr-0 flex items-center shadow-2xl overflow-hidden group hover:border-terminal-green/50 transition-colors max-w-[calc(100vw-140px)] md:max-w-none">
          <div className="flex flex-col gap-1 md:gap-2 pr-3 md:pr-4 min-w-[100px] md:min-w-[120px]">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-terminal-green/10 text-terminal-green flex items-center justify-center hover:bg-terminal-green/20 transition-all border border-terminal-green/20"
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play
                    size={18}
                    fill="currentColor"
                    className="ml-0.5 md:ml-1"
                  />
                )}
              </button>

              <div className="flex gap-1.5 md:gap-2">
                <button
                  onClick={toggleMute}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <div className="flex items-end gap-[1.5px] md:gap-[2px] h-3 md:h-4 pb-0.5 md:pb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-0.5 md:w-1 bg-terminal-green rounded-t-sm transition-all duration-300 ${
                        isPlaying ? "animate-pulse" : "h-0.5 md:h-1"
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
                className={`whitespace-nowrap font-mono text-[10px] md:text-xs text-gray-300 ${
                  isPlaying ? "animate-[marquee_10s_linear_infinite]" : ""
                }`}
              >
                {TRACK.title} -{" "}
                <span className="text-gray-500">{TRACK.artist}</span>
              </div>
            </div>
          </div>

          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 border-l border-gray-800">
            <img
              src={TRACK.cover}
              alt="Album Art"
              className={`w-full h-full object-cover rounded-r-lg transition-all duration-[4s] ease-linear ${
                isPlaying ? "grayscale-0" : "grayscale opacity-70"
              }`}
            />
            <div
              className={`absolute inset-1.5 md:inset-2 rounded-full border border-white/20 border-t-white/60 ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3s" }}
            />

            <div className="absolute inset-0 m-auto w-3 h-3 md:w-4 md:h-4 bg-black rounded-full border border-gray-700 flex items-center justify-center">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-terminal-green rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleMobileToggle}
        className={`md:hidden fixed bottom-4 left-0 z-50 bg-black/80 border-y border-r border-gray-800 rounded-r-xl p-2 text-terminal-green transition-all duration-300 backdrop-blur-md
            ${
              isMobileExpanded
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }
        `}
      >
        <div
          className={`transition-transform duration-300 ${
            isPlaying ? "animate-pulse" : ""
          }`}
        >
          <Music size={18} />
          <ChevronRight
            size={12}
            className="absolute -right-1 top-1/2 -translate-y-1/2 opacity-50"
          />
        </div>
      </button>

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
