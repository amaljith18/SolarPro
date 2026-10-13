/** Company-level configuration. Edit here instead of inside components. */
export const COMPANY = {
  name: 'SolarPro',
  tagline: 'Clean energy for a brighter tomorrow',
  description:
    'Powering homes and businesses with clean, renewable, and affordable solar energy for a sustainable future.',
  address: { line1: '123 Green Energy Drive', line2: 'San Diego, CA 92101' },
  phone: '+1 (123) 456-7890',
  email: 'info@solarpro.com',
  foundedYear: 2014,
} as const;

/** Social profile URLs — replace with your real accounts. */
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/',
  linkedin: 'https://www.linkedin.com/',
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/',
} as const;

/**
 * Runtime configuration from Vite env vars (see .env.example).
 * Empty strings mean "not configured" — the UI shows an honest fallback.
 */
export const CONFIG = {
  quoteEndpoint: (import.meta.env.VITE_QUOTE_ENDPOINT ?? '').trim(),
  heroVideoUrl: (import.meta.env.VITE_HERO_VIDEO_URL ?? '').trim(),
} as const;

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  services: 'services',
  howItWorks: 'how-it-works',
  projects: 'projects',
  testimonials: 'testimonials',
  contact: 'contact',
} as const;
