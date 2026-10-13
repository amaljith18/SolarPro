import type { SearchItem } from '@/types';
import { SECTION_IDS } from '@/lib/constants';
import { blogPosts } from './blog';
import { projects } from './projects';
import { services } from './services';

/** Everything the site search can find, built from the same data the UI renders. */
export const searchIndex: SearchItem[] = [
  { id: 'sec-about', kind: 'Section', title: 'About SolarPro', description: '10+ years of solar excellence', to: `/#${SECTION_IDS.about}` },
  { id: 'sec-services', kind: 'Section', title: 'Our Services', description: 'Complete solar solutions', to: `/#${SECTION_IDS.services}` },
  { id: 'sec-how', kind: 'Section', title: 'How It Works', description: 'Get started in 4 simple steps', to: `/#${SECTION_IDS.howItWorks}` },
  { id: 'sec-testimonials', kind: 'Section', title: 'Testimonials', description: 'What our customers say', to: `/#${SECTION_IDS.testimonials}` },
  { id: 'sec-contact', kind: 'Section', title: 'Contact Us', description: 'Address, phone and email', to: `/#${SECTION_IDS.contact}` },
  { id: 'page-projects', kind: 'Page', title: 'All Projects', description: 'Browse every installation', to: '/projects' },
  { id: 'page-blog', kind: 'Page', title: 'Blog', description: 'Solar guides and news', to: '/blog' },
  ...services.map<SearchItem>((s) => ({
    id: `svc-${s.slug}`,
    kind: 'Service',
    title: s.title,
    description: s.shortDescription,
    to: `/services/${s.slug}`,
  })),
  ...projects.map<SearchItem>((p) => ({
    id: `prj-${p.id}`,
    kind: 'Project',
    title: p.title,
    description: `${p.location} · ${p.capacity}`,
    to: `/projects#${p.id}`,
  })),
  ...blogPosts.map<SearchItem>((b) => ({
    id: `blog-${b.slug}`,
    kind: 'Article',
    title: b.title,
    description: b.excerpt,
    to: `/blog#${b.slug}`,
  })),
];

export function searchSite(query: string, limit = 8): SearchItem[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return searchIndex
    .map((item) => {
      const title = item.title.toLowerCase();
      const hay = `${title} ${item.description.toLowerCase()} ${item.kind.toLowerCase()}`;
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = terms.reduce((acc, t) => acc + (title.startsWith(t) ? 3 : title.includes(t) ? 2 : 1), 0);
      return { item, score };
    })
    .filter((r): r is { item: SearchItem; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
