import { Building2, House, Settings, Wrench } from 'lucide-react';
import type { Service } from '@/types';
import { images } from './images';

export const services: Service[] = [
  {
    slug: 'residential-solar',
    title: 'Residential Solar',
    shortDescription: 'Save on electricity bills and power your home with clean energy.',
    description:
      'A rooftop system designed around your home, your roof and the way your family uses energy. We handle the design, permits, installation and utility interconnection so you can start saving from the first sunny day.',
    features: [
      'Custom roof layout and shading analysis',
      'Tier-1 panels with 25-year performance warranty',
      'Optional battery storage for backup power',
      'Real-time production monitoring app',
    ],
    icon: House,
    image: images.residential,
    propertyType: 'residential',
  },
  {
    slug: 'commercial-solar',
    title: 'Commercial Solar',
    shortDescription: 'Reliable and scalable solar solutions for businesses of all sizes.',
    description:
      'Cut operating costs and hit sustainability targets with rooftop, carport or ground-mount systems sized for your business. We model your load profile and tariffs to maximise return on investment.',
    features: [
      'Detailed ROI and payback modelling',
      'Rooftop, carport and ground-mount options',
      'Minimal disruption to daily operations',
      'Support with incentives and tax credits',
    ],
    icon: Building2,
    image: images.commercial,
    propertyType: 'commercial',
  },
  {
    slug: 'industrial-solar',
    title: 'Industrial Solar',
    shortDescription: 'High-performance systems to meet large energy demands.',
    description:
      'Utility-grade engineering for factories, warehouses and processing plants. Our systems are built for high, continuous loads, with grid-tied and hybrid configurations that keep production running.',
    features: [
      'Megawatt-scale design and engineering',
      'Grid-tied, hybrid and storage configurations',
      'Power-quality and load-management integration',
      'Dedicated project manager from start to finish',
    ],
    icon: Settings,
    image: images.industrial,
    propertyType: 'industrial',
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    shortDescription: 'Keep your solar system running at peak performance.',
    description:
      'Scheduled inspections, panel cleaning, inverter servicing and fast fault response — for systems we installed and those we didn’t. Healthy systems produce more energy for longer.',
    features: [
      'Annual inspection and performance report',
      'Professional panel cleaning',
      'Inverter and electrical diagnostics',
      'Priority repair response',
    ],
    icon: Wrench,
    image: images.maintenance,
    propertyType: 'maintenance',
  },
];

export function getServiceBySlug(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}
