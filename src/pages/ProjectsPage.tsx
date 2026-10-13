import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { Seo } from '@/components/common/Seo';
import { projectCategories, projects } from '@/data/projects';
import { staggerChildren } from '@/lib/animations';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const visible = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <>
      <Seo title="Projects" description="Residential, commercial and industrial solar installations by SolarPro." />
      <PageHeader
        eyebrow="Our Projects"
        title="Solar Installations We’re Proud Of"
        description="From family homes to megawatt-scale industrial sites — a selection of systems designed, installed and maintained by our team."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
      />

      <section className="section-y bg-primary-50">
        <Container>
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {projectCategories.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-pressed={filter === c.value}
                onClick={() => setFilter(c.value)}
                className={cn(
                  'h-10 rounded-full px-5 text-sm font-semibold transition-colors',
                  filter === c.value ? 'bg-primary-600 text-white' : 'bg-white text-navy ring-1 ring-line hover:ring-primary',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {visible.length} projects
          </p>

          <motion.div
            key={filter}
            variants={staggerChildren(0.08)}
            initial="hidden"
            animate="visible"
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} detailed />
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
