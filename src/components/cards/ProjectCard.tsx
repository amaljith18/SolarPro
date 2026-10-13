import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { SmartImage } from '@/components/common/SmartImage';
import { fadeUp } from '@/lib/animations';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  /** Show capacity/year/summary under the image (used on the projects page). */
  detailed?: boolean;
}

/** Photo card with a bottom gradient, white title and green location pin. */
export function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  return (
    <motion.article
      id={project.id}
      variants={fadeUp}
      className={cn('group min-w-0 scroll-mt-28', detailed && 'flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy/5')}
    >
      <div className={cn('relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]', detailed ? '' : 'rounded-2xl shadow-card')}>
        <SmartImage
          image={project.image}
          sizes="(min-width:1024px) 400px, (min-width:640px) 48vw, 92vw"
          className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/25 to-transparent transition-opacity duration-500 group-hover:from-navy-900/95"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 sm:p-5">
          <h3 className="text-base text-white sm:text-lg">{project.title}</h3>
          <p className="flex items-center gap-1.5 text-sm text-white/90">
            <MapPin aria-hidden className="size-4 shrink-0 fill-primary text-primary" strokeWidth={2} />
            {project.location}
          </p>
        </div>
        {!detailed && (
          <Link
            to={`/projects#${project.id}`}
            aria-label={`${project.title}, ${project.location} — view project details`}
            className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-3 focus-visible:-outline-offset-3"
          />
        )}
      </div>
      {detailed && (
        <div className="flex flex-1 flex-col gap-3 p-5">
          <dl className="flex flex-wrap gap-2 text-xs font-medium">
            <div className="rounded-full bg-primary-50 px-3 py-1 text-primary-700">
              <dt className="sr-only">Capacity</dt>
              <dd>{project.capacity}</dd>
            </div>
            <div className="rounded-full bg-muted px-3 py-1 text-navy">
              <dt className="sr-only">Completed</dt>
              <dd>{project.year}</dd>
            </div>
            <div className="rounded-full bg-muted px-3 py-1 text-navy capitalize">
              <dt className="sr-only">Category</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>
          <p className="text-sm leading-relaxed">{project.summary}</p>
        </div>
      )}
    </motion.article>
  );
}
