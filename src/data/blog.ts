import type { BlogPost } from '@/types';
import { images } from './images';

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-much-can-solar-save',
    title: 'How Much Can Solar Really Save Your Household?',
    excerpt: 'Payback periods, net metering and what actually drives the numbers on your electricity bill.',
    date: '2024-09-12',
    readMinutes: 5,
    image: images.residential,
    body: [
      'Your savings depend on three things: how much electricity you use, how much sunshine your roof receives, and what your utility charges per kilowatt-hour. A well-designed system offsets the most expensive part of your bill first.',
      'Most homeowners we work with see payback periods between six and ten years. After that, the electricity your system produces is essentially free for the remaining decades of its life.',
      'Net metering programs credit you for surplus energy sent to the grid during the day. Where those programs are less generous, adding battery storage lets you use more of your own solar power in the evening.',
      'The best first step is a free consultation: we review twelve months of bills and model your savings before you commit to anything.',
    ],
  },
  {
    slug: 'battery-storage-explained',
    title: 'Battery Storage Explained: Do You Need One?',
    excerpt: 'When a home battery pays off, when it doesn’t, and how backup power actually works.',
    date: '2024-08-02',
    readMinutes: 4,
    image: images.maintenance,
    body: [
      'A home battery stores surplus solar energy so you can use it after sunset or during a grid outage. It is the single biggest upgrade for energy independence.',
      'Batteries make the most financial sense where utilities charge more in the evening, or where net-metering credits are low. If outages are common in your area, the backup value alone can justify one.',
      'Systems can be designed “battery-ready” today, so adding storage later is simple and inexpensive.',
    ],
  },
  {
    slug: 'commercial-solar-checklist',
    title: 'A Business Owner’s Checklist for Going Solar',
    excerpt: 'Roof condition, demand charges, incentives and the questions to ask any installer.',
    date: '2024-06-18',
    readMinutes: 6,
    image: images.commercial,
    body: [
      'Start with your roof: if it needs replacing within ten years, do it before installing solar. Our team can inspect it during the site survey.',
      'Look beyond energy charges. Many businesses pay significant demand charges; solar combined with storage can reduce those peaks.',
      'Federal tax credits and accelerated depreciation can dramatically shorten payback. We prepare the documentation your accountant needs.',
      'Finally, ask any installer who performs the work, how production is guaranteed, and what support looks like after commissioning.',
    ],
  },
];
