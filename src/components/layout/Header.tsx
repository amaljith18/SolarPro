import { ArrowRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useUI } from '@/app/providers/ui-context';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { IconButton } from '@/components/common/IconButton';
import { Logo } from '@/components/common/Logo';
import { mainNav } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrolledPast } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';
import { MobileMenu } from './MobileMenu';
import { NavLinkItem } from './NavLinkItem';

const sectionIds = mainNav.flatMap((n) => (n.sectionId ? [n.sectionId] : []));

export function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const scrolled = useScrolledPast(8);
  const activeSection = useActiveSection(sectionIds, onHome);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { openQuote, openSearch } = useUI();

  // Close the mobile menu when switching to desktop or changing route.
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (item: NavItem) =>
    item.sectionId ? onHome && activeSection === item.sectionId : Boolean(item.to && pathname.startsWith(item.to));

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-300',
        scrolled || menuOpen ? 'shadow-[0_6px_24px_-12px_rgb(12_27_42/0.25)]' : 'shadow-none',
      )}
    >
      <a
        href="#main"
        data-focus-skip
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo onClick={() => setMenuOpen(false)} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-10">
            {mainNav.map((item) => (
              <li key={item.label}>
                <NavLinkItem item={item} active={isActive(item)} variant="desktop" />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <IconButton icon={Search} label="Search the site" onClick={openSearch} />
          <div className="hidden sm:block">
            <Button size="sm" icon={ArrowRight} onClick={() => openQuote()}>
              Get a Quote
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-muted lg:hidden"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen && !isDesktop} onClose={() => setMenuOpen(false)} isActive={isActive} trapRef={headerRef} />
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const line = 'absolute left-0 h-0.5 w-6 rounded-full bg-current';
  const t = { type: 'spring', stiffness: 400, damping: 30 } as const;
  return (
    <span aria-hidden className="relative block h-4 w-6">
      <motion.span className={cn(line, 'top-0')} animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }} transition={t} />
      <motion.span className={cn(line, 'top-[7px]')} animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.4 : 1 }} transition={t} />
      <motion.span className={cn(line, 'top-[14px]')} animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }} transition={t} />
    </span>
  );
}
