import '@/styles/articles-theme.css';
import { SiteHeader } from '@/components/articles/site-header';
import { HeroSection } from '@/components/articles/hero-section';
import { FeaturedArticle } from '@/components/articles/featured-article';
import { TrendingSection } from '@/components/articles/trending-section';
import { ArticleGrid } from '@/components/articles/article-grid';
import { TrustSection } from '@/components/articles/trust-section';
import { NewsletterCta } from '@/components/articles/newsletter-cta';
import { ArticlesFooter } from '@/components/articles/articles-footer';

export default function ArticlesPage() {
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
