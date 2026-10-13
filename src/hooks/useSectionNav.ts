import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { scrollToId } from '@/lib/utils';

/**
 * Navigate to a home-page section from anywhere.
 * On the home page it smooth-scrolls; elsewhere it routes to "/#id"
 * and <ScrollManager> scrolls once the page has rendered.
 */
export function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id: string) => {
      if (pathname === '/') {
        if (id === 'home') {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        } else {
          scrollToId(id);
        }
      } else {
        void navigate(id === 'home' ? '/' : `/#${id}`);
      }
    },
    [pathname, navigate],
  );
}
