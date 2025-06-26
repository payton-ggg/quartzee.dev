import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import TerminalCursor from './TerminalCursor';
import GlitchText from './GlitchText';
import { Post } from '../types';

const Posts: React.FC = () => {
  const posts: Post[] = [
    {
      id: '1',
      title: 'Building a Telegram Bot API Wrapper',
      excerpt: 'Deep dive into creating puregram - a modern TypeScript wrapper for Telegram Bot API with full type safety.',
      date: '2024-01-15',
      readTime: '8 min'
    },
    {
      id: '2',
      title: 'Scaling to 3.5M Users: Lessons from Anime AI Bot',
      excerpt: 'What I learned while building and scaling a viral Telegram bot that processed millions of images.',
      date: '2023-12-20',
      readTime: '12 min'
    },
    {
      id: '3',
      title: 'Why I Rewrite Libraries Instead of Using Them',
      excerpt: 'The philosophy behind creating your own implementations and what you gain from reinventing the wheel.',
      date: '2023-11-28',
      readTime: '6 min'
    },
    {
      id: '4',
      title: 'Terminal Aesthetics in Web Design',
      excerpt: 'Creating authentic hacker-style interfaces that don\'t look like every other developer portfolio.',
      date: '2023-11-10',
      readTime: '5 min'
    }
  ];

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-mono text-white mb-3">
          <span className="text-gray-500">## </span>
          <GlitchText text="blog posts" />
          <TerminalCursor />
        </h1>
        <p className="font-mono text-gray-400 text-base">
          thoughts about code, life, and breaking things
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-terminal-green transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-mono text-white group-hover:text-terminal-green transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center space-x-4 text-gray-500 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            <p className="font-mono text-gray-300 text-base leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex items-center space-x-2 text-terminal-green font-mono text-base group-hover:text-green-400 transition-colors">
              <span>read more</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gray-900 border border-gray-700 rounded-lg">
        <h3 className="text-xl font-mono text-white mb-6">
          <span className="text-gray-500">### </span>
          want to stay updated?
        </h3>
        <p className="font-mono text-gray-400 text-base mb-6">
          i occasionally write about development, AI, and random thoughts
        </p>
        <div className="flex space-x-4">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-black border border-gray-600 rounded px-4 py-3 font-mono text-base text-white focus:outline-none focus:border-terminal-green transition-colors"
          />
          <button className="px-6 py-3 bg-terminal-green text-black font-mono text-base rounded hover:bg-green-400 transition-colors">
            subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;