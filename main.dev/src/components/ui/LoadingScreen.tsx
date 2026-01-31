import { useState, useEffect } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [percent, setPercent] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [status, setStatus] = useState("INITIALIZING SYSTEMS...");

  useEffect(() => {
    if (!isLoading) {
      setPercent(100);
      setStatus("READY_TO_LAUNCH");
      const timer = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev < 90) return prev + Math.random() * 15;
        return prev;
      });
    }, 400);

    const statusMessages = [
      "CALIBRATING BIOMETRICS...",
      "SCANNING PHYSICAL ENGINE...",
      "SYNCING AUDIO CORE...",
      "UPGRADING MUSCLE MEMORY...",
      "OPTIMIZING ARCHITECTURE...",
    ];

    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      setStatus(statusMessages[msgIdx % statusMessages.length]);
      msgIdx++;
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-1000 ease-in-out
            ${
              !isLoading
                ? "opacity-0 pointer-events-none scale-105"
                : "opacity-100"
            }
        `}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <img
          src="/loading-bg.png"
          alt="Loading Background"
          className="max-h-[50vh] w-auto object-contain opacity-40 md:opacity-60 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="w-full h-[1px] bg-terminal-green absolute animate-[scan_4s_linear_infinite]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm px-6">
        <div className="text-terminal-green font-mono tracking-[0.4em] text-xs md:text-sm animate-pulse">
          BOOT_SEQUENCE_ALPHA
        </div>

        <div className="w-full h-[3px] bg-gray-900 overflow-hidden relative border border-gray-800/50">
          <div
            className="h-full bg-terminal-green transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between w-full font-mono text-[9px] text-gray-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-terminal-green animate-ping" />
            {status}
          </div>
          <div>{Math.round(percent)}%</div>
        </div>

        <div className="w-full bg-black/20 border border-white/5 rounded p-3 font-mono text-[8px] text-gray-600 leading-relaxed backdrop-blur-sm">
          <div className="text-terminal-green/50 mb-1 font-bold">
            SYSTEM_OWNER: PLATO
          </div>
          <div>STATUS: OPTIMIZED_LOAD</div>
          <div className="mt-1 text-terminal-green/30 animate-pulse">
            _ WAITING_FOR_AUDIO_STREAM
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
            0% { top: -10%; }
            100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
