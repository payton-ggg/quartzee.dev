import About from "./components/About";
import AnimatedTitle from "./components/AnimatedTitle";

function App() {
  return (
    <div className="min-h-screen text-white font-mono flex flex-col justify-center items-center">
      <AnimatedTitle />
      <main className="lg:p-16 max-w-5xl ">
        <About />
      </main>
    </div>
  );
}

export default App;
