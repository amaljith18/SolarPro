import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { steps } from '@/data/steps';
import { fadeUp } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';

/**
 * Desktop: four columns with arrows between them.
 * Mobile/tablet: a vertical timeline with a connecting line through the number badges.
 */
export function HowItWorks() {
  return (
    <section id={SECTION_IDS.howItWorks} aria-labelledby="how-title" className="section-y bg-white">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How It Works"
          title="Get Started in 4 Simple Steps"
          description="We make switching to solar easy and hassle-free."
        />

        <StaggerContainer
          as="ol"
          stagger={0.18}
          className="relative mx-auto mt-12 grid max-w-xl gap-8 sm:mt-14 md:max-w-none md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-0"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            const last = i === steps.length - 1;
            return (
              <motion.li
                key={step.number}
                variants={fadeUp}
                className="relative grid min-w-0 grid-cols-[2.5rem_1fr] gap-x-4 lg:block lg:border-l lg:border-line lg:pr-4 lg:pl-6 xl:pl-8 first:lg:border-l-0 first:lg:pl-0"
              >
                {/* Mobile timeline connector */}
                {!last && (
                  <span aria-hidden className="absolute top-12 bottom-[-2rem] left-5 w-px -translate-x-1/2 bg-primary-100 md:hidden" />
                )}

                <Icon aria-hidden className="col-start-2 size-10 text-navy lg:ml-12" strokeWidth={1.4} />

                <div className="col-span-2 mt-3 grid grid-cols-[2.5rem_1fr] items-center gap-x-4 lg:flex lg:gap-3">
                  <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[0.9375rem] font-bold text-white ring-4 ring-white">
                    <span className="sr-only">Step </span>
                    {step.number}
                  </span>
                  <h3 className="text-[0.9375rem] font-semibold sm:text-base">{step.title}</h3>
                </div>
                <p className="col-start-2 mt-2 text-sm leading-relaxed lg:mt-3 lg:ml-[3.25rem] lg:max-w-[14rem]">
                  {step.description}
                </p>

                {!last && (
                  <ArrowRight
                    aria-hidden
                    className="absolute top-[3.6rem] -right-3 hidden size-5 translate-x-1/2 text-navy/70 lg:block"
                    strokeWidth={1.8}
                  />
                )}
              </motion.li>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
