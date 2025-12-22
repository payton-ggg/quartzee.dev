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
    // Load saved font
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
    <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-md ${
          isOpen
            ? "bg-terminal-green/20 border-terminal-green text-terminal-green"
            : "bg-black/40 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300"
        }`}
      >
        <Type size={20} />
      </button>

      {/* Font Options */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 origin-left ${
          isOpen
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-10 scale-95 pointer-events-none absolute left-full top-0 ml-4"
        }`}
      >
        {isOpen && // Only render children when open to keep logic clean, but using CSS opacity for transition
          fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => handleFontChange(font.id)}
              className={`group flex items-center justify-between gap-3 px-3 py-2 rounded-lg border backdrop-blur-md transition-all w-32 ${
                activeFont === font.id
                  ? "bg-terminal-green/10 border-terminal-green text-terminal-green"
                  : "bg-black/80 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"
              }`}
              title={font.name}
            >
              <span className="text-sm font-medium">{font.name}</span>
              <span
                className="text-xs opacity-50"
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
