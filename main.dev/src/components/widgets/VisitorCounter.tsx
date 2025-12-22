import { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [online, setOnline] = useState<number>(42);
  const [total, setTotal] = useState<number>(1337);
  const [glitch, setGlitch] = useState<boolean>(false);

  useEffect(() => {
    // Небольшие случайные колебания для online счетчика (±2)
    const onlineInterval = setInterval(() => {
      setOnline((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newValue = prev + change;
        return Math.max(38, Math.min(46, newValue)); // Держим около 42 (38-46)
      });
    }, 3000);

    // Медленный рост total счетчика
    const totalInterval = setInterval(() => {
      setTotal((prev) => prev + Math.floor(Math.random() * 3)); // +0 to +2
    }, 100000);

    // Случайный glitch эффект
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 8000);

    return () => {
      clearInterval(onlineInterval);
      clearInterval(totalInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const renderProgressBar = (
    value: number,
    max: number,
    length: number = 8
  ) => {
    const filled = Math.floor((value / max) * length);
    return "█".repeat(filled) + "░".repeat(length - filled);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`font-mono text-xs space-y-1 ${glitch ? "glitch" : ""}`}>
        <div className="flex items-center gap-2 text-green-400">
          <span className="text-gray-500">[ONLINE]</span>
          <span className="text-green-400">
            {renderProgressBar(online, 50)}
          </span>
          <span className="text-white font-bold">{online}</span>
          <span className="text-gray-600">visitors</span>
        </div>
        <div className="flex items-center gap-2 text-blue-400">
          <span className="text-gray-500">[TOTAL]</span>
          <span className="text-blue-400">
            {renderProgressBar(total % 100, 100)}
          </span>
          <span className="text-white font-bold">{total}</span>
          <span className="text-gray-600">hits</span>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
