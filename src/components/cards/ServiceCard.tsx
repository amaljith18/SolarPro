import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { SmartImage } from '@/components/common/SmartImage';
import { fadeUp } from '@/lib/animations';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

/**
 * Service card — icon, title, copy, "Learn More" and a photo pinned to the bottom.
 * The link's ::after covers the card, so the whole card is clickable with a single tab stop.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy/5 transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="flex flex-1 flex-col px-5 pt-6 pb-4 sm:px-6">
        <Icon aria-hidden className="size-9 text-primary" strokeWidth={1.6} />
        <h3 className="mt-4 text-h3">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{service.shortDescription}</p>
        <Link
          to={`/services/${service.slug}`}
          className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary-700 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
        >
          Learn More
          <span className="sr-only"> about {service.title}</span>
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1.5"
            strokeWidth={2.4}
          />
        </Link>
      </div>
      <div className="px-2 pb-2">
        <div className="aspect-[16/10] overflow-hidden rounded-xl">
          <SmartImage
            image={service.image}
            sizes="(min-width:1280px) 300px, (min-width:640px) 45vw, 92vw"
            className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-110"
          />
        </div>
      </div>
    </motion.article>
  );
}
