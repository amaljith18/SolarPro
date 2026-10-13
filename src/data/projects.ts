import type { Project, ProjectCategory } from '@/types';
import { images } from './images';

export const projects: Project[] = [
  {
    id: 'residential-new-york',
    title: 'Residential Project',
    category: 'residential',
    location: 'New York, USA',
    capacity: '12.4 kW',
    year: 2024,
    summary: 'A 32-panel rooftop array with battery backup that covers 95% of the household’s annual usage.',
    image: images.projectResidential,
    featured: true,
  },
  {
    id: 'commercial-california',
    title: 'Commercial Project',
    category: 'commercial',
    location: 'California, USA',
    capacity: '480 kW',
    year: 2024,
    summary: 'A flat-roof installation for a logistics office, cutting daytime grid demand by more than half.',
    image: images.projectCommercial,
    featured: true,
  },
  {
    id: 'industrial-texas',
    title: 'Industrial Project',
    category: 'industrial',
    location: 'Texas, USA',
    capacity: '2.1 MW',
    year: 2023,
    summary: 'A ground-mounted solar field powering a manufacturing plant’s daytime production lines.',
    image: images.projectIndustrial,
    featured: true,
  },
  {
    id: 'residential-arizona',
    title: 'Family Home Retrofit',
    category: 'residential',
    location: 'Phoenix, Arizona',
    capacity: '9.8 kW',
    year: 2023,
    summary: 'A high-efficiency system designed around a complex hip roof with minimal shading losses.',
    image: images.residential,
    featured: false,
  },
  {
    id: 'commercial-colorado',
    title: 'Office Campus Rooftop',
    category: 'commercial',
    location: 'Denver, Colorado',
    capacity: '310 kW',
    year: 2022,
    summary: 'Three connected rooftops with unified monitoring for a regional headquarters.',
    image: images.commercial,
    featured: false,
  },
  {
    id: 'industrial-nevada',
    title: 'Distribution Center',
    category: 'industrial',
    location: 'Reno, Nevada',
    capacity: '1.4 MW',
    year: 2022,
    summary: 'Hybrid solar and storage that shaves peak demand charges for a 24/7 distribution hub.',
    image: images.industrial,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories: Array<{ value: ProjectCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
];
