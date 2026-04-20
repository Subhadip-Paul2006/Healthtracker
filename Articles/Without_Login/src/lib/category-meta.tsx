import type { LucideIcon } from 'lucide-react';
import {
  Brain,
  Droplets,
  Dumbbell,
  Flower2,
  GlassWater,
  HeartPulse,
  Leaf,
  Moon,
  ShieldCheck,
} from 'lucide-react';
import type { ArticleCategory } from './articles-data';

export type CategoryMeta = {
  Icon: LucideIcon;
  chipClass: string;
};

/** Token-safe accents — no raw emerald/rose Tailwind palette names. */
export const categoryMeta: Record<ArticleCategory, CategoryMeta> = {
  Nutrition: {
    Icon: Leaf,
    chipClass: 'bg-article-secondary/30 text-article-secondary-fg',
  },
  Fitness: {
    Icon: Dumbbell,
    chipClass: 'bg-article-primary/15 text-article-primary',
  },
  'Mental Health': {
    Icon: Brain,
    chipClass: 'bg-article-muted text-article-fg border border-article-border',
  },
  Sleep: {
    Icon: Moon,
    chipClass: 'bg-article-secondary/25 text-article-secondary-fg',
  },
  Diabetes: {
    Icon: Droplets,
    chipClass: 'bg-article-primary/12 text-article-primary',
  },
  Immunity: {
    Icon: ShieldCheck,
    chipClass: 'bg-article-secondary/30 text-article-secondary-fg',
  },
  Hydration: {
    Icon: GlassWater,
    chipClass: 'bg-article-muted text-article-fg/90 border border-article-border',
  },
  Meditation: {
    Icon: Flower2,
    chipClass: 'bg-article-primary/10 text-article-fg',
  },
  Cardiology: {
    Icon: HeartPulse,
    chipClass: 'bg-article-primary/15 text-article-primary',
  },
};
