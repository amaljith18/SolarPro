import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useUI } from '@/app/providers/ui-context';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { SmartImage } from '@/components/common/SmartImage';
import { heroBenefits } from '@/data/home';
import { images } from '@/data/images';
import { easeOut, fadeUp, heroContainer, heroLine, staggerChildren } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Hero() {
  const { openQuote, openVideo } = useUI();

  return (
    <section
      id={SECTION_IDS.home}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[clamp(38rem,88svh,46rem)] flex-col overflow-hidden bg-navy-900"
    >
      {/* Background photo with a slow settle-in zoom */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: easeOut }}
      >
        <SmartImage
          image={{ ...images.hero, alt: '' }}
          priority
          sizes="100vw"
          className="size-full object-cover object-[70%_center] sm:object-center"
        />
      </motion.div>

      {/* Readability overlays: left-to-right for the copy, bottom for the benefit strip */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/5 max-md:via-navy-900/70 max-md:to-navy-900/40"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-navy-900/90 to-transparent" />

      <Container className="flex flex-1 flex-col justify-center pt-14 pb-10 sm:pt-20 lg:pt-16">
        <motion.div variants={heroContainer} initial="hidden" animate="visible" className="max-w-xl min-w-0">
          <motion.p variants={fadeUp} className="eyebrow text-white/90">
            Clean Energy. Brighter Tomorrow.
          </motion.p>

          <h1 id="hero-title" className="mt-4 text-display font-bold tracking-tight text-white sm:mt-5">
            {['Power Your', 'Home with'].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={heroLine} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={heroLine} className="block text-primary">
                Solar Energy
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-white/90 sm:text-base"
          >
            Save money, reduce your carbon footprint, and switch to a cleaner, greener future with our reliable
            solar solutions.
          </motion.p>

          <motion.div variants={staggerChildren(0.1)} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <motion.div variants={fadeUp}>
              <Button icon={ArrowRight} onClick={() => openQuote()}>
                Get a Free Quote
              </Button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button variant="outline-light" icon={Play} nudgeIcon={false} onClick={openVideo}>
                Watch Video
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Benefit strip */}
      <Container className="pb-8 sm:pb-10">
        <motion.ul
          variants={staggerChildren(0.1, 0.9)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/15 pt-6 lg:grid-cols-4 lg:gap-0 lg:border-t-0 lg:pt-0"
        >
          {heroBenefits.map(({ title, icon: Icon, tone }, i) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className={cn(
                'flex min-w-0 items-center gap-3 sm:gap-4 lg:px-6',
                i === 0 && 'lg:pl-0',
                i > 0 && 'lg:border-l lg:border-white/20',
              )}
            >
              <Icon aria-hidden className={cn('size-9 shrink-0 sm:size-10', tone)} strokeWidth={1.6} />
              <span className="text-[0.8125rem] leading-snug font-medium whitespace-pre-line text-white sm:text-sm">
                {title}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
