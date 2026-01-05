import { useState, useEffect } from "react";

const phrases = [
  "I build products by thinking in systems, not features.",
  "No overengineering. Just sharp execution.",
  "Discipline from sport. Precision in code.",
  "From logic to architecture. Clean. Predictable. Scalable.",
];

const ChangingText = () => {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
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
  }, [currentText, isDeleting, loopNum]);

  return (
    <div className="font-mono text-lg md:text-xl min-h-[3.2em] md:min-h-[1.6em] flex items-start md:items-center text-gray-300">
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
  );
};

export default ChangingText;
