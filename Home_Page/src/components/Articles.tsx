import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';

const articles = [
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    category: 'FEATURED',
    title: 'The Future of AI in Preventative Healthcare',
    author: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
  },
  {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    category: 'LAB TEST',
    title: 'Understanding Your Complete Blood Count (CBC)',
    author: 'Dr. Rahul Mehta',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&q=80',
  }
];

export function Articles() {
  return (
    <section className="relative z-10 py-24 border-t border-sand/5 bg-transparent">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Side */}
        <div className="col-span-1 lg:col-span-5 reveal-block">
          <SectionLabel>Expert Insights</SectionLabel>
          <h2 className="text-h3 lg:text-h2 text-ivory mt-2 font-display mb-6 leading-tight">Health articles written by verified experts</h2>
          <p className="text-sand/80 text-body mb-10 max-w-md">
            Stay informed with the latest medical research, wellness tips, and guides curated by our network of trusted healthcare professionals.
          </p>
          <Button variant="sand">Read All Articles</Button>
        </div>

        {/* Right Side Cards */}
        <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 reveal-stagger">
          {articles.map((article, index) => (
            <a key={index} href="#" className="block bg-graphite rounded-card overflow-hidden border border-sand/10 shadow-card hover:shadow-card-hover hover:border-orange-burnt/30 transition-all duration-300 group">
              <div className="relative h-56 overflow-hidden bg-graphite-dark">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-coffee-black/80 backdrop-blur pb-px pt-0.5 px-3 rounded-chip text-[10px] font-bold tracking-widest text-orange-burnt border border-orange-burnt/20">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-ivory mb-6 leading-snug group-hover:text-orange-burnt transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-sand/20">
                    <img src={article.avatar} alt={article.author} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold text-sand/90">{article.author}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
