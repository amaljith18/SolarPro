import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { services } from '@/data/services';
import { SECTION_IDS } from '@/lib/constants';

export function Services() {
  return (
    <section
      id={SECTION_IDS.services}
      aria-labelledby="services-title"
      className="section-y bg-[linear-gradient(180deg,var(--color-primary-50)_0%,#f7fbf5_100%)]"
    >
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Our Services"
          title="Complete Solar Solutions"
          description="From consultation to installation and maintenance, we provide end-to-end solar solutions tailored to your needs."
        />
        <StaggerContainer
          as="ul"
          className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4"
        >
          {services.map((service) => (
            <li key={service.slug} className="min-w-0">
              <ServiceCard service={service} />
            </li>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
