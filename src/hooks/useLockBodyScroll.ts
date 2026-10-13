import { useEffect } from 'react';

let locks = 0;

/** Prevents background scrolling while `locked` is true (supports nesting). */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { body, documentElement } = document;
    if (locks === 0) {
      const scrollbar = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = 'hidden';
      // Avoid a layout jump when the scrollbar disappears.
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) {
        body.style.overflow = '';
        body.style.paddingRight = '';
      }
    };
  }, [locked]);
}
