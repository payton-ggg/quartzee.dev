import { useEffect, useState } from "react";
import { useWeather } from "../../hooks/useWeather";

const AsciiRain = () => {
  const [drops, setDrops] = useState<Array<{ id: number, x: number, delay: number, duration: number, content: string }>>([]);

  useEffect(() => {
    const chars = ["|", "!", ":", ".", "·", "'", "`"];
    const newDrops = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 0.8 + Math.random() * 1.5,
      content: chars[Math.floor(Math.random() * chars.length)]
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute text-green-500/40 font-mono text-sm"
          style={{
            left: `${drop.x}%`,
            top: `-20px`,
            animation: `fall ${drop.duration}s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        >
          {drop.content}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const KyivWeather = () => {
  const { weather, loading } = useWeather();

  if (loading || !weather) return null;

  return (
    <>
      {weather.isRaining && <AsciiRain />}
      {/* Positioned right below the KyivClock which is at top-6 */}
      <div className="fixed top-24 right-6 flex flex-col items-end gap-1 z-50 pointer-events-none hidden sm:flex">
        <div className="font-mono text-[10px] text-gray-500 tracking-wider uppercase bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
          {weather.vibe}
        </div>
        <div className="font-mono text-xl text-green-400 tracking-wider glitch mt-1">
          {weather.temp.toFixed(1)}°C
        </div>
      </div>
      
      {/* Mobile view fallback: position relative or bottom if top is crowded */}
      <div className="fixed bottom-6 left-6 flex flex-col items-start gap-1 z-50 pointer-events-none sm:hidden">
        <div className="font-mono text-[10px] text-gray-500 tracking-wider uppercase bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
          {weather.vibe}
        </div>
        <div className="font-mono text-lg text-green-400 tracking-wider glitch mt-1">
          {weather.temp.toFixed(1)}°C
        </div>
      </div>
    </>
  );
};

export default KyivWeather;
