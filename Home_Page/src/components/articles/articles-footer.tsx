import { Link } from 'react-router-dom';

export function ArticlesFooter() {
  return (
    <footer className="border-t border-article-border/60 bg-article-deep px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center text-sm text-article-fg-muted sm:flex-row sm:text-left">
        <p className="font-articles-serif text-lg italic text-article-fg/90">HealthTrack</p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          <a
            href="#"
            className="hover:text-article-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-deep"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-article-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-deep"
          >
            Terms
          </a>
          <Link
            to="/"
            className="hover:text-article-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-deep"
          >
            Home
          </Link>
        </nav>
        <p className="text-xs">© {new Date().getFullYear()} HealthTrack. All rights reserved.</p>
      </div>
    </footer>
  );
}
