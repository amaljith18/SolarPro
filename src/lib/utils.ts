/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Smoothly scroll to an element id; returns false when it doesn't exist. */
export function scrollToId(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : behavior, block: 'start' });
  return true;
}

/** Build an Unsplash CDN image with a responsive srcset. */
export function unsplash(
  id: string,
  alt: string,
  width: number,
  height: number,
  widths: number[] = [480, 800, 1200],
): { src: string; srcSet: string; alt: string; width: number; height: number } {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`;
  const ratio = height / width;
  const url = (w: number) => `${base}&w=${w}&h=${Math.round(w * ratio)}`;
  return {
    src: url(width),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(', '),
    alt,
    width,
    height,
  };
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
