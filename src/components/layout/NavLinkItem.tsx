import { motion } from 'motion/react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router';
import { useSectionNav } from '@/hooks/useSectionNav';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

interface NavLinkItemProps {
  item: NavItem;
  active: boolean;
  variant: 'desktop' | 'mobile' | 'footer';
  onNavigate?: () => void;
}

/** A nav entry that smooth-scrolls to a home section or routes to a page. */
export function NavLinkItem({ item, active, variant, onNavigate }: NavLinkItemProps) {
  const goToSection = useSectionNav();

  const className = cn(
    variant === 'desktop' && 'relative inline-flex h-11 items-center px-1 text-[0.875rem] font-medium transition-colors',
    variant === 'mobile' && 'flex min-h-12 w-full items-center rounded-xl px-4 text-lg font-semibold transition-colors',
    variant === 'footer' && 'inline-flex min-h-8 items-center text-sm text-white/75 transition-colors hover:text-primary',
    variant === 'desktop' && (active ? 'text-primary-700' : 'text-navy hover:text-primary-700'),
    variant === 'mobile' && (active ? 'bg-primary-50 text-primary-700' : 'text-navy hover:bg-muted'),
  );

  const indicator =
    variant === 'desktop' && active ? (
      <motion.span
        layoutId="nav-indicator"
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary"
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      />
    ) : null;

  if (item.sectionId) {
    const id = item.sectionId;
    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      onNavigate?.();
      goToSection(id);
    };
    return (
      <a href={id === 'home' ? '/' : `/#${id}`} onClick={onClick} aria-current={active && variant !== 'footer' ? 'page' : undefined} className={className}>
        {item.label}
        {indicator}
      </a>
    );
  }

  return (
    <Link to={item.to ?? '/'} onClick={onNavigate} aria-current={active ? 'page' : undefined} className={className}>
      {item.label}
      {indicator}
    </Link>
  );
}
