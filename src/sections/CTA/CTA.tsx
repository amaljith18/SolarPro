import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useUI } from '@/app/providers/ui-context';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { SmartImage } from '@/components/common/SmartImage';
import { images } from '@/data/images';
import { fadeUp, revealViewport, staggerChildren } from '@/lib/animations';

export function CTA() {
  const { openQuote } = useUI();
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy-900">
      <SmartImage image={images.cta} sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover object-[center_40%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-900/35" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(7_29_43/0.6)_0%,transparent_65%)]"
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <motion.div
          variants={staggerChildren(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p variants={fadeUp} className="eyebrow text-white/90">
            Ready to Go Solar?
          </motion.p>
          <motion.h2 variants={fadeUp} id="cta-title" className="mt-3 text-h2 text-white">
            Let’s Build a Cleaner, Brighter Future Together
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-[0.9375rem] text-white/85 sm:text-base">
            Get a free consultation today and take the first step towards energy independence.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-7">
            <Button icon={ArrowRight} onClick={() => openQuote()}>
              Get a Free Quote
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
