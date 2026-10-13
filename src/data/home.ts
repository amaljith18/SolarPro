import { Leaf, ShieldCheck, Zap } from 'lucide-react';
import { Co2CloudIcon } from '@/assets/icons';
import type { Benefit, Statistic } from '@/types';

export const heroBenefits: Benefit[] = [
  { title: 'Lower\nElectricity Bills', icon: Leaf, tone: 'text-primary' },
  { title: 'Reduce\nCarbon Footprint', icon: Co2CloudIcon, tone: 'text-white' },
  { title: 'Clean &\nRenewable Energy', icon: Zap, tone: 'text-sun' },
  { title: 'Long-Term\nInvestment', icon: ShieldCheck, tone: 'text-white' },
];

export const aboutStats: Statistic[] = [
  { value: '10+', label: 'Years of Experience' },
  { value: '5,000+', label: 'Happy Customers' },
  { value: '50+', label: 'Projects Completed' },
];

export const aboutValues: Array<{ title: string; text: string }> = [
  {
    title: 'Honest advice',
    text: 'We size every system to your real usage — never bigger than you need.',
  },
  {
    title: 'Certified installers',
    text: 'Our own NABCEP-certified crews install every system; we don’t subcontract.',
  },
  {
    title: 'Lifetime support',
    text: 'Monitoring, maintenance and warranty service for as long as you own the system.',
  },
];
