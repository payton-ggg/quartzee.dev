import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  weathercode: number;
  time: string;
}

interface ProcessedWeather {
  temp: number;
  isRaining: boolean;
  isSnowing: boolean;
  vibe: string;
}

export function useWeather(lat = 50.4547, lon = 30.5238) {
  const [weather, setWeather] = useState<ProcessedWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        if (!res.ok) throw new Error("Weather fetch failed");
        
        const data = await res.json();
        const current: WeatherData = data.current_weather;

        if (!isMounted) return;

        const code = current.weathercode;
        const isRaining = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code);
        const isSnowing = [71, 73, 75, 77, 85, 86].includes(code);
        const isThunder = [95, 96, 99].includes(code);

        // Get local hour to determine day/night
        const hour = new Date().getHours();
        const isNight = hour >= 22 || hour < 6;

        let vibe = "";
        if (isThunder) {
          vibe = "STATUS: ⚡ Hacker mode active";
        } else if (isRaining) {
          vibe = "STATUS: 🌧️ Coding with coffee";
        } else if (isSnowing) {
          vibe = "STATUS: ❄️ Frozen fingers";
        } else if (isNight) {
          vibe = "STATUS: 🌙 Night owl mode";
        } else {
          vibe = "STATUS: ☀️ Chilling with bugs";
        }

        setWeather({
          temp: current.temperature,
          isRaining,
          isSnowing,
          vibe,
        });

      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [lat, lon]);

  return { weather, loading };
}
