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
  const touchStartX = useRef(0);
  const touchTarget = useRef<HTMLElement | null>(null);

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
      touchStartX.current = e.touches[0].clientX;
      touchTarget.current = e.target as HTMLElement | null;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartY.current - touchEndY;
      const diffX = touchStartX.current - touchEndX;

      // Ignore predominantly horizontal swipes (e.g. tabs or graph drags)
      if (Math.abs(diffX) > Math.abs(diffY) * 1.5) return;

      if (Math.abs(diffY) > 40) {
        // Check if touch is inside a scrollable container
        let target = touchTarget.current;
        let isInsideScrollable = false;

        while (target && target !== document.body) {
          if (target.getAttribute("data-scrollable") === "true") {
            const { scrollTop, scrollHeight, clientHeight } = target;
            const isAtTop = scrollTop <= 3;
            const isAtBottom =
              Math.ceil(scrollTop + clientHeight) >= scrollHeight - 4;

            // Swiping UP (diffY > 0) -> scroll container down
            // Swiping DOWN (diffY < 0) -> scroll container up
            if ((diffY > 0 && !isAtBottom) || (diffY < 0 && !isAtTop)) {
              isInsideScrollable = true;
              break;
            }
          }
          target = target.parentElement;
        }

        if (isInsideScrollable) return;

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
