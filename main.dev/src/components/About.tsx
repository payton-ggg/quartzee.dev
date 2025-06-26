import React from "react";

const About: React.FC = () => {
  return (
    <div className="space-y-10 leading-[0.8]">
      <div className="">
        <h1 className="text-4xl font-mono font-extrabold text-white mb-3">
          <span className="text-gray-500"># </span>
          welcome!
        </h1>
      </div>

      <div className="space-y-8 font-mono text-gray-300 leading-none text-base">
        <p className="text-lg">
          <span className="text-terminal-green">$</span> I build and break
          ideas.
        </p>

        <p className="text-lg">
          I'm <span className="text-white font-semibold">17</span> but I've been
          doing this since I was{" "}
          <span className="text-white font-semibold">13</span>, honestly sounds
          more like a Drake bar than me.
        </p>

        <div className="mt-10">
          <h2 className="text-3xl text-white mb-6 font-extrabold">
            <span className="text-gray-500">## </span>
            what do i do?
          </h2>

          <div className="space-y-6 text-base">
            <div className="">
              puregram
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                a telegram bot api wrapper that is written in typescript. it is
                my main-priority project!
              </span>
            </div>

            <div className="">
              anime ai bot
              <span className="text-gray-500"> - </span>
              <span className="text-gray-300">
                a telegram bot that transforms an image into an anime-style
                image. at its peak it had more than 3.5 million users! as for
                now it is transferred to another owner.
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
            skills <span className="text-gray-500">(and not only)</span>
          </h2>

          <p className="mb-6 text-base">i love and adore those things below:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">
                typescript
              </span>
              <span className="text-gray-500"> (node.js)</span>
            </div>
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">
                postgresql, redis
              </span>
            </div>
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">
                writing my own versions of libraries/projects that already exist
              </span>
            </div>
            <div className="bg-[#212121] border border-gray-700 rounded-lg p-4">
              <span className="text-terminal-green font-semibold">cats</span>
              <span className="text-gray-500"> 🐱</span>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-[#212121] border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl text-white mb-6">
            <span className="text-gray-500">## </span>
            currently coding
          </h2>
          <p className="text-base text-gray-400 mb-6">
            below lies the track that i'm currently listening to on spotify...
            or, well, simply nothing if i'm not listening to anything atm :p
          </p>

          <div className="flex items-center space-x-6 bg-[#161616] border border-gray-600 rounded-lg p-4">
            <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
            <div className="flex-1">
              <div className="text-white font-semibold text-base">deepfake</div>
              <div className="text-gray-400 text-sm">by brakence</div>
            </div>
            <div className="text-gray-400 text-sm">2:24 / 5:30</div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            this data is approximate and may be delayed by a few seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
