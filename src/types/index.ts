import type { LucideIcon } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

/** Any icon component we render: Lucide icons or our own SVG icons. */
export type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export interface ImageAsset {
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
}

export interface NavItem {
  label: string;
  /** Section id on the home page (used for scroll-spy + smooth scroll). */
  sectionId?: string;
  /** Route path for items that live on their own page. */
  to?: string;
}

export type PropertyType = 'residential' | 'commercial' | 'industrial' | 'maintenance';

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: IconComponent;
  image: ImageAsset;
  propertyType: PropertyType;
}

export type ProjectCategory = 'residential' | 'commercial' | 'industrial';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  capacity: string;
  year: number;
  summary: string;
  image: ImageAsset;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Optional photo; initials are shown when absent. */
  avatar?: ImageAsset;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: IconComponent;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Benefit {
  /** Use \n to control the line break shown in the hero. */
  title: string;
  icon: IconComponent;
  /** Tailwind text color class for the icon. */
  tone: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  image: ImageAsset;
  body: string[];
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  kind: 'Section' | 'Service' | 'Project' | 'Article' | 'Page';
  to: string;
}
