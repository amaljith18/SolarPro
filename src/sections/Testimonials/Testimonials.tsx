import { ChevronLeft, ChevronRight } from 'lucide-react';
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'motion/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { Container } from '@/components/common/Container';
import { IconButton } from '@/components/common/IconButton';
import { testimonials } from '@/data/testimonials';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { softSpring } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const GAP = 24;

export function Testimonials() {
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const perView = lg ? 3 : md ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - perView);

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const cardWidth = width > 0 ? (width - GAP * (perView - 1)) / perView : 0;
  const step = cardWidth + GAP;

  // Track viewport width so card sizes are exact (no clipping/overlap).
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => entry && setWidth(entry.contentRect.width));
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Keep index valid when the number of visible cards changes.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const settle = useCallback(
    (to: number) => {
      const target = -to * step;
      if (reduceMotion) x.set(target);
      else animate(x, target, softSpring);
    },
    [step, x, reduceMotion],
  );

  useEffect(() => settle(index), [index, settle]);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir > maxIndex ? 0 : i + dir < 0 ? maxIndex : i + dir)),
    [maxIndex],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    const threshold = Math.min(80, step / 4);
    if (swipe < -threshold && index < maxIndex) setIndex(index + 1);
    else if (swipe > threshold && index > 0) setIndex(index - 1);
    else settle(index);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const first = index + 1;
  const last = Math.min(index + perView, testimonials.length);

  return (
    <section id={SECTION_IDS.testimonials} aria-labelledby="testimonials-title" className="section-y overflow-hidden bg-white">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div className="min-w-0">
            <p className="eyebrow text-primary-700">Testimonials</p>
            <h2 id="testimonials-title" className="mt-3 text-h2">
              What Our Customers Say
            </h2>
          </div>
          <div className="flex gap-3">
            <IconButton icon={ChevronLeft} label="Previous testimonials" onClick={() => go(-1)} aria-controls="testimonial-track" />
            <IconButton icon={ChevronRight} label="Next testimonials" onClick={() => go(1)} aria-controls="testimonial-track" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials — use the left and right arrow keys to browse"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="-my-3 overflow-hidden py-3 focus-visible:outline-offset-4"
          >
            <motion.ul
              id="testimonial-track"
              className="flex cursor-grab touch-pan-y active:cursor-grabbing"
              style={{ x, gap: GAP }}
              drag={maxIndex > 0 ? 'x' : false}
              dragConstraints={{ left: -maxIndex * step - 40, right: 40 }}
              dragElastic={0.15}
              dragMomentum={false}
              onDragEnd={onDragEnd}
            >
              {testimonials.map((t, i) => {
                const visible = i >= index && i < index + perView;
                return (
                  <li
                    key={t.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${testimonials.length}`}
                    aria-hidden={!visible}
                    className={cn('shrink-0 transition-opacity duration-300 select-none', !visible && 'opacity-40')}
                    style={{ width: cardWidth || `calc((100% - ${GAP * (perView - 1)}px) / ${perView})` }}
                  >
                    <TestimonialCard testimonial={t} />
                  </li>
                );
              })}
            </motion.ul>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-current={i === index ? 'true' : undefined}
                aria-label={`Show testimonials starting at ${i + 1}`}
                onClick={() => setIndex(i)}
                className="group inline-flex size-6 items-center justify-center"
              >
                <span
                  className={cn(
                    'block h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-6 bg-primary-600' : 'w-2 bg-line group-hover:bg-primary/50',
                  )}
                />
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing testimonials {first}
            {last > first ? ` to ${last}` : ''} of {testimonials.length}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
