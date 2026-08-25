import React from "react";

interface SectionInfo {
  id: string;
  label: string;
  short: string;
}

interface FullpageNavigationProps {
  currentSection: number;
  totalSections: number;
  sections: SectionInfo[];
  goToSection: (index: number) => void;
  progress: number;
}

export const FullpageNavigation: React.FC<FullpageNavigationProps> = ({
  currentSection,
  totalSections,
  sections,
  goToSection,
  progress,
}) => {
  return (
    <>
      {/* Top slim progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(34,197,94,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Side Dots Navigation */}
      <nav
        aria-label="Section Navigation"
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 py-4 px-2 rounded-full bg-[#111317]/95 border border-white/10 shadow-2xl transition-all"
      >
        {sections.map((sec, idx) => {
          const isActive = currentSection === idx;
          const num = String(idx + 1).padStart(2, "0");

          return (
            <button
              key={sec.id}
              onClick={() => goToSection(idx)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              title={sec.label}
              aria-label={`Go to ${sec.label}`}
            >
              {/* Tooltip on hover */}
              <div className="absolute right-9 px-2.5 py-1 rounded bg-black/90 border border-green-500/30 text-green-400 font-mono text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 shadow-lg">
                <span className="text-gray-500 mr-1.5">{num} //</span>
                {sec.label}
              </div>

              {/* Dot */}
              <div
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? "w-4 h-4 bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] scale-110"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-400 hover:scale-125"
                }`}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                )}
              </div>
            </button>
          );
        })}

        {/* Section Counter */}
        <div className="mt-2 text-[10px] font-mono text-gray-500 flex flex-col items-center select-none border-t border-white/10 pt-2">
          <span className="text-green-400 font-bold">
            {String(currentSection + 1).padStart(2, "0")}
          </span>
          <span className="text-gray-700">/</span>
          <span>{String(totalSections).padStart(2, "0")}</span>
        </div>
      </nav>
    </>
  );
};

export default FullpageNavigation;
