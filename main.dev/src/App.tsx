import {
  About,
  SkillsGraph,
  ExperienceSection,
  TelegramFeed,
  Contact,
  AnimatedTitle,
  FontSelector,
  KyivClock,
  KyivWeather,
  CVFolder,
  MusicPlayer,
  ParallaxBackground,
  FullpageNavigation,
} from "./components";
import { useFullpageScroll } from "./hooks/useFullpageScroll";

const SECTIONS = [
  { id: "hero", label: "Overview", short: "01" },
  { id: "skills", label: "Skills Network", short: "02" },
  { id: "experience", label: "Experience", short: "03" },
  { id: "transmissions", label: "Transmissions", short: "04" },
  { id: "contact", label: "Connect", short: "05" },
];

function App() {
  const { currentSection, goToSection, nextSection, progress } =
    useFullpageScroll({
      totalSections: SECTIONS.length,
      transitionDuration: 750,
    });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0d0e] text-white font-mono select-none">
      {/* Background Parallax Multi-layer */}
      <ParallaxBackground
        currentSection={currentSection}
        totalSections={SECTIONS.length}
      />

      {/* Floating System Widgets */}
      <FontSelector />
      <MusicPlayer />
      <KyivClock />
      <KyivWeather />
      <CVFolder />
      <AnimatedTitle />

      {/* Side Dots & Progress Bar Navigation */}
      <FullpageNavigation
        currentSection={currentSection}
        totalSections={SECTIONS.length}
        sections={SECTIONS}
        goToSection={goToSection}
        progress={progress}
      />

      {/* Main Fullpage Parallax Slides Container */}
      <div
        className="w-full h-full transition-transform duration-750 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
        }}
      >
        {/* Slide 01: Hero / Overview */}
        <section className="w-full h-screen flex items-center justify-center relative z-10">
          <About onScrollDown={nextSection} />
        </section>

        {/* Slide 02: Skills Network */}
        <section className="w-full h-screen flex items-center justify-center relative z-10">
          <SkillsGraph />
        </section>

        {/* Slide 03: Experience */}
        <section className="w-full h-screen flex items-center justify-center relative z-10">
          <ExperienceSection />
        </section>

        {/* Slide 04: Transmissions / Telegram Feed */}
        <section className="w-full h-screen flex items-center justify-center relative z-10">
          <TelegramFeed />
        </section>

        {/* Slide 05: Contact & Socials Hub */}
        <section className="w-full h-screen flex items-center justify-center relative z-10">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
