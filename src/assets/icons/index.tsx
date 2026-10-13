import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const;

/** Cloud with "CO₂" — Lucide has no CO2 glyph, so this matches its stroke style. */
export function Co2CloudIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 18.5h10.2a4.3 4.3 0 0 0 .5-8.57A5.8 5.8 0 0 0 6.6 9.1 4.7 4.7 0 0 0 7 18.5Z" />
      <text
        x="11.6"
        y="15.6"
        textAnchor="middle"
        fontSize="5.4"
        fontWeight="700"
        fontFamily="Poppins, system-ui, sans-serif"
        fill="currentColor"
        stroke="none"
      >
        CO
        <tspan fontSize="3.2" dy="1">2</tspan>
      </text>
    </svg>
  );
}

/* Brand icons (Lucide removed brand glyphs, so we ship simple, recognisable marks). */

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M6.9 8.8H3.8V20h3.1V8.8ZM5.35 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM20.2 13.6c0-3-1.6-5-4.4-5a3.8 3.8 0 0 0-3.3 1.8V8.8H9.5V20h3.1v-5.8c0-1.5.6-2.7 2.1-2.7s1.9 1.2 1.9 2.8V20h3.1l.5-6.4Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.8" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}
