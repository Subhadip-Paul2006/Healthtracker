import { useNavigate } from 'react-router-dom';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const navigate = useNavigate();
  
  // Scroll animation refs
  const [leftRef, leftInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="relative z-10 py-24 border-t border-sand/5 bg-transparent">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Side */}
        <motion.div 
          ref={leftRef}
          initial={{ opacity: 0, x: -60 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          className="col-span-1 lg:col-span-5"
        >
          <SectionLabel>Expert Insights</SectionLabel>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
            className="text-h3 lg:text-h2 text-ivory mt-2 font-display mb-6 leading-tight"
          >
            Health articles written by verified experts
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
            className="text-sand/80 text-body mb-10 max-w-md"
          >
            Stay informed with the latest medical research, wellness tips, and guides curated by our network of trusted healthcare professionals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <Button variant="sand" onClick={() => navigate('/articles')}>
              Read All Articles
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Side Cards */}
        <motion.div 
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {articles.map((article, index) => (
            <motion.a 
              key={index} 
              href="#" 
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
              }}
              className="block bg-graphite rounded-card overflow-hidden border border-sand/10 shadow-card hover:border-orange-burnt/30 transition-colors duration-300 group"
            >
              <div className="relative h-56 overflow-hidden bg-graphite-dark">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
                  className="absolute top-4 left-4 bg-coffee-black/80 backdrop-blur pb-px pt-0.5 px-3 rounded-chip text-[10px] font-bold tracking-widest text-orange-burnt border border-orange-burnt/20"
                >
                  {article.category}
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-ivory mb-6 leading-snug group-hover:text-orange-burnt transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={cardsInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.3 + 0.7, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-sand/20">
                    <img src={article.avatar} alt={article.author} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold text-sand/90">{article.author}</span>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
