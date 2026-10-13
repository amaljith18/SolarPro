import type { NavItem } from '@/types';
import { SECTION_IDS } from '@/lib/constants';

export const mainNav: NavItem[] = [
  { label: 'Home', sectionId: SECTION_IDS.home },
  { label: 'About', sectionId: SECTION_IDS.about },
  { label: 'Services', sectionId: SECTION_IDS.services },
  { label: 'Projects', sectionId: SECTION_IDS.projects },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', sectionId: SECTION_IDS.contact },
];

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];
