import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Reveal } from '@/components/animations/Reveal';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Container } from '@/components/common/Container';
import { featuredProjects } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';

export function Projects() {
  return (
    <section
      id={SECTION_IDS.projects}
      aria-labelledby="projects-title"
      className="section-y bg-[linear-gradient(180deg,#f7fbf5_0%,var(--color-primary-50)_100%)]"
    >
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div className="min-w-0">
            <p className="eyebrow text-primary-700">Our Projects</p>
            <h2 id="projects-title" className="mt-3 text-h2">
              Recent Solar Installations
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-600"
          >
            View All Projects
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
          </Link>
        </Reveal>

        <StaggerContainer as="div" className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredProjects.map((project, i) => (
            <div key={project.id} className={i === 2 ? 'sm:col-span-2 lg:col-span-1' : undefined}>
              <ProjectCard project={project} />
            </div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
