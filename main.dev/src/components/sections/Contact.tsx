import React from "react";
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  Send,
  MessageSquare,
} from "lucide-react";
import GlitchText from "../ui/GlitchText";

const Contact: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center min-h-[85vh] py-6 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono flex items-center">
            <span className="text-gray-600 mr-2">## </span>
            <GlitchText text="reach out" />
            <span className="text-green-500 text-xs sm:text-sm font-normal ml-3">
              // contact & socials
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-lg backdrop-blur-md self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>OPEN FOR OPPORTUNITIES</span>
        </div>
      </div>

      {/* Main Glass Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-black/50 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-2xl">
        {/* Left column: Direct Message Form */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">
            [ SEND DIRECT TRANSMISSION ]
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! Thanks for reaching out.");
            }}
            className="space-y-3 font-mono"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 text-xs mb-1">
                  name:
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="your name"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">
                  email:
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1">
                message:
              </label>
              <textarea
                rows={3}
                required
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                placeholder="let's build something scalable..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/40 text-xs sm:text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 font-bold shadow-[0_0_12px_rgba(34,197,94,0.15)]"
            >
              <Send size={15} />
              <span>SEND MESSAGE</span>
            </button>
          </form>
        </div>

        {/* Right column: Connect & Socials Hub */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold mb-3">
              [ DIRECT CHANNELS ]
            </div>

            <div className="space-y-2 font-mono">
              <a
                href="mailto:platonmarynych@gmail.com"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-green-500/40 hover:bg-white/[0.06] text-gray-300 hover:text-green-400 transition-all text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                  <Mail size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500">Email</span>
                  <span className="font-semibold truncate">
                    platonmarynych@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://platon.best/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-green-500/40 hover:bg-white/[0.06] text-gray-300 hover:text-green-400 transition-all text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Globe size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500">Portfolio</span>
                  <span className="font-semibold">platon.best</span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold mb-2">
              [ FIND ME ONLINE ]
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono">
              <a
                href="https://github.com/payton-ggg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-green-500/30 text-gray-400 hover:text-white transition-all text-xs"
              >
                <Github size={14} className="text-gray-300" />
                <span className="truncate">@payton-ggg</span>
              </a>

              <a
                href="https://www.linkedin.com/in/marynych-platon-0b0407291/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-green-500/30 text-gray-400 hover:text-white transition-all text-xs"
              >
                <Linkedin size={14} className="text-blue-400" />
                <span className="truncate">LinkedIn</span>
              </a>

              <a
                href="https://t.me/quartzee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-green-500/30 text-gray-400 hover:text-white transition-all text-xs"
              >
                <MessageSquare size={14} className="text-cyan-400" />
                <span className="truncate">@quartzee</span>
              </a>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-500 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>UTC+2 / Kyiv</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Credits */}
      <div className="mt-4 text-center font-mono text-[11px] text-gray-600">
        PLATON MARYNYCH © {new Date().getFullYear()} // CRAFTED WITH REACT, TS &
        PARALLAX
      </div>
    </div>
  );
};

export default Contact;
