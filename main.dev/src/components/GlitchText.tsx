import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [glitching, setGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to glitch
        setGlitching(true);
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let corrupted = '';
        
        for (let i = 0; i < text.length; i++) {
          if (Math.random() < 0.3) {
            corrupted += chars[Math.floor(Math.random() * chars.length)];
          } else {
            corrupted += text[i];
          }
        }
        
        setGlitchText(corrupted);
        
        setTimeout(() => {
          setGlitching(false);
          setGlitchText(text);
        }, 100);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <span className={`${className} ${glitching ? 'text-red-500' : ''} transition-colors duration-100`}>
      {glitchText}
    </span>
  );
};

export default GlitchText;