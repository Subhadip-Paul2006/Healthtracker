export type ArticleCategory =
  | 'Cardiology'
  | 'Nutrition'
  | 'Fitness'
  | 'Mental Health'
  | 'Sleep'
  | 'Diabetes'
  | 'Immunity'
  | 'Hydration'
  | 'Meditation';

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  image: string;
  author: { name: string; role: string; avatar: string };
  publishedAt: string;
  readMinutes: number;
  likes: number;
  views: number;
  slug: string;
};

export const featuredArticle: Article = {
  id: 'feat-1',
  title: 'The small daily habits that quietly protect your heart.',
  excerpt:
    'From walkable minutes to sleep regularity, small, sustainable changes add up. We asked cardiologists what they do in their own routines — and what the evidence says for most adults.',
  category: 'Cardiology',
  image:
    'https://images.unsplash.com/photo-1628348068341-c5a59c2a0b2a?w=1200&q=80&auto=format&fit=crop',
  author: {
    name: 'Dr. Sarah Okonkwo, MD',
    role: 'Cardiologist',
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80&auto=format&fit=crop',
  },
  publishedAt: '2026-04-02',
  readMinutes: 9,
  likes: 842,
  views: 12400,
  slug: 'daily-habits-heart-health',
};

export const articles: Article[] = [
  {
    id: 'a1',
    title: 'Fiber-first breakfasts that keep glucose steadier through lunch.',
    excerpt: 'Pairing protein with soluble fiber can blunt post-meal spikes without rigid rules.',
    category: 'Nutrition',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Emily Chen',
      role: 'Registered Dietitian',
      avatar:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-28',
    readMinutes: 6,
    likes: 312,
    views: 8900,
    slug: 'fiber-breakfast-glucose',
  },
  {
    id: 'a2',
    title: 'Strength training twice a week: a practical minimum for longevity.',
    excerpt: 'Full-body sessions, manageable loads, and recovery windows that fit real schedules.',
    category: 'Fitness',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Raj Patel',
      role: 'Sports Medicine',
      avatar:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-25',
    readMinutes: 7,
    likes: 521,
    views: 15200,
    slug: 'strength-minimum-longevity',
  },
  {
    id: 'a3',
    title: 'Naming anxiety without feeding it: skills from behavioral therapy.',
    excerpt: 'Short writing prompts and breath pacing that clinicians use in structured care.',
    category: 'Mental Health',
    image:
      'https://images.unsplash.com/photo-1499209363040-3ddb15905fb2?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Aisha Rahman',
      role: 'Psychiatrist',
      avatar:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-22',
    readMinutes: 8,
    likes: 678,
    views: 20100,
    slug: 'anxiety-behavioral-skills',
  },
  {
    id: 'a4',
    title: 'Sleep debt: what one rough night actually costs your focus.',
    excerpt: 'How partial sleep loss shifts reaction time — and how to recover without guilt spirals.',
    category: 'Sleep',
    image:
      'https://images.unsplash.com/photo-1541781777631-fa2bf8709744?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Lucas Meyer',
      role: 'Sleep Specialist',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-18',
    readMinutes: 5,
    likes: 403,
    views: 9600,
    slug: 'sleep-debt-focus',
  },
  {
    id: 'a5',
    title: 'HbA1c moves slowly: why quarterly checks tell a fuller story.',
    excerpt: 'What the three-month window captures — and when to discuss time-in-range with your clinician.',
    category: 'Diabetes',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Priya Nair',
      role: 'Endocrinologist',
      avatar:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-15',
    readMinutes: 7,
    likes: 289,
    views: 7400,
    slug: 'hba1c-quarterly-story',
  },
  {
    id: 'a6',
    title: 'Vaccines aside, daily habits that support immune balance.',
    excerpt: 'Sleep, protein adequacy, and stress — the unglamorous pillars that still matter most.',
    category: 'Immunity',
    image:
      'https://images.unsplash.com/photo-1584634731334-90537e98f8f6?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Kenji Yamamoto',
      role: 'Immunology',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-10',
    readMinutes: 6,
    likes: 356,
    views: 11800,
    slug: 'immune-balance-habits',
  },
  {
    id: 'a7',
    title: 'Hydration markers beyond “8 glasses”: color, thirst, and exertion.',
    excerpt: 'A pragmatic guide for desk days, workouts, and hot weather without obsessive tracking.',
    category: 'Hydration',
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Sofia Alvarez',
      role: 'Internal Medicine',
      avatar:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-06',
    readMinutes: 4,
    likes: 198,
    views: 5100,
    slug: 'hydration-practical',
  },
  {
    id: 'a8',
    title: 'Ten-minute meditation: enough to shift autonomic tone for many adults.',
    excerpt: 'What short daily practice can and cannot replace — framed with realistic expectations.',
    category: 'Meditation',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Mei Lin',
      role: 'Clinical Psychologist',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-03-01',
    readMinutes: 6,
    likes: 612,
    views: 17400,
    slug: 'ten-minute-meditation',
  },
  {
    id: 'a9',
    title: 'Blood pressure cuffs at home: how to sit, when to measure, what to log.',
    excerpt: 'A step-by-step that matches major society guidance without the jargon.',
    category: 'Cardiology',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Omar Haddad',
      role: 'Cardiologist',
      avatar:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-02-24',
    readMinutes: 5,
    likes: 445,
    views: 9800,
    slug: 'home-bp-measurement',
  },
];

export type TrendingItem = {
  id: string;
  title: string;
  category: ArticleCategory;
  reads: number;
  author: { name: string; avatar: string };
};

/** Shown after “Load more” on the Articles page (same topics, alternate slugs). */
export const articlesLoadMore: Article[] = [
  {
    id: 'm1',
    title: 'When to recheck lipids after a medication change.',
    excerpt: 'Typical windows, what swing is normal, and what to flag for your prescriber.',
    category: 'Cardiology',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Sarah Okonkwo',
      role: 'Cardiologist',
      avatar:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-02-18',
    readMinutes: 6,
    likes: 267,
    views: 6200,
    slug: 'lipids-recheck-windows',
  },
  {
    id: 'm2',
    title: 'Rest weeks: planned deloads without losing momentum.',
    excerpt: 'Volume, intensity, and joint kindness — how coaches structure recovery mesocycles.',
    category: 'Fitness',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Raj Patel',
      role: 'Sports Medicine',
      avatar:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-02-12',
    readMinutes: 5,
    likes: 412,
    views: 11100,
    slug: 'deload-weeks-fitness',
  },
  {
    id: 'm3',
    title: 'Circadian snacks: timing protein across shift work.',
    excerpt: 'Light anchors, meal spacing, and gentle caffeine rules from occupational health.',
    category: 'Nutrition',
    image:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80&auto=format&fit=crop',
    author: {
      name: 'Dr. Emily Chen',
      role: 'Registered Dietitian',
      avatar:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&auto=format&fit=crop',
    },
    publishedAt: '2026-02-08',
    readMinutes: 7,
    likes: 305,
    views: 8400,
    slug: 'shift-work-protein-timing',
  },
];

export const trending: TrendingItem[] = [
  {
    id: 't1',
    title: 'The small daily habits that quietly protect your heart.',
    category: 'Cardiology',
    reads: 42000,
    author: {
      name: 'Dr. Sarah Okonkwo',
      avatar:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80&auto=format&fit=crop',
    },
  },
  {
    id: 't2',
    title: 'Strength training twice a week: a practical minimum for longevity.',
    category: 'Fitness',
    reads: 31200,
    author: {
      name: 'Dr. Raj Patel',
      avatar:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80&auto=format&fit=crop',
    },
  },
  {
    id: 't3',
    title: 'Naming anxiety without feeding it: skills from behavioral therapy.',
    category: 'Mental Health',
    reads: 28900,
    author: {
      name: 'Dr. Aisha Rahman',
      avatar:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&q=80&auto=format&fit=crop',
    },
  },
  {
    id: 't4',
    title: 'Ten-minute meditation: enough to shift autonomic tone for many adults.',
    category: 'Meditation',
    reads: 24100,
    author: {
      name: 'Dr. Mei Lin',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop',
    },
  },
  {
    id: 't5',
    title: 'Hydration markers beyond “8 glasses”: color, thirst, and exertion.',
    category: 'Hydration',
    reads: 15200,
    author: {
      name: 'Dr. Sofia Alvarez',
      avatar:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80&auto=format&fit=crop',
    },
  },
];
