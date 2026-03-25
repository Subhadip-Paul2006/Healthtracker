import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Analytics } from './components/Analytics';

import { runPageLoadSequence } from './animations/pageLoad';
import { revealOnScroll, revealCards, revealGraphCards } from './animations/scrollReveal';

function App() {
  useEffect(() => {
    // Run initial hero load
    runPageLoadSequence();

    // Setup scroll triggers for sections
    revealOnScroll('[data-stats-container]');
    revealCards('[data-stats-container]', '[data-stat-chip]');
    
    revealOnScroll('[data-analytics]');
    revealGraphCards();
  }, []);

  return (
    <div className="bg-coffee-black min-h-screen font-body text-ivory overflow-x-hidden selection:bg-orange-burnt/30 selection:text-ivory">
      <Navbar />
      <Hero />
      <Stats />
      <Analytics />
      
      {/* Footer */}
      <footer className="bg-coffee-deep py-8 border-t border-sand/5 text-center text-sand/60 text-sm">
        <p className="font-body text-sand/40">© 2026 HealthTrack. Patient-first healthcare design.</p>
      </footer>
    </div>
  );
}

export default App;
