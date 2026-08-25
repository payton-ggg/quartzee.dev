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
    <div className="space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-mono text-white mb-3">
          <span className="text-gray-500">## </span>
          <GlitchText text="reach out" />
        </h1>
        <p className="font-mono text-gray-400 text-base">
          let's build something together
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="space-y-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-mono text-white mb-6">
              <span className="text-gray-500">### </span>
              send a message
            </h3>

            <form className="space-y-6">
              <div>
                <label className="block font-mono text-gray-400 text-base mb-3">
                  name:
                </label>
                <input
                  type="text"
                  className="w-full bg-black border border-gray-600 rounded px-4 py-3 font-mono text-base text-white focus:outline-none focus:border-terminal-green transition-colors"
                  placeholder="your name"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-400 text-base mb-3">
                  email:
                </label>
                <input
                  type="email"
                  className="w-full bg-black border border-gray-600 rounded px-4 py-3 font-mono text-base text-white focus:outline-none focus:border-terminal-green transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-mono text-gray-400 text-base mb-3">
                  message:
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-black border border-gray-600 rounded px-4 py-3 font-mono text-base text-white focus:outline-none focus:border-terminal-green transition-colors resize-none"
                  placeholder="tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-terminal-green text-black font-mono text-base py-3 rounded hover:bg-green-400 transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={18} />
                <span>send message</span>
              </button>
            </form>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-mono text-white mb-6">
              <span className="text-gray-500">### </span>
              anonymous letterbox
            </h3>
            <p className="font-mono text-gray-400 text-base mb-6">
              here you can type a message that will be anonymous (i won't get to
              know who you are) and will be delivered to me in a matter of
              seconds!
            </p>
            <p className="font-mono text-gray-400 text-sm mb-6">
              some of them might even get posted on the shoutbox↓ below! some of
              the posted ones might even get an answer from me!!
            </p>
            <textarea
              rows={4}
              className="w-full bg-black border border-gray-600 rounded px-4 py-3 font-mono text-base text-white focus:outline-none focus:border-terminal-green transition-colors resize-none mb-6"
              placeholder="anonymous message..."
            />
            <button className="w-full bg-gray-800 text-terminal-green font-mono text-base py-3 rounded hover:bg-gray-700 transition-colors">
              send anonymously
            </button>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="space-y-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-mono text-white mb-6">
              <span className="text-gray-500">### </span>
              direct contact
            </h3>

            <div className="space-y-4">
              <a
                href="mailto:platonmarynych@gmail.com"
                className="flex items-center space-x-4 text-gray-400 hover:text-terminal-green transition-colors font-mono text-base"
              >
                <Mail size={18} />
                <span>platonmarynych@gmail.com</span>
              </a>
              <a
                href="https://platon.best/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-gray-400 hover:text-terminal-green transition-colors font-mono text-base"
              >
                <Globe size={18} />
                <span>platon.best</span>
              </a>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-mono text-white mb-6">
              <span className="text-gray-500">### </span>
              find me online
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "GitHub",
                  icon: Github,
                  url: "https://github.com/payton-ggg",
                  username: "@payton-ggg",
                },
                {
                  name: "LinkedIn",
                  icon: Linkedin,
                  url: "https://www.linkedin.com/in/marynych-platon-0b0407291/",
                  username: "/in/marynych-platon",
                },
                {
                  name: "Telegram",
                  icon: MessageSquare,
                  url: "https://t.me/quartzee",
                  username: "@quartzee",
                },
                {
                  name: "Website",
                  icon: Globe,
                  url: "https://platon.best/",
                  username: "platon.best",
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 border border-gray-600 rounded hover:border-terminal-green hover:text-terminal-green transition-colors text-gray-400 font-mono text-base"
                  >
                    <Icon size={18} />
                    <div className="flex flex-col">
                      <span className="text-sm">{social.name}</span>
                      <span className="text-xs opacity-75">
                        {social.username}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-mono text-white mb-6">
              <span className="text-gray-500">### </span>
              availability
            </h3>
            <div className="space-y-3 font-mono text-base">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="text-gray-400">
                  currently available for projects
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                response time: usually within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
