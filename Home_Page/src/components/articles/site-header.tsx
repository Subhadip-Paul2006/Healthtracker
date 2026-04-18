import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Find Doctors' as const, to: '/' as const },
    { label: 'Lab Tests' as const, href: '#' as const },
    { label: 'Articles' as const, to: '/articles' as const },
    { label: 'Trackers' as const, href: '#' as const },
  ] as const;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-article-border/60 bg-article-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
        >
          <div
            className="flex h-10 w-10 items-center justify-center bg-article-fg/15"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
            aria-hidden
          >
            <span className="font-articles-serif text-lg font-semibold italic text-article-fg">H</span>
          </div>
          <span className="font-articles-serif text-xl font-semibold italic tracking-tight text-article-fg">
            HealthTrack
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active =
              ('to' in item && item.to === '/articles' && location.pathname === '/articles') ||
              ('to' in item && item.to === '/' && item.label === 'Find Doctors' && location.pathname === '/');
            const className = cn(
              'relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg',
              active
                ? 'text-article-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-article-primary'
                : 'text-article-fg/80 hover:text-article-fg',
            );
            if ('href' in item) {
              return (
                <a key={item.label} href={item.href} className={className}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} to={item.to} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <p className="flex items-center gap-1.5 text-sm">
            <span className="text-article-fg-muted">Emergency:</span>
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-article-primary/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-article-primary" />
            </span>
            <a
              href="tel:102"
              className="font-bold text-article-fg hover:text-article-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
            >
              102
            </a>
          </p>
          <a
            href="#"
            className="text-sm font-medium text-article-fg/90 hover:text-article-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
          >
            Log In
          </a>
          <Link
            to="/register"
            className="group shimmer-btn inline-flex items-center gap-2 rounded-full bg-article-primary px-5 py-2.5 text-sm font-semibold text-article-primary-fg shadow-md transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
          >
            Sign Up
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-article-fg lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-bg"
          aria-expanded={menuOpen}
          aria-controls="articles-mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {menuOpen && (
        <div
          id="articles-mobile-nav"
          className="border-t border-article-border/60 bg-article-bg/95 px-4 py-6 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {links.map((item, i) => {
              const innerClass = cn(
                'text-lg font-medium transition-[opacity,transform] duration-500 ease-out',
                item.label === 'Articles' ? 'text-article-primary' : 'text-article-fg',
              );
              const common = { className: innerClass, style: { transitionDelay: `${i * 60}ms` }, onClick: () => setMenuOpen(false) };
              if ('href' in item) {
                return (
                  <a key={item.label} href={item.href} {...common}>
                    {item.label}
                  </a>
                );
              }
              return (
                <Link key={item.label} to={item.to} {...common}>
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/register"
              className="mt-4 rounded-full bg-article-primary px-5 py-3 text-center font-semibold text-article-primary-fg"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
