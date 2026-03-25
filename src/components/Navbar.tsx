import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Mobile menu GSAP animation
    if (mobileMenuOpen) {
      gsap.fromTo('#mobile-drawer', 
        { x: '100%' }, 
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-link',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      gsap.to('#mobile-drawer', { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [mobileMenuOpen]);

  const navClass = `fixed top-0 w-full z-50 h-[72px] transition-all duration-400 ease-out flex items-center justify-between px-6 lg:px-12
    ${scrolled ? 'bg-coffee-black/90 backdrop-blur-xl border-b border-sand/10' : 'bg-transparent'}`;

  const REFS = [
    { label: 'Platform', href: '#platform' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Analytics', href: '#analytics' },
  ];

  return (
    <>
      <nav className={navClass}>
        <div className="flex items-center gap-2">
          {/* Logo brand */}
          <div className="w-8 h-8 rounded-lg bg-orange-gradient flex items-center justify-center">
            <div className="w-3 h-3 bg-ivory rounded-sm" />
          </div>
          <span className="font-display font-bold text-xl text-ivory tracking-wide">HealthTrack</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {REFS.map((link, i) => (
            <a key={i} href={link.href} className="font-body text-body text-sand hover:text-orange-burnt transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Log In</Button>
          <Button variant="primary">Book Appointment</Button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-ivory p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div 
        id="mobile-drawer" 
        className="fixed inset-0 z-[60] bg-coffee-deep flex flex-col pt-24 px-8 translate-x-full"
      >
        <button 
          className="absolute top-6 right-6 text-ivory p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        
        <div className="flex flex-col gap-6 mt-8">
          {REFS.map((link, i) => (
            <a key={i} href={link.href} onClick={() => setMobileMenuOpen(false)} className="mobile-link font-display text-h3 text-ivory border-b border-sand/10 pb-4">
              {link.label}
            </a>
          ))}
          <div className="mobile-link flex flex-col gap-4 mt-8">
            <Button variant="ghost" className="w-full justify-center">Log In</Button>
            <Button variant="primary" className="w-full justify-center">Book Appointment</Button>
          </div>
        </div>
      </div>
    </>
  );
}
