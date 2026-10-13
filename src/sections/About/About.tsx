import { ArrowRight, CircleCheck, Leaf } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { StatisticCard } from '@/components/cards/StatisticCard';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { SmartImage } from '@/components/common/SmartImage';
import { aboutStats, aboutValues } from '@/data/home';
import { images } from '@/data/images';
import { easeOut } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function About() {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <section id={SECTION_IDS.about} aria-labelledby="about-title" className="section-y overflow-hidden bg-white">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image + floating badge */}
        <Reveal variant="slideRight" className="relative min-w-0 pb-8 sm:pb-0">
          <div className="group relative overflow-hidden rounded-2xl shadow-card">
            <div className="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]">
              <SmartImage
                image={images.installer}
                sizes="(min-width:1024px) 600px, 92vw"
                className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6, ease: easeOut }}
            whileHover={{ y: -4 }}
            className="absolute bottom-0 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-float sm:bottom-6 sm:left-6 sm:gap-4 sm:px-5 sm:py-4"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white sm:size-14">
              <Leaf aria-hidden className="size-6 sm:size-7" strokeWidth={2} />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-navy sm:text-xl">10+ Years</span>
              <span className="block text-xs sm:text-sm">Of Solar Excellence</span>
            </span>
          </motion.div>
        </Reveal>

        {/* Copy */}
        <Reveal variant="slideLeft" className="min-w-0">
          <p className="eyebrow text-primary-700">About Us</p>
          <h2 id="about-title" className="mt-3 text-h2">
            Building a Cleaner, <br className="hidden sm:block" />
            Greener Tomorrow
          </h2>
          <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed sm:text-base">
            We are a trusted solar energy company dedicated to providing high-quality, affordable, and sustainable
            solar solutions for homes, businesses, and industries. Our mission is to make clean energy accessible to
            everyone.
          </p>

          <dl className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-line">
            {aboutStats.map((stat, i) => (
              <div key={stat.label} className={cn('min-w-0', i === 0 ? 'pr-3 sm:pr-6' : 'px-3 sm:px-6')}>
                <StatisticCard {...stat} />
              </div>
            ))}
          </dl>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                id={panelId}
                key="values"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                className="mt-7 grid max-w-lg gap-4"
              >
                {aboutValues.map((v) => (
                  <li key={v.title} className="flex gap-3">
                    <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-700" />
                    <p className="text-sm leading-relaxed">
                      <strong className="font-semibold text-navy">{v.title}.</strong> {v.text}
                    </p>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <Button
              size="sm"
              icon={ArrowRight}
              onClick={() => setExpanded((e) => !e)}
              ariaExpanded={expanded}
              ariaControls={panelId}
            >
              {expanded ? 'Show Less' : 'Learn More'}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
