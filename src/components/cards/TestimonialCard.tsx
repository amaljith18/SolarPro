import { Star } from 'lucide-react';
import { SmartImage } from '@/components/common/SmartImage';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { quote, name, role, rating, avatar } = testimonial;
  return (
    <figure className="flex h-full min-w-0 flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy/5 sm:p-7">
      <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            aria-hidden
            className={i < rating ? 'size-[1.125rem] fill-star text-star' : 'size-[1.125rem] text-line'}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-navy/85">“{quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {avatar ? (
          <SmartImage image={avatar} sizes="48px" className="size-12 shrink-0 rounded-full object-cover" />
        ) : (
          <span
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 ring-2 ring-white"
          >
            {initials(name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block font-semibold text-navy">{name}</span>
          <span className="block truncate text-xs">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-z]/g, '').charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
