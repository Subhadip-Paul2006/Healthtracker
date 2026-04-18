import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { AnimatedShaderHeroBackground } from './components/ui/animated-shader-hero';
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
const FAQ = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-coffee-black font-body text-sand selection:bg-orange-burnt/30 selection:text-ivory">
      <div className="pointer-events-none fixed inset-0 z-0">
        <AnimatedShaderHeroBackground />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,5,2,0.78)_0%,rgba(18,9,3,0.5)_28%,rgba(18,9,3,0.62)_100%)]" />
      </div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="relative">
          <Clients />
          <Suspense fallback={<div className="flex h-64 w-full items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-orange-burnt border-t-transparent animate-spin"></div></div>}>
            <Services />
            <Articles />
            <Analytics />
            <Testimonials />
            <CTA />
            <Stats />
          </Suspense>
        </div>
      </main>
      <Suspense fallback={null}>
        <FAQ />
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
