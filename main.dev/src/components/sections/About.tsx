import React from "react";
import { CurrentlyPlaying } from "../widgets";
import ChangingText from "../ui/ChangingText";
import { ChevronDown, Sparkles } from "lucide-react";

interface AboutProps {
  onScrollDown?: () => void;
}

const About: React.FC<AboutProps> = ({ onScrollDown }) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center min-h-full py-2 sm:py-6 px-1 sm:px-4 md:px-8">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
        <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] sm:text-xs font-mono flex items-center gap-2">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse" />
          <span>FULLSTACK ENGINEER // AVAILABLE</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <Sparkles size={13} className="text-yellow-400" />
          <span>3+ YEARS EXP</span>
        </div>
      </div>

      {/* Main Title & Changing text */}
      <div className="mb-3 sm:mb-5">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-extrabold text-white tracking-tight mb-1 sm:mb-2">
          <span className="text-gray-600"># </span>
          platon marynych
        </h1>
        <div className="py-1 sm:py-2">
          <ChangingText />
        </div>
      </div>

      {/* Glassmorphic Summary Card */}
      <div
        data-scrollable="true"
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 bg-[#111317]/95 border border-white/10 rounded-2xl p-3.5 sm:p-5 md:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-h-[60vh] sm:max-h-none overflow-y-auto sm:overflow-visible custom-scrollbar"
      >
        {/* Left column: Bio */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
          <div className="text-[11px] sm:text-xs uppercase tracking-widest text-green-400 font-bold flex items-center gap-2">
            <span>[ SYSTEM OVERVIEW ]</span>
          </div>
          <p>
            Full Stack Developer designing and building production-ready web
            applications across <span className="text-white font-semibold">E-commerce, SaaS, Content Platforms</span>, and <span className="text-white font-semibold">Startups</span>.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Strong focus on frontend architecture (React / Next.js / TypeScript),
            scalable backend APIs (NestJS / Go / PostgreSQL), performance optimization,
            and developer experience.
          </p>
          <div className="pt-1">
            <CurrentlyPlaying />
          </div>
        </div>

        {/* Right column: Highlights Grid */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3 font-mono text-xs sm:text-sm">
          <div className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold">
            KEY CAPABILITIES
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-green-500/40 hover:bg-white/[0.06] transition-all">
              <div className="text-green-400 font-bold text-[11px] sm:text-xs">01. STREAMING & EXTENSIONS</div>
              <div className="text-gray-400 text-[10px] sm:text-xs">Chrome MV3, ReadableStream & Service Workers</div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-green-500/40 hover:bg-white/[0.06] transition-all">
              <div className="text-cyan-400 font-bold text-[11px] sm:text-xs">02. AI CRM & REALTIME SYNC</div>
              <div className="text-gray-400 text-[10px] sm:text-xs">NLP Intent Recognition & Omnichannel WebSockets</div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-green-500/40 hover:bg-white/[0.06] transition-all">
              <div className="text-emerald-400 font-bold text-[11px] sm:text-xs">03. HIGH-LOAD WEB APPS</div>
              <div className="text-gray-400 text-[10px] sm:text-xs">Next.js Middleware, Custom CMS & Caching</div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-green-500/40 hover:bg-white/[0.06] transition-all">
              <div className="text-yellow-400 font-bold text-[11px] sm:text-xs">04. MIGRATIONS & CLOUD</div>
              <div className="text-gray-400 text-[10px] sm:text-xs">Vue to React, Go Microservices & GCP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      {onScrollDown && (
        <button
          onClick={onScrollDown}
          className="mt-3 sm:mt-6 self-center hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-green-400 transition-colors animate-bounce cursor-pointer group"
        >
          <span>EXPLORE SKILLS & EXPERIENCE</span>
          <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default About;

