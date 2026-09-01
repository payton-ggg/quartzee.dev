import React, { useEffect, useState } from "react";
import { Type } from "lucide-react";

type FontOption = {
  id: string;
  name: string;
  family: string;
  preview: string;
};

const fonts: FontOption[] = [
  {
    id: "mono",
    name: "Mono",
    family: '"JetBrains Mono", monospace',
    preview: "Aa",
  },
  {
    id: "space",
    name: "Space",
    family: '"Space Grotesk", sans-serif',
    preview: "Aa",
  },
  {
    id: "epic",
    name: "Epic",
    family: '"Cinzel", serif',
    preview: "Aa",
  },
  {
    id: "pixel",
    name: "Pixel",
    family: '"Press Start 2P", cursive',
    preview: "Aa",
  },
  {
    id: "cyber",
    name: "Cyber",
    family: '"Orbitron", sans-serif',
    preview: "Aa",
  },
];

const FontSelector: React.FC = () => {
  const [activeFont, setActiveFont] = useState("mono");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedFont = localStorage.getItem("theme-font");
    if (savedFont) {
      const font = fonts.find((f) => f.id === savedFont);
      if (font) {
        setActiveFont(savedFont);
        document.documentElement.style.setProperty(
          "--font-primary",
          font.family
        );
      }
    }
  }, []);

  const handleFontChange = (fontId: string) => {
    const font = fonts.find((f) => f.id === fontId);
    if (font) {
      setActiveFont(fontId);
      document.documentElement.style.setProperty("--font-primary", font.family);
      localStorage.setItem("theme-font", fontId);
    }
  };

  return (
    <div className="fixed top-3 left-3 md:top-1/2 md:left-6 md:-translate-y-1/2 z-50 flex flex-col gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle font selection"
        className={`p-2 sm:p-2.5 md:p-3 rounded-xl border transition-all duration-300 backdrop-blur-md shadow-lg ${
          isOpen
            ? "bg-green-500/20 border-green-500 text-green-400"
            : "bg-black/60 border-white/10 text-gray-400 hover:border-gray-600 hover:text-white"
        }`}
      >
        <Type className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Font Options Dropdown */}
      <div
        className={`flex flex-col gap-1.5 transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } absolute top-full left-0 mt-2 md:mt-0 md:left-full md:top-0 md:ml-3 origin-top-left md:origin-left`}
      >
        {isOpen &&
          fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => {
                handleFontChange(font.id);
                setIsOpen(false);
              }}
              className={`group flex items-center justify-between gap-3 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg border backdrop-blur-md transition-all w-28 md:w-32 shadow-xl ${
                activeFont === font.id
                  ? "bg-green-500/20 border-green-500 text-green-400"
                  : "bg-black/90 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
              title={font.name}
            >
              <span className="text-xs md:text-sm font-medium">{font.name}</span>
              <span
                className="text-[10px] md:text-xs opacity-60"
                style={{ fontFamily: font.family }}
              >
                {font.preview}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default FontSelector;
