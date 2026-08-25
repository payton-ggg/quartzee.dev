import {
  About,
  AnimatedTitle,
  FontSelector,
  KyivClock,
  KyivWeather,
  CVFolder,
  MusicPlayer,
  TelegramFeed,
} from "./components";

function App() {
  return (
    <div className="min-h-screen text-white font-mono flex flex-col justify-center items-center">
      <FontSelector />
      <MusicPlayer />
      <KyivClock />
      <KyivWeather />
      <CVFolder />
      <AnimatedTitle />
      <main className="lg:p-16 max-w-5xl ">
        <About />
        <TelegramFeed />
        <div className="mt-14 mb-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 font-mono">
          <a
            href="https://t.me/quartzee"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            telegram <span className="text-gray-600">(@quartzee)</span>
          </a>
          <span className="text-gray-700">/</span>
          <a
            href="https://github.com/payton-ggg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            github <span className="text-gray-600">(@payton-ggg)</span>
          </a>
          <span className="text-gray-700">/</span>
          <a
            href="https://www.linkedin.com/in/marynych-platon-0b0407291/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            linkedin
          </a>
          <span className="text-gray-700">/</span>
          <a
            href="mailto:platonmarynych@gmail.com"
            className="hover:text-green-400 transition-colors"
          >
            email
          </a>
          <span className="text-gray-700">/</span>
          <a
            href="https://platon.best/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            platon.best
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
