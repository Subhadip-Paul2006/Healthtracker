import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import gsap from 'gsap';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        '#mobile-menu',
        { xPercent: 100 },
        { xPercent: 0, duration: 0.6, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to('#mobile-menu', { xPercent: 100, duration: 0.4, ease: 'power3.in' });
    }
  }, [menuOpen]);

  const navLinks = ['Find Doctors', 'Lab Tests', 'Articles', 'Trackers'];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-400 ease-out flex items-center ${
          scrolled ? 'bg-coffee-black/90 backdrop-blur-xl border-b border-sand/10' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#" className="font-display font-bold text-2xl tracking-wide text-ivory">HealthTrack</a>
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link, i) => (
                <a 
                  key={link} 
                  href="#" 
                  className={`text-sm font-semibold transition-colors ${i === 0 ? 'text-orange-burnt border-b-2 border-orange-burnt pb-1' : 'text-sand hover:text-ivory'}`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-sm">
              <span className="text-sand/70">Emergency: </span>
              <a href="tel:102" className="text-ivory font-bold hover:text-orange-light transition-colors">102</a>
            </div>
            <a href="#" className="text-sm font-semibold text-sand hover:text-ivory transition-colors">Log In</a>
            <Button onClick={() => navigate('/register')}>Sign Up</Button>
          </div>

          <button 
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-ivory transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-ivory transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-ivory transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      <div 
        id="mobile-menu" 
        className="fixed inset-0 bg-coffee-black/95 backdrop-blur-3xl z-40 flex flex-col justify-center items-center gap-8 translate-x-full"
      >
        {navLinks.map((link) => (
          <a key={link} href="#" className="font-display text-4xl text-ivory hover:text-orange-burnt transition-colors">{link}</a>
        ))}
        <div className="flex flex-col gap-4 mt-8 w-64">
          <Button variant="outline" fullWidth>Log In</Button>
          <Button fullWidth onClick={() => navigate('/register')}>Sign Up</Button>
        </div>
      </div>
    </>
  );
}
