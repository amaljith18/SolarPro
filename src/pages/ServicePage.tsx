import { ArrowRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { Seo } from '@/components/common/Seo';
import { SmartImage } from '@/components/common/SmartImage';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { getServiceBySlug, services } from '@/data/services';
import { cn } from '@/lib/utils';
import { NotFoundPage } from './NotFoundPage';

export function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <NotFoundPage />;

  const Icon = service.icon;

  return (
    <>
      <Seo title={service.title} description={service.shortDescription} />
      <PageHeader
        eyebrow="Our Services"
        title={service.title}
        description={service.shortDescription}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/#services' }, { label: service.title }]}
      />

      <section className="section-y">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal className="min-w-0">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-card">
              <SmartImage image={service.image} priority sizes="(min-width:1024px) 640px, 92vw" className="size-full object-cover" />
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <Icon aria-hidden className="size-6" strokeWidth={1.8} />
              </span>
              <h2 className="text-2xl">What’s included</h2>
            </div>
            <p className="mt-4 leading-relaxed">{service.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex gap-3 rounded-xl bg-muted p-4 text-sm text-navy">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-700" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="slideLeft" className="min-w-0">
            <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy/5 sm:p-7 lg:sticky lg:top-24">
              <h2 className="text-xl sm:text-2xl">Request a free quote</h2>
              <p className="mt-1 mb-5 text-sm">No obligation — we’ll reply within one business day.</p>
              {/* key resets the form when navigating between services */}
              <QuoteForm key={service.slug} defaultPropertyType={service.propertyType} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="other-services" className="bg-primary-50 py-14 sm:py-16">
        <Container>
          <h2 id="other-services" className="text-xl sm:text-2xl">
            Explore other services
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => {
                const SIcon = s.icon;
                return (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className={cn(
                        'group flex h-full items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy/5',
                        'transition-shadow hover:shadow-card-hover',
                      )}
                    >
                      <SIcon aria-hidden className="size-8 shrink-0 text-primary" strokeWidth={1.6} />
                      <span className="min-w-0 flex-1 font-semibold text-navy">{s.title}</span>
                      <ArrowRight aria-hidden className="size-4 text-primary-700 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
          </ul>
        </Container>
      </section>
    </>
  );
}
