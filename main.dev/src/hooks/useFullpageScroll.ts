import { useState, useEffect, useCallback, useRef } from "react";

interface UseFullpageScrollOptions {
  totalSections: number;
  transitionDuration?: number;
}

export function useFullpageScroll({
  totalSections,
  transitionDuration = 700,
}: UseFullpageScrollOptions) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);

  const goToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections || isScrollingRef.current) return;
      isScrollingRef.current = true;
      setIsScrolling(true);
      setCurrentSection(index);

      setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, transitionDuration);
    },
    [totalSections, transitionDuration]
  );

  const nextSection = useCallback(() => {
    goToSection(currentSection + 1);
  }, [currentSection, goToSection]);

  const prevSection = useCallback(() => {
    goToSection(currentSection - 1);
  }, [currentSection, goToSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check if target is inside a scrollable container that can still scroll in that direction
      let target = e.target as HTMLElement | null;
      let isInsideScrollable = false;

      while (target && target !== document.body) {
        if (target.getAttribute("data-scrollable") === "true") {
          const { scrollTop, scrollHeight, clientHeight } = target;
          const isAtTop = scrollTop <= 0;
          const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 2;

          if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            isInsideScrollable = true;
            break;
          }
        }
        target = target.parentElement;
      }

      if (isInsideScrollable) return;

      if (Math.abs(e.deltaY) < 25) return;
      if (e.deltaY > 0) {
        nextSection();
      } else {
        prevSection();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        nextSection();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevSection();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSection(totalSections - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffY) > 50) {
        if (diffY > 0) {
          nextSection();
        } else {
          prevSection();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSection, prevSection, goToSection, totalSections]);

  return {
    currentSection,
    isScrolling,
    goToSection,
    nextSection,
    prevSection,
    progress: (currentSection / (totalSections - 1)) * 100,
  };
}
