import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { dialogPop, overlayFade } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Visually hide the title (it stays available to screen readers). */
  hideTitle?: boolean;
  description?: string;
  children: ReactNode;
  size?: 'md' | 'lg' | 'xl';
  /** Dark, edge-to-edge surface (used for video). */
  tone?: 'light' | 'dark';
  /** Align to top (search) instead of centre. */
  position?: 'center' | 'top';
}

const widths = { md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' } as const;

/** Accessible dialog: focus trap, Escape to close, scroll lock, focus restore. */
export function Modal(props: ModalProps) {
  return createPortal(
    <AnimatePresence>{props.open && <ModalSurface key="modal" {...props} />}</AnimatePresence>,
    document.body,
  );
}

function ModalSurface({
  onClose,
  title,
  hideTitle,
  description,
  children,
  size = 'md',
  tone = 'light',
  position = 'center',
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  useLockBodyScroll(true);
  useFocusTrap(ref, true, onClose);

  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain p-3 sm:p-6',
        position === 'center' ? 'items-center' : 'items-start pt-[10vh]',
      )}
    >
      <motion.div
        className="fixed inset-0 bg-navy-900/70 backdrop-blur-sm"
        variants={overlayFade}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        variants={dialogPop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          'relative w-full rounded-2xl shadow-float outline-none',
          widths[size],
          dark ? 'bg-navy-900 text-white' : 'bg-white',
        )}
      >
        <div className={cn('flex items-start justify-between gap-4 px-5 pt-5 sm:px-7 sm:pt-6', hideTitle && 'sr-only')}>
          <div className="min-w-0">
            <h2 id={titleId} className={cn('text-xl sm:text-2xl', dark && 'text-white')}>
              {title}
            </h2>
            {description && (
              <p id={descId} className={cn('mt-1 text-sm', dark ? 'text-white/75' : 'text-body')}>
                {description}
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className={cn(
            'absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full transition-colors',
            dark ? 'bg-white/10 text-white hover:bg-white/20' : 'text-navy hover:bg-muted',
          )}
        >
          <X aria-hidden className="size-5" />
        </button>
        <div
          className={cn(
            dark ? 'p-3 sm:p-5' : 'px-5 pt-4 pb-6 sm:px-7 sm:pb-7',
            dark && hideTitle && 'pt-16 sm:pt-16',
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
