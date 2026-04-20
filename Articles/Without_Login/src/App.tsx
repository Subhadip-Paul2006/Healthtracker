import '@/styles/articles-theme.css';
import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/hero-section';
import { FeaturedArticle } from '@/components/featured-article';
import { TrendingSection } from '@/components/trending-section';
import { ArticleGrid } from '@/components/article-grid';
import { TrustSection } from '@/components/trust-section';
import { NewsletterCta } from '@/components/newsletter-cta';
import { ArticlesFooter } from '@/components/articles-footer';

export default function App() {
  return (
    <div className="articles-root min-h-svh bg-article-bg font-articles-sans text-article-fg antialiased">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturedArticle />
        <TrendingSection />
        <ArticleGrid />
        <TrustSection />
        <NewsletterCta />
      </main>
      <ArticlesFooter />
    </div>
  );
}
