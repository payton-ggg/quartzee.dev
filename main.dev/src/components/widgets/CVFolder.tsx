import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

const CVFolder = () => {
  const [isAutoOpen, setIsAutoOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAutoOpen(true);
      setTimeout(() => setIsAutoOpen(false), 2500);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const openClass = isAutoOpen ? "scale-110" : "group-hover:scale-110";
  const paperClass = isAutoOpen
    ? "-translate-y-8 rotate-2"
    : "group-hover:-translate-y-8 group-hover:rotate-2";
  const coverClass = isAutoOpen
    ? "[transform:rotateX(-25deg)_translateY(5px)]"
    : "group-hover:[transform:rotateX(-25deg)_translateY(5px)]";
  const labelClass = isAutoOpen ? "opacity-100" : "group-hover:opacity-100";

  return (
    <a
      href="https://drive.google.com/file/d/1nCBAdE6p9fgz-L3nr-J5Va0BEWs3dEYo/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group perspective-[1000px]"
      title="Download CV"
    >
      <div
        className={`relative w-24 h-20 transition-transform duration-300 cursor-pointer ${openClass}`}
      >
        <div className="absolute inset-0 bg-[#252525] rounded-lg border-2 border-gray-700 shadow-xl" />

        <div className="absolute -top-3 left-0 w-10 h-4 bg-[#252525] rounded-t-md border-2 border-b-0 border-gray-700" />

        <div
          className={`absolute inset-x-2 bottom-2 top-2 bg-gray-200 rounded-sm shadow-sm transition-all duration-500 ease-out flex flex-col items-center p-2 z-10 ${paperClass}`}
        >
          <div className="w-full h-1.5 bg-gray-400 rounded-full mb-2 opacity-30" />
          <div className="w-full h-1 bg-gray-400 rounded-full mb-1 opacity-20" />
          <div className="w-full h-1 bg-gray-400 rounded-full mb-1 opacity-20" />
          <div className="w-2/3 h-1 bg-gray-400 rounded-full mb-3 opacity-20 mr-auto" />

          <FileText size={16} className="text-gray-400 opacity-50 mt-auto" />
          <span className="text-[8px] font-bold text-gray-500 font-mono mt-1">
            CV.pdf
          </span>
        </div>

        <div
          className={`absolute inset-0 bg-[#1e1e1e] rounded-lg border-2 border-gray-600 border-t-[3px] shadow-inner z-20 flex items-center justify-center transition-all duration-500 origin-bottom ease-[cubic-bezier(0.4,0,0.2,1)] ${coverClass}`}
        >
          <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-1 h-1 rounded-full bg-red-500/50" />
            <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
          </div>

          <div className="text-center">
            <div className="font-mono text-xs text-gray-500 mb-1"> PLATO </div>
            <div className="font-mono text-sm font-bold text-terminal-green tracking-widest border border-terminal-green/30 px-2 py-0.5 rounded bg-terminal-green/5">
              CV_V1
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-lg" />
        </div>
      </div>

      <div
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-300 whitespace-nowrap opacity-0 ${labelClass}`}
      >
        <span className="font-mono text-xs text-terminal-green bg-black/80 px-2 py-1 rounded border border-gray-800">
          open_cv.exe
        </span>
      </div>
    </a>
  );
};

export default CVFolder;
