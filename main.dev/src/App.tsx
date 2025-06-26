import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Projects from './components/Projects';
import Posts from './components/Posts';
import Contact from './components/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'posts':
        return <Posts />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-mono">

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        <main className="p-8 lg:p-16 max-w-5xl">
          {renderContent()}
        </main>
      </div>

      {/* Background Terminal Pattern */}
      
    </div>
  );
}

export default App;