import { useState, useEffect, useRef } from "react";

const phrases = [
  "I build products by thinking in systems, not features.",
  "No overengineering. Just sharp execution.",
  "Discipline from sport. Precision in code.",
  "From logic to architecture. Clean. Predictable. Scalable.",
];

const longestPhrase =
  "I build products by thinking in systems, not features.";

const ChangingText = () => {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const handleTyping = () => {
      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      setTypingSpeed(isDeleting ? 20 : 30 + Math.random() * 30);
    };

    const timer = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    if (!isDeleting && currentText === fullText) {
      clearTimeout(timer);
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative font-mono text-lg md:text-xl text-gray-300"
    >
      <div className="invisible flex items-start md:items-center opacity-0 select-none pointer-events-none">
        <span className="mr-3 font-bold mt-1 md:mt-0">{">"}</span>
        <span className="leading-relaxed">
          {longestPhrase}
          <span className="inline-block ml-1 font-bold">|</span>
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex items-start md:items-center">
        <span className="text-terminal-green mr-3 font-bold select-none mt-1 md:mt-0">
          {">"}
        </span>
        <span className="leading-relaxed">
          {currentText}
          <span className="animate-pulse text-terminal-green inline-block ml-1 font-bold">
            |
          </span>
        </span>
      </div>
    </div>
  );
};

export default ChangingText;
