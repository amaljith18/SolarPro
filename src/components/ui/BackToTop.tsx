import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useScrolledPast } from '@/hooks/useScrollPosition';

export function BackToTop() {
  const visible = useScrolledPast(700);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
          }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-float hover:bg-primary-700 sm:right-6 sm:bottom-6"
        >
          <ArrowUp aria-hidden className="size-5" strokeWidth={2.4} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
