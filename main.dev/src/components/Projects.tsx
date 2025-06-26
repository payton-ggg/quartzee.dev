import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import TerminalCursor from './TerminalCursor';
import GlitchText from './GlitchText';
import { Project } from '../types';

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'puregram',
      description: 'A powerful Telegram Bot API wrapper written in TypeScript. Clean, modern, and fully typed.',
      techStack: ['TypeScript', 'Node.js', 'Telegram API'],
      github: 'https://github.com/err01m/puregram'
    },
    {
      id: '2',
      title: 'anime-ai-bot',
      description: 'Telegram bot that transforms images into anime-style art. Served 3.5M+ users at peak.',
      techStack: ['TypeScript', 'AI/ML', 'Image Processing', 'Telegram API'],
      github: 'https://github.com/err01m/anime-ai-bot'
    },
    {
      id: '3',
      title: 'terminal-portfolio',
      description: 'A minimalist developer portfolio with terminal aesthetic and hacker vibes.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/err01m/terminal-portfolio',
      link: 'https://err01m.dev'
    },
    {
      id: '4',
      title: 'redis-clone',
      description: 'Custom implementation of Redis in-memory data structure store. Learning exercise.',
      techStack: ['Node.js', 'TypeScript', 'Data Structures'],
      github: 'https://github.com/err01m/redis-clone'
    }
  ];

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-mono text-white mb-3">
          <span className="text-gray-500">## </span>
          <GlitchText text="projects" />
          <TerminalCursor />
        </h1>
        <p className="font-mono text-gray-400 text-base">
          stuff i've built and broken
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-terminal-green transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-mono text-white group-hover:text-terminal-green transition-colors">
                {project.title}
              </h3>
              <div className="flex space-x-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-terminal-green transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-terminal-green transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
            
            <p className="font-mono text-gray-300 text-base mb-6 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-black border border-gray-600 rounded text-sm font-mono text-terminal-green"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gray-900 border border-gray-700 rounded-lg">
        <h3 className="text-xl font-mono text-white mb-6">
          <span className="text-gray-500">### </span>
          more projects
        </h3>
        <p className="font-mono text-gray-400 text-base mb-6">
          check out my github for more projects and contributions
        </p>
        <a
          href="https://github.com/err01m"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 text-terminal-green hover:text-green-400 transition-colors font-mono text-base"
        >
          <Github size={18} />
          <span>github.com/err01m</span>
          <span className="animate-pulse">→</span>
        </a>
      </div>
    </div>
  );
};

export default Projects;