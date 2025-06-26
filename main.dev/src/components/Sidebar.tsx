import React from 'react';
import { Github, Linkedin, Twitter, Youtube, Twitch, User, FolderOpen, FileText, Mail } from 'lucide-react';
import GlitchText from './GlitchText';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigation = [
    { id: 'about', label: 'about', icon: User },
    { id: 'projects', label: 'projects', icon: FolderOpen },
    { id: 'posts', label: 'posts', icon: FileText },
    { id: 'contact', label: 'reach out', icon: Mail }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/err01m' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/err01m' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/err01m' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@err01m' },
    { name: 'Twitch', icon: Twitch, url: 'https://twitch.tv/err01m' }
  ];

  return (
    <div className="w-72 bg-gray-950 border-r border-gray-800 h-screen fixed left-0 top-0 p-8 flex flex-col">
      {/* Profile Section */}
      <div className="mb-10">
        <div className="w-24 h-24 rounded-full bg-gray-700 mb-6 overflow-hidden group cursor-pointer">
          <img 
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Profile" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
        </div>
        <div className="text-terminal-green text-xl font-mono font-semibold mb-2">
          <GlitchText text="[err01m]" />
        </div>
        <div className="text-gray-400 text-base font-mono italic">
          "cause why not?"
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 mb-3 rounded-lg font-mono text-base transition-all duration-200 group ${
                activeSection === item.id
                  ? 'bg-gray-800 text-terminal-green border border-gray-700'
                  : 'text-gray-400 hover:text-terminal-green hover:bg-gray-900'
              }`}
            >
              <Icon size={18} className="group-hover:animate-pulse" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Social Links */}
      <div className="border-t border-gray-800 pt-6">
        <div className="flex justify-center space-x-5">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-terminal-green transition-colors duration-200 hover:animate-bounce"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;