import React from "react";
import CurrentlyPlaying from "./CurrentlyPlaying";

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
            React.js/Next.js. <br /> <br /> i’m also diving deep into AI,
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

        <div className="mt-10">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            <span className="text-gray-500">## </span>
            skills <span className="text-gray-500">(and obsession)</span>
          </h2>

          <p className="mb-6 text-base">i go deep on:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">
                typeScript, react, next.js, node.js
              </span>
              <span className="text-gray-500"> (js family)</span>
            </div>
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">
                postgresql, mongodb
              </span>
            </div>
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">
                writing clean, modular, scalable code
              </span>
            </div>
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">
                thinking like a product owner, even when i’m just the builder
              </span>
            </div>
          </div>
        </div>
        <CurrentlyPlaying />
      </div>
    </div>
  );
};

export default About;
