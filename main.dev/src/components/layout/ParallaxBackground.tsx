import React, { useEffect, useState } from "react";

interface ParallaxBackgroundProps {
  currentSection: number;
  totalSections: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  currentSection,
  totalSections,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sectionRatio = currentSection / Math.max(1, totalSections - 1);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0c0d0e]">
      {/* Dynamic Cyber Grid */}
      <div
        className="absolute inset-0 opacity-[0.12] transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translateY(${-sectionRatio * 150 + mousePos.y * 0.5}px) translateX(${mousePos.x * 0.5}px)`,
        }}
      />

      {/* Radial ambient glow orbs */}
      {/* Green Orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-green-500 transition-transform duration-1000 ease-out"
        style={{
          top: "10%",
          left: "15%",
          transform: `translate(${mousePos.x * 1.2}px, ${
            -sectionRatio * 300 + mousePos.y * 1.2
          }px)`,
        }}
      />

      {/* Cyan/Blue Orb */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[160px] opacity-15 bg-cyan-600 transition-transform duration-1000 ease-out"
        style={{
          bottom: "10%",
          right: "10%",
          transform: `translate(${-mousePos.x * 0.8}px, ${
            (1 - sectionRatio) * 250 - mousePos.y * 0.8
          }px)`,
        }}
      />

      {/* Purple Accent Orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 bg-emerald-700 transition-transform duration-1000 ease-out"
        style={{
          top: "50%",
          left: "60%",
          transform: `translate(${mousePos.x * 0.6}px, ${
            -sectionRatio * 180 + mousePos.y * 0.6
          }px)`,
        }}
      />

      {/* Vignette & Noise overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
};

export default ParallaxBackground;
