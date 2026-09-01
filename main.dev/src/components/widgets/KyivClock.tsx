import { useEffect, useState } from "react";

const KyivClock = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const kyivTime = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Kyiv",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(kyivTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-3 right-3 md:top-6 md:right-6 flex flex-col items-end gap-0.5 md:gap-1 z-50 pointer-events-none">
      <div className="font-mono text-[10px] md:text-sm text-gray-500 tracking-wider">
        [KISHINEV]
      </div>
      <div className="font-mono text-base sm:text-xl md:text-2xl text-green-400 tracking-wider glitch font-bold">
        {time || "00:00:00"}
      </div>
    </div>
  );
};

export default KyivClock;
