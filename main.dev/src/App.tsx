import About from "./components/About";

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-mono flex flex-col justify-center items-center">
      <main className="lg:p-16 max-w-5xl ">
        <About />
      </main>
    </div>
  );
}

export default App;
