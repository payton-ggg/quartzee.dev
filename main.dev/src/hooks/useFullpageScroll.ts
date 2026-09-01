import { useState, useEffect, useCallback, useRef } from "react";

interface UseFullpageScrollOptions {
  totalSections: number;
  transitionDuration?: number;
  wheelThreshold?: number; // Pixels of scroll accumulated before triggering transition
  touchThreshold?: number; // Pixels of touch swipe before triggering transition
}

export function useFullpageScroll({
  totalSections,
  transitionDuration = 750,
  wheelThreshold = 100,
  touchThreshold = 85,
}: UseFullpageScrollOptions) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimeoutRef = useRef<number | null>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const touchTarget = useRef<HTMLElement | null>(null);

  const goToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections || isScrollingRef.current) return;
      isScrollingRef.current = true;
      setIsScrolling(true);
      wheelAccumulatorRef.current = 0;
      setCurrentSection(index);

      setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
        wheelAccumulatorRef.current = 0;
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
      // If a transition is already in progress, ignore wheel delta
      if (isScrollingRef.current) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      // Check if event originated inside any scrollable container or card
      let target = e.target as HTMLElement | null;
      let isInsideScrollable = false;

      while (
        target &&
        target !== document.body &&
        target !== document.documentElement
      ) {
        if (target.getAttribute("data-scrollable") === "true") {
          isInsideScrollable = true;
          break;
        }

        const style = window.getComputedStyle(target);
        if (
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          target.scrollHeight > target.clientHeight
        ) {
          isInsideScrollable = true;
          break;
        }

        target = target.parentElement;
      }

      // If user is scrolling inside a box, do NOT trigger fullpage section transition
      if (isInsideScrollable) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      // Accumulate wheel delta
      wheelAccumulatorRef.current += e.deltaY;

      // Reset accumulator if scrolling stops for 250ms
      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }
      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 250);

      // Only trigger if threshold is exceeded
      if (wheelAccumulatorRef.current >= wheelThreshold) {
        wheelAccumulatorRef.current = 0;
        nextSection();
      } else if (wheelAccumulatorRef.current <= -wheelThreshold) {
        wheelAccumulatorRef.current = 0;
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
      if (e.touches.length === 1) {
        touchStartY.current = e.touches[0].clientY;
        touchStartX.current = e.touches[0].clientX;
        touchTarget.current = e.target as HTMLElement | null;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return;
      if (e.changedTouches.length === 0) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartY.current - touchEndY;
      const diffX = touchStartX.current - touchEndX;

      // Ignore predominantly horizontal swipes (e.g. tabs or graph drags)
      if (Math.abs(diffX) > Math.abs(diffY) * 1.5) return;

      // Must exceed touchThreshold (e.g. 85px)
      if (Math.abs(diffY) >= touchThreshold) {
        // Check if touch originated inside a scrollable container
        let target = touchTarget.current;
        let isInsideScrollable = false;

        while (
          target &&
          target !== document.body &&
          target !== document.documentElement
        ) {
          if (target.getAttribute("data-scrollable") === "true") {
            isInsideScrollable = true;
            break;
          }

          const style = window.getComputedStyle(target);
          if (
            (style.overflowY === "auto" || style.overflowY === "scroll") &&
            target.scrollHeight > target.clientHeight
          ) {
            isInsideScrollable = true;
            break;
          }

          target = target.parentElement;
        }

        // If user is swiping inside a box, do NOT switch fullpage section
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
      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }
    };
  }, [
    nextSection,
    prevSection,
    goToSection,
    totalSections,
    wheelThreshold,
    touchThreshold,
  ]);

  return {
    currentSection,
    isScrolling,
    goToSection,
    nextSection,
    prevSection,
    progress: (currentSection / (totalSections - 1)) * 100,
  };
}
