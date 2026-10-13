import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Reveal } from '@/components/animations/Reveal';
import { Container } from './Container';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  crumbs: Array<{ label: string; to?: string }>;
}

/** Compact dark banner with breadcrumbs, used on inner pages. */
export function PageHeader({ eyebrow, title, description, crumbs }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-14 sm:py-16 lg:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_20%,rgb(75_175_36/0.28),transparent_45%),radial-gradient(circle_at_10%_100%,rgb(246_183_27/0.14),transparent_40%)]"
      />
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/75 sm:text-sm">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-primary">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal className="mt-6 max-w-2xl">
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-h2 text-white">{title}</h1>
          {description && <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80 sm:text-base">{description}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
