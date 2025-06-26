import { useEffect } from "react";

const AnimatedTitle = () => {
  const isActive = true;

  // Бегущая строка
  const useScrollingTitle = (text: string, speed = 400) => {
    useEffect(() => {
      if (!isActive) return;

      let index = 0;
      const interval = setInterval(() => {
        document.title = text.substring(index) + text.substring(0, index);
        index = (index + 1) % text.length;
      }, speed);

      return () => {
        clearInterval(interval);
        document.title = "Portfolio";
      };
    }, [text, speed]);
  };

  useScrollingTitle(" quartzee ★ dev ");

  return <></>;
};

export default AnimatedTitle;
