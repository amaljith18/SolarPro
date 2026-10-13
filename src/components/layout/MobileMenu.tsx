import { ArrowRight, Mail, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { RefObject } from 'react';
import { useUI } from '@/app/providers/ui-context';
import { Button } from '@/components/common/Button';
import { mainNav } from '@/data/navigation';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { easeOut } from '@/lib/animations';
import { COMPANY } from '@/lib/constants';
import type { NavItem } from '@/types';
import { NavLinkItem } from './NavLinkItem';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isActive: (item: NavItem) => boolean;
  /** Element to trap focus in — the whole header, so the menu toggle stays reachable. */
  trapRef: RefObject<HTMLElement | null>;
}

export function MobileMenu(props: MobileMenuProps) {
  return <AnimatePresence>{props.open && <Panel key="menu" {...props} />}</AnimatePresence>;
}

function Panel({ onClose, isActive, trapRef }: MobileMenuProps) {
  const { openQuote } = useUI();
  useLockBodyScroll(true);
  // Trap focus inside the header (menu panel + its toggle) and close on Escape.
  useFocusTrap(trapRef, true, onClose);

  return (
    <>
      <motion.div
        aria-hidden
        onClick={onClose}
        className="fixed inset-x-0 top-16 bottom-0 z-40 bg-navy-900/50 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        id="mobile-menu"
        data-autofocus
        tabIndex={-1}
        className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] origin-top overflow-y-auto border-t border-line bg-white shadow-float lg:hidden"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } }}
        exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      >
        <nav aria-label="Mobile" className="mx-auto w-full max-w-7xl px-4 pt-3 pb-6 sm:px-6">
          <motion.ul
            className="flex flex-col gap-1"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
          >
            {mainNav.map((item) => (
              <motion.li
                key={item.label}
                variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              >
                <NavLinkItem item={item} variant="mobile" active={isActive(item)} onNavigate={onClose} />
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5">
            <Button
              icon={ArrowRight}
              className="w-full"
              onClick={() => {
                onClose();
                openQuote();
              }}
            >
              Get a Free Quote
            </Button>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`} className="flex min-h-11 items-center gap-2.5 text-navy">
                <Phone aria-hidden className="size-4 text-primary-700" /> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex min-h-11 items-center gap-2.5 text-navy">
                <Mail aria-hidden className="size-4 text-primary-700" /> {COMPANY.email}
              </a>
            </div>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
