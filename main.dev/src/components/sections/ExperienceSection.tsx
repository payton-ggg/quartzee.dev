import { useState } from "react";
import { Briefcase, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";

interface Project {
  name: string;
  stack: string[];
  achievements: string[];
}

interface Experience {
  id: string;
  company: string;
  period: string;
  role: string;
  location?: string;
  projects: Project[];
}

const ExperienceSection = () => {
  const [activeCompanyIdx, setActiveCompanyIdx] = useState(0);
  const [expandedProjects, setExpandedProjects] = useState<
    Record<number, boolean>
  >({
    0: true,
  });

  const experiences: Experience[] = [
    {
      id: "zernote",
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
          stack: ["TypeScript", "Go", "Telegram Bot API", "Webhooks", "GCP"],
          achievements: [
            "Developed an automated Telegram bot for handling bug reports and user feedback",
            "Configured each incoming report to automatically create a dedicated topic in a Telegram supergroup, allowing the team to discuss issues and send replies directly back to the user",
          ],
        },
      ],
    },
    {
      id: "developstoday",
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
      id: "ontheproduct",
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

  const currentExp = experiences[activeCompanyIdx];

  const toggleProject = (projIdx: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projIdx]: !prev[projIdx],
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center min-h-[85vh] py-6 px-4 md:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono flex items-center">
            <span className="text-gray-600 mr-2">## </span>
            experience
            <span className="text-green-500 text-sm md:text-base ml-3 font-normal">
              // career timeline
            </span>
          </h2>
        </div>

        {/* Company Switcher Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
          {experiences.map((exp, idx) => {
            const isActive = activeCompanyIdx === idx;
            return (
              <button
                key={exp.id}
                onClick={() => {
                  setActiveCompanyIdx(idx);
                  setExpandedProjects({ 0: true });
                }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {exp.company}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Experience Glass Container */}
      <div className="bg-black/50 border border-white/10 rounded-2xl p-5 md:p-7 backdrop-blur-xl shadow-2xl flex flex-col max-h-[68vh] relative overflow-hidden">
        {/* Company Info Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                {currentExp.company}
              </h3>
              <p className="text-green-400 text-xs sm:text-sm font-mono">
                {currentExp.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            <Calendar size={13} className="text-green-400" />
            <span>{currentExp.period}</span>
          </div>
        </div>

        {/* Scrollable Projects Container */}
        <div
          data-scrollable="true"
          className="overflow-y-auto space-y-4 pr-1 sm:pr-2 custom-scrollbar focus:outline-none"
          tabIndex={0}
        >
          {currentExp.projects.map((proj, projIdx) => {
            const isExpanded = expandedProjects[projIdx] ?? true;

            return (
              <div
                key={projIdx}
                className="rounded-xl border border-white/10 bg-white/[0.02] hover:border-green-500/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
              >
                {/* Project Header */}
                <button
                  onClick={() => toggleProject(projIdx)}
                  className="w-full p-4 text-left flex items-start justify-between gap-3 focus:outline-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <ChevronRight
                        size={16}
                        className={`text-green-400 transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                      <h4 className="text-sm sm:text-base font-bold text-white font-mono">
                        {proj.name}
                      </h4>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pl-6">
                      {proj.stack.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-gray-300 font-mono text-[10px] sm:text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>

                {/* Project Achievements */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 pl-10 border-t border-white/5 space-y-2">
                    {proj.achievements.map((ach, achIdx) => (
                      <div
                        key={achIdx}
                        className="flex items-start gap-2.5 text-gray-300 font-mono text-xs sm:text-sm leading-relaxed"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-green-400 mt-0.5 flex-shrink-0"
                        />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
