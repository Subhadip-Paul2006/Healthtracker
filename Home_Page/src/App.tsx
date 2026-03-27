import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { useParallax } from './hooks/useParallax';
import { initScrollReveal, killScrollTriggers } from './animations/scrollReveal';
import { runPageLoadAnimation } from './animations/pageLoad';
import RegistrationPage from './pages/Registration/RegistrationPage';

// Lazy load below-the-fold components
const Services = React.lazy(() => import('./components/Services').then(m => ({ default: m.Services })));
const Articles = React.lazy(() => import('./components/Articles').then(m => ({ default: m.Articles })));
const Analytics = React.lazy(() => import('./components/Analytics').then(m => ({ default: m.Analytics })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const CTA = React.lazy(() => import('./components/CTA').then(m => ({ default: m.CTA })));
const Stats = React.lazy(() => import('./components/Stats').then(m => ({ default: m.Stats })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

function Home() {
  useParallax();

  useEffect(() => {
    // Run initial page load animation
    const loadTl = runPageLoadAnimation();
    
    // Init scroll triggers
    const timer = setTimeout(() => {
      initScrollReveal();
    }, 100);

    return () => {
      if (loadTl) loadTl.kill();
      killScrollTriggers();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-coffee-black min-h-screen text-sand font-body w-full overflow-x-hidden selection:bg-orange-burnt/30 selection:text-ivory">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-64 w-full flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-orange-burnt border-t-transparent animate-spin"></div></div>}>
          <Services />
          <Articles />
          <Analytics />
          <Testimonials />
          <CTA />
          <Stats />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
