import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
  const [showDemo, setShowDemo] = useState(false);

  const handleNavigate = (id) => {
    if (id === 'demo') {
      setShowDemo(true);
    } else {
      setShowDemo(false);
      // Wait for state update then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="app">
      {showDemo ? (
        <Dashboard onClose={() => setShowDemo(false)} />
      ) : (
        <>
          <Header onNavigate={handleNavigate} />
          <main>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Team />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
