import { Link } from 'react-router';
import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

/** Sun-over-panel mark + "SolarPro" wordmark, recreated as SVG so it stays crisp. */
export function Logo({ tone = 'dark', className, onClick }: LogoProps) {
  const light = tone === 'light';
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${COMPANY.name} — home`}
      className={cn('inline-flex min-w-0 shrink-0 items-center gap-2.5', className)}
    >
      <svg viewBox="0 0 48 40" className="h-9 w-auto shrink-0 sm:h-10" aria-hidden focusable="false">
        <g stroke="var(--color-sun)" strokeWidth="2.6" strokeLinecap="round">
          <path d="M24 2.5v4.2M11.6 7.6l2.9 2.9M36.4 7.6l-2.9 2.9M5 18h4M39 18h4" />
        </g>
        <circle cx="24" cy="19" r="8" fill="var(--color-sun)" />
        <path d="M6 38 12 24h24l6 14Z" fill={light ? '#1e4a66' : 'var(--color-navy)'} />
        <path d="M6 38 12 24h24l6 14Z" fill="url(#logo-panel)" opacity=".55" />
        <path d="M19 24l-2 14M29 24l2 14M9.4 30.5h29.2" stroke={light ? '#9fd4ff' : '#4d8fc1'} strokeWidth="1.3" />
        <path d="M4 38.8h40" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="logo-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3f8fd6" />
            <stop offset="1" stopColor="#0c1b2a" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn('text-[1.375rem] font-bold tracking-tight sm:text-2xl', light ? 'text-white' : 'text-navy')}>
          Solar<span className="text-primary">Pro</span>
        </span>
        <span
          className={cn(
            'mt-1 hidden truncate text-[0.5rem] font-medium tracking-[0.12em] uppercase sm:block',
            light ? 'text-white/70' : 'text-body/80',
          )}
        >
          {COMPANY.tagline}
        </span>
      </span>
    </Link>
  );
}
