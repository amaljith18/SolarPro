import type { ReactNode } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  /** id on the <h2>, for aria-labelledby on the parent section. */
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'center', id, className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex min-w-0 flex-col gap-3',
        align === 'center' ? 'mx-auto max-w-2xl items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <p className="eyebrow text-primary-700">{eyebrow}</p>
      <h2 id={id} className="text-h2">
        {title}
      </h2>
      {description && <p className="max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">{description}</p>}
    </Reveal>
  );
}
