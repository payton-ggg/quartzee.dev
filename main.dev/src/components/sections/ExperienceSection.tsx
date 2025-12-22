import { useState, useRef, useEffect } from "react";

interface Project {
  name: string;
  stack: string[];
  achievements: string[];
}

interface Experience {
  company: string;
  period: string;
  role: string;
  projects: Project[];
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

const ExperienceSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ [key: number]: TiltState }>({});
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const experiences: Experience[] = [
    {
      company: "DevelopsToday",
      period: "02/2025 – 09/2025",
      role: "Full Stack Developer",
      projects: [
        {
          name: "Kazaar fragrances",
          stack: [
            "Next.js",
            "NestJS",
            "TypeScript",
            "Tailwind CSS",
            "Zustand",
            "MongoDB",
            "React Hook Form",
            "Jest",
            "Husky",
            "Vercel",
            "Hostinger VPS",
          ],
          achievements: [
            "Designed the architecture and implemented the full development cycle—from the backend API to UI components",
            "Created a management system for products, collections, CMS pages, and gift sets",
            "Developed a custom CMS with flexible content editing",
            "Configured authorization and API protection using JWT, and ensured stable operation of the backend using NestJS",
            "Built interfaces with responsive design, multi-level forms (React Hook Form), and state management using Zustand",
            "Implemented unit testing (Jest) and deployed the frontend to Vercel and the backend to Hostinger VPS",
            "Optimized performance and improved UX through a well-thought-out data structure and caching",
          ],
        },
        {
          name: "Skiinfo",
          stack: [
            "Next.js",
            "NestJS",
            "TypeScript",
            "Tailwind CSS",
            "Middleware",
            "Context API",
          ],
          achievements: [
            "Optimized a complex redirect system through middleware, improving routing and page performance",
            "Maintained existing code, fixed bugs, and added minor functional improvements to key website pages",
            "Integrated WeSki widgets into the project structure and adapted them to the current design and architecture",
            "Led technical communication with the WeSki team, participated in calls and discussions on integration and partnership issues",
            "Worked on improving UX and website stability under high loads",
          ],
        },
      ],
    },
    {
      company: "Ontheproduct",
      period: "04/2024 – 02/2025",
      role: "Full Stack Developer",
      projects: [
        {
          name: "Google extension",
          stack: [
            "TypeScript",
            "Chrome MV3",
            "Zustand",
            "Streams",
            "TextDecoder",
            "Tailwind CSS",
            "JWT Auth",
          ],
          achievements: [
            "Implemented stream processing of API responses using ReadableStream, passing data to the UI as it arrives without blocking the interface",
            "Configured Service Worker functionality in Manifest V3",
            "Synchronized state between popups, backgrounds, and tabs, binding interaction history to tabId via chrome.storage and zustand persist",
            "Developed the API key storage architecture and proposed a secure scheme using a proxy or short-lived tokens",
            "Implemented mechanisms for handling timeouts, retries, and visual progress indicators for a stable user experience on slow connections",
          ],
        },
        {
          name: "Dashboard for selling products",
          stack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Cloudinary",
            "REST API",
            "PostgreSQL",
          ],
          achievements: [
            "Created an internal admin panel for managing headphone variations with an interactive UI in the style of Shopify/Notion",
            "Implemented multi-step authentication with a subscription system on Stripe",
            "Implemented image uploading to the cloud via Cloudinary with instant CDN substitution",
            "Organized variations into tabs with independent financial calculations and visual tables",
          ],
        },
      ],
    },
  ];

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardIndex: number
  ) => {
    const card = cardRefs.current[cardIndex];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt((prev) => ({
      ...prev,
      [cardIndex]: {
        rotateX,
        rotateY,
        glowX: (x / rect.width) * 100,
        glowY: (y / rect.height) * 100,
      },
    }));
  };

  const handleMouseLeave = (cardIndex: number) => {
    setTilt((prev) => ({
      ...prev,
      [cardIndex]: {
        rotateX: 0,
        rotateY: 0,
        glowX: 50,
        glowY: 50,
      },
    }));
  };

  return (
    <div className="w-full my-16">
      <h2 className="text-3xl font-extrabold text-white mb-8 font-mono">
        <span className="text-gray-500">## </span>
        professional experience
      </h2>

      <div className="space-y-6">
        {experiences.map((exp, expIdx) => {
          const isVisible = visibleCards.has(expIdx);

          return (
            <div
              key={expIdx}
              data-index={expIdx}
              ref={(el) => (cardRefs.current[expIdx] = el)}
              onMouseMove={(e) => handleMouseMove(e, expIdx)}
              onMouseLeave={() => handleMouseLeave(expIdx)}
              className="relative border border-gray-700 bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-green-500 transition-all duration-300"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
                transform: tilt[expIdx]
                  ? `rotateX(${tilt[expIdx].rotateX}deg) rotateY(${tilt[expIdx].rotateY}deg)`
                  : "rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.1s ease-out",

                // Scroll animation
                opacity: isVisible ? 1 : 0,
                animation: isVisible
                  ? `slideUpRotate 0.8s ease-out ${expIdx * 0.2}s forwards`
                  : "none",
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: tilt[expIdx]
                    ? `radial-gradient(600px circle at ${tilt[expIdx].glowX}% ${tilt[expIdx].glowY}%, rgba(0, 255, 0, 0.1), transparent 40%)`
                    : "none",
                }}
              />

              <div
                className="relative"
                style={{
                  transform: "translateZ(20px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="p-4 md:p-6 border-b border-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-green-400 font-mono glitch">
                        {exp.company}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base font-mono">
                        {exp.role}
                      </p>
                    </div>
                    <div className="text-gray-500 font-mono text-sm md:text-base">
                      <span className="text-green-400">$</span> {exp.period}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-800">
                  {exp.projects.map((project, projIdx) => {
                    const cardIndex = expIdx * 10 + projIdx;
                    const isExpanded = expandedCard === cardIndex;

                    return (
                      <div
                        key={projIdx}
                        className="group hover:bg-[#151515] transition-all duration-300"
                      >
                        <div
                          className="p-4 md:p-6 cursor-pointer"
                          onClick={() =>
                            setExpandedCard(isExpanded ? null : cardIndex)
                          }
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div
                              className="flex-1"
                              style={{
                                transform: "translateZ(10px)",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-green-400 font-mono text-sm">
                                  [{isExpanded ? "-" : "+"}]
                                </span>
                                <h4 className="text-lg md:text-xl font-bold text-white font-mono group-hover:text-green-400 transition-colors">
                                  {project.name}
                                </h4>
                              </div>

                              <div
                                className="flex flex-wrap gap-2 mb-4"
                                style={{
                                  transform: "translateZ(30px)",
                                }}
                              >
                                {project.stack.map((tech, techIdx) => (
                                  <span
                                    key={techIdx}
                                    className="px-2 py-1 text-xs md:text-sm bg-gray-800 border border-gray-700 text-green-400 rounded font-mono hover:bg-gray-700 hover:border-green-500 transition-all cursor-default"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="text-gray-500 group-hover:text-green-400 transition-colors">
                              <svg
                                className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isExpanded
                                ? "max-h-[1000px] opacity-100 mt-4"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="border-l-2 border-green-500 pl-4 space-y-2">
                              {project.achievements.map(
                                (achievement, achIdx) => (
                                  <div
                                    key={achIdx}
                                    className="flex items-start gap-2 text-gray-300 text-sm md:text-base"
                                  >
                                    <span className="text-green-400 mt-1 flex-shrink-0">
                                      ▸
                                    </span>
                                    <p className="leading-relaxed">
                                      {achievement}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideUpRotate {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateX(25deg) translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ExperienceSection;
