import type { FormEvent } from 'react';
import { Check, Loader2, Mail } from 'lucide-react';

export type NewsletterStatus = 'idle' | 'loading' | 'done';

export type FormProps = {
  email: string;
  setEmail: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  status: NewsletterStatus;
};

/** Newsletter email + subscribe control (referenced from `ARTICLES_PAGE(without_Login).md` file structure). */
export function Form({ email, setEmail, onSubmit, status }: FormProps) {
  const disabled = status === 'loading' || status === 'done';

  return (
    <form onSubmit={onSubmit} className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <div className="relative flex flex-1 items-center">
        <Mail className="pointer-events-none absolute left-4 h-5 w-5 text-article-fg-muted" aria-hidden />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="w-full rounded-full border border-article-border bg-article-muted py-3.5 pl-12 pr-4 text-sm text-article-fg placeholder:text-article-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-card"
          disabled={disabled}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className={`inline-flex min-h-[48px] min-w-[140px] items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-[transform,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-article-primary focus-visible:ring-offset-2 focus-visible:ring-offset-article-card disabled:opacity-90 ${
          status === 'done'
            ? 'bg-article-secondary text-article-secondary-fg ring-2 ring-article-secondary/60'
            : 'bg-article-primary text-article-primary-fg'
        }`}
      >
        {status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
        {status === 'done' && <Check className="h-5 w-5" aria-hidden />}
        {status === 'idle' && 'Subscribe'}
        {status === 'loading' && 'Joining…'}
        {status === 'done' && "You're in"}
      </button>
    </form>
  );
}
