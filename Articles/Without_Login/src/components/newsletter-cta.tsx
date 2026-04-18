import { useState } from 'react';
import type { FormEvent } from 'react';
import { Heart, Leaf, Mail, Sparkles } from 'lucide-react';
import { Form } from '@/components/Form';

const floaters = [
  { Icon: Mail, d: '0s' },
  { Icon: Sparkles, d: '0.5s' },
  { Icon: Heart, d: '1s' },
  { Icon: Leaf, d: '1.5s' },
] as const;

export function NewsletterCta() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [email, setEmail] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    window.setTimeout(() => setStatus('done'), 900);
  };

  return (
    <section className="relative px-4 pb-24 pt-8 sm:px-6 lg:px-8" aria-labelledby="newsletter-heading">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-article-border bg-article-card p-10 shadow-xl">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {floaters.map(({ Icon, d }) => (
            <Icon
              key={d}
              className="absolute text-article-primary/35 animate-float"
              style={{
                animationDelay: d,
                top: d === '0s' ? '12%' : d === '0.5s' ? '75%' : d === '1s' ? '20%' : '70%',
                left: d === '0s' || d === '1s' ? '8%' : '88%',
              }}
              strokeWidth={1.5}
              size={28}
            />
          ))}
        </div>

        <h2 id="newsletter-heading" className="relative font-articles-serif text-3xl font-semibold text-balance text-article-fg sm:text-4xl">
          Get weekly health wisdom, curated.
        </h2>
        <p className="relative mt-3 text-pretty leading-relaxed text-article-fg-muted">
          One digest, no drama: the pieces our editors and clinicians would send to their own families.
        </p>

        <Form email={email} setEmail={setEmail} onSubmit={onSubmit} status={status} />

        <p
          className="relative mt-6 text-center text-xs text-article-fg-muted"
          role={status === 'done' ? 'status' : undefined}
        >
          {status === 'done' ? 'Thanks — watch your inbox this week.' : 'No spam. One click to unsubscribe.'}
        </p>
      </div>
    </section>
  );
}
