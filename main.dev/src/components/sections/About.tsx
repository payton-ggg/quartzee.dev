import React from "react";
import { CurrentlyPlaying } from "../widgets";
import { SkillsGraph, ExperienceSection } from "./";
import ChangingText from "../ui/ChangingText";

const About: React.FC = () => {
  return (
    <div className="space-y-10 leading-[0.8] max-md:p-2">
      <div className="">
        <h1 className="text-4xl font-mono font-extrabold text-white mb-3">
          <span className="text-gray-500"># </span>
          welcome!
        </h1>
      </div>

      <div className="space-y-8 font-mono text-gray-300 leading-none text-base">
        <ChangingText />

        <div className="mt-10">
          <h2 className="text-3xl text-white mb-6 font-extrabold">
            <span className="text-gray-500">## </span>
            what do i do?
          </h2>

          <div className="space-y-6 text-base leading-relaxed">
            Full Stack Developer with 3+ years of experience designing and building
            production-ready web applications across E-commerce, SaaS, Content Platforms,
            and Startups. <br /> <br />
            Strong focus on frontend architecture (React / Next.js / TypeScript),
            scalable backend APIs (NestJS / Go / Node.js / PostgreSQL), performance optimization,
            and developer experience. Comfortable owning projects end-to-end, working with legacy
            systems, and maintaining stability under production load.
            <div className="pt-2">
              <span className="text-green-400 font-bold">▸ </span>
              browser extensions & streaming
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                Chrome MV3 with ReadableStream real-time data processing
              </span>
            </div>
            <div>
              <span className="text-green-400 font-bold">▸ </span>
              AI-driven CRM & omnichannel sync
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                NLP intent recognition, unified inbox & WebSockets
              </span>
            </div>
            <div>
              <span className="text-green-400 font-bold">▸ </span>
              high-traffic web platforms & e-commerce
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                custom CMS, Next.js middleware routing & caching
              </span>
            </div>
            <div>
              <span className="text-green-400 font-bold">▸ </span>
              cloud infra & frontend migrations
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                Vue.js to React migration, Go backend services & GCP
              </span>
            </div>
          </div>
        </div>

        <SkillsGraph />
        <ExperienceSection />
        <CurrentlyPlaying />
      </div>
    </div>
  );
};

export default About;
