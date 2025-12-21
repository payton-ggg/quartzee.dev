import About from "./components/About";
import AnimatedTitle from "./components/AnimatedTitle";
import KyivClock from "./components/KyivClock";

function App() {
  return (
    <div className="min-h-screen text-white font-mono flex flex-col justify-center items-center">
      <KyivClock />
      <AnimatedTitle />
      <main className="lg:p-16 max-w-5xl ">
        <About />
        <div className="mt-10 mb-10 gap-4 flex items-center justify-center">
          <div>
            <a href="https://t.me/quartzee" target="_blank" rel="noreferrer">
              telegram {}
              <span className="text-gray-500"> (if you love me)</span>
            </a>
            <a
              href="https://github.com/payton-ggg"
              target="_blank"
              rel="noreferrer"
              className="ml-2"
            >
              github
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
