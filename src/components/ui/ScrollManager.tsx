import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { scrollToId } from '@/lib/utils';

/**
 * Route-change scroll behaviour:
 * - "/page#id" scrolls to that element once it has rendered;
 * - a plain route change scrolls to the top.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const lastPath = useRef(pathname);

  useEffect(() => {
    const changedPage = lastPath.current !== pathname;
    lastPath.current = pathname;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      let raf = 0;
      const attempt = () => {
        if (scrollToId(id, changedPage ? 'auto' : 'smooth')) return;
        if (tries++ < 30) raf = window.requestAnimationFrame(attempt);
      };
      attempt();
      return () => window.cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash, key]);

  return null;
}
