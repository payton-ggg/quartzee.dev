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
      company: "Zernote",
      period: "02/2025 – Present",
      role: "Frontend / Full Stack Engineer",
      projects: [
        {
          name: "Core Web Platform & Cloud Infrastructure",
          stack: [
            "React",
            "Vue.js",
            "TypeScript",
            "Go",
            "GCP",
            "GitHub Actions",
            "Tailwind CSS",
          ],
          achievements: [
            "Owned frontend architecture and long-term technical stability of the application",
            "Migrated the existing frontend from Vue.js to React, improving maintainability and scalability",
            "Worked on high-performance backend microservices written in Go",
            "Maintained and resolved production issues across GCP cloud infrastructure",
            "Built automated preview deployment pipelines using GitHub Actions",
            "Acted as the primary point of responsibility when frontend or cloud infrastructure issues occurred",
          ],
        },
        {
          name: "Automated Feedback & Issue Tracker",
          stack: [
            "TypeScript",
            "Go",
            "Telegram Bot API",
            "Webhooks",
            "GCP",
          ],
          achievements: [
            "Developed an automated Telegram bot for handling bug reports and user feedback",
            "Configured each incoming report to automatically create a dedicated topic in a Telegram supergroup, allowing the team to discuss issues and send replies directly back to the user",
          ],
        },
      ],
    },
    {
      company: "DevelopsToday",
      period: "02/2025 – 12/2025",
      role: "Full Stack Developer",
      projects: [
        {
          name: "Kazaar Fragrances (E-commerce Platform)",
          stack: [
            "Next.js",
            "NestJS",
            "TypeScript",
            "Tailwind CSS",
            "Zustand",
            "React Hook Form",
            "MongoDB",
            "Jest",
            "Husky",
            "Vercel",
            "Hostinger VPS",
          ],
          achievements: [
            "Designed application architecture and delivered the full development cycle from backend APIs to UI components",
            "Built a product and collection management system, gift sets, and CMS-driven pages",
            "Developed a custom CMS with flexible content editing and scalable data models",
            "Implemented JWT-based authentication and API protection using NestJS",
            "Built responsive, multi-step forms with React Hook Form and state management via Zustand",
            "Added unit testing with Jest and enforced code quality via Husky",
            "Deployed frontend to Vercel and backend to VPS (Hostinger), ensuring stable production operation",
            "Improved UX and performance through optimized data structures and caching strategies",
          ],
        },
        {
          name: "Skiinfo (High-Traffic Content Platform)",
          stack: [
            "Next.js",
            "Next.js Middleware",
            "TypeScript",
            "Tailwind CSS",
            "Context API",
            "WeSki Widgets",
            "Telegram API",
          ],
          achievements: [
            "Optimized a complex redirect system using Next.js Middleware, improving routing performance",
            "Maintained and stabilized existing codebase; fixed bugs and delivered minor feature enhancements",
            "Integrated third-party WeSki widgets, adapting them to existing architecture and design system",
            "Led technical communication with external partners and participated in integration discussions",
            "Focused on UX consistency and platform stability under high load",
            "Optimized the application logging system by configuring logs to be stored and delivered through Telegram instead of maintaining separate logging infrastructure, significantly reducing server resource consumption",
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
          name: "Browser Extension (Chrome MV3)",
          stack: [
            "TypeScript",
            "Chrome MV3",
            "ReadableStream",
            "TextDecoder",
            "Zustand Persist",
            "chrome.storage",
            "Tailwind CSS",
            "Service Workers",
          ],
          achievements: [
            "Implemented streamed API response processing using ReadableStream, delivering data to UI in real time without blocking the interface",
            "Configured Service Worker logic and lifecycle under Chrome Manifest V3",
            "Synchronized state between popup, background, and tabs using chrome.storage and Zustand persist",
            "Designed secure API key storage and proposed proxy / short-lived token authorization schemes",
            "Implemented timeout handling, retries, and visual progress indicators for unstable network conditions",
          ],
        },
        {
          name: "KeyCRM (AI CRM & Admin Platform)",
          stack: [
            "Next.js",
            "TypeScript",
            "PostgreSQL",
            "REST APIs",
            "Stripe",
            "Cloudinary",
            "NLP / AI",
            "WebSockets",
            "Omnichannel Messenger",
          ],
          achievements: [
            "Built an internal admin panel for managing product variations with a Shopify/Notion-like UI",
            "Implemented multi-step authentication and subscription flows using Stripe",
            "Integrated Cloudinary for image uploads with instant CDN delivery",
            "Structured product variations into independent tabs with financial calculations and data tables",
            "Backend powered by REST APIs and PostgreSQL",
            "Designed an AI-driven CRM architecture with NLP-based intent recognition, classifying customer chat messages into purchase intent, inquiries, complaints, and more for real-time manager guidance",
            "Integrated omnichannel messenger support (Telegram, Viber, Instagram, Facebook Messenger, email) with a unified inbox, real-time message sync via webhooks/WebSocket, and cross-channel context preservation",
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

                opacity: isVisible ? 1 : 0,
                // Premium ease-out-back animation
                animation: isVisible
                  ? `premiumFadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${
                      expIdx * 0.15
                    }s forwards`
                  : "none",
                willChange: "transform, opacity",
              }}
            >
              <style>{`
                @keyframes premiumFadeUp {
                  0% {
                    opacity: 0;
                    transform: translateY(60px) scale(0.95) rotateX(10deg);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0) scale(1) rotateX(0deg);
                  }
                }
              `}</style>
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
    </div>
  );
};

export default ExperienceSection;
