import React from "react";
import CurrentlyPlaying from "./CurrentlyPlaying";
import SkillsGraph from "./SkillsGraph";

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
        <p className="text-lg">
          <span className="text-terminal-green">$</span> i code full stack stuff
          and think in systems.
        </p>

        <p className="text-lg">
          I'm <span className="text-white font-semibold">18,</span> used to race
          kayaks with a body built for war and water. now i race thoughts and
          <span className="text-white font-semibold">push code</span> - clean,
          fast, and sharp.
        </p>

        <div className="mt-10">
          <h2 className="text-3xl text-white mb-6 font-extrabold">
            <span className="text-gray-500">## </span>
            what do i do?
          </h2>

          <div className="space-y-6 text-base">
            currently building full stack apps with Node.js/Python and
            React.js/Next.js. <br /> <br /> i'm also diving deep into AI,
            blockchain, and browser automation. from parsers to pwa's — if it
            runs in the cloud or clicks on your behalf, i've probably built it.
            <div className="">
              real-time AI interview assistant
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                listens, thinks, and speaks back
              </span>
            </div>
            <div className="">
              telegram mini-apps
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                with tasks, logic, and crypto under the hood
              </span>
            </div>
            <p className="text-gray-500 text-sm italic mt-6">
              i don't have much to say about myself honestly spoo...
            </p>
          </div>
        </div>

        <SkillsGraph />
        <CurrentlyPlaying />
      </div>
    </div>
  );
};

export default About;
