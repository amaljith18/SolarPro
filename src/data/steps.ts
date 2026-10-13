import { FileText, Leaf, MessagesSquare, Settings } from 'lucide-react';
import type { Step } from '@/types';

export const steps: Step[] = [
  {
    number: 1,
    title: 'Free Consultation',
    description: 'We assess your energy needs and provide expert advice.',
    icon: MessagesSquare,
  },
  {
    number: 2,
    title: 'Custom Design',
    description: 'We design a solar solution tailored to your property and budget.',
    icon: FileText,
  },
  {
    number: 3,
    title: 'Professional Installation',
    description: 'Our certified team ensures a safe and efficient installation.',
    icon: Settings,
  },
  {
    number: 4,
    title: 'Enjoy Clean Energy',
    description: 'Start saving and contributing to a greener planet.',
    icon: Leaf,
  },
];
