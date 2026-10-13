import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/assets/icons';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { legalNav, mainNav } from '@/data/navigation';
import { services } from '@/data/services';
import { COMPANY, SECTION_IDS, SOCIAL_LINKS } from '@/lib/constants';
import { NavLinkItem } from './NavLinkItem';

const socials = [
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, icon: FacebookIcon },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, icon: InstagramIcon },
  { label: 'YouTube', href: SOCIAL_LINKS.youtube, icon: YoutubeIcon },
];

function FooterHeading({ children, id }: { children: string; id: string }) {
  return (
    <h2 id={id} className="text-[0.9375rem] font-semibold text-white">
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id={SECTION_IDS.contact} className="scroll-mt-16 bg-navy-900 text-white/75">
      <Container className="grid gap-10 pt-14 pb-10 sm:grid-cols-2 sm:pt-16 lg:grid-cols-[1.45fr_1fr_1.1fr_1.25fr] lg:gap-12">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{COMPANY.description}</p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${COMPANY.name} on ${label} (opens in a new tab)`}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-primary-600"
                >
                  <Icon className="size-[1.0625rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-quick" className="min-w-0">
          <FooterHeading id="footer-quick">Quick Links</FooterHeading>
          <ul className="mt-4 flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.label}>
                <NavLinkItem item={item} variant="footer" active={false} />
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services" className="min-w-0">
          <FooterHeading id="footer-services">Our Services</FooterHeading>
          <ul className="mt-4 flex flex-col gap-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="inline-flex min-h-8 items-center text-sm transition-colors hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <FooterHeading id="footer-contact">Contact Us</FooterHeading>
          <address className="mt-4 flex flex-col gap-4 text-sm not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {COMPANY.address.line1}
                <br />
                {COMPANY.address.line2}
              </span>
            </p>
            <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 hover:text-primary">
              <Phone aria-hidden className="size-4 shrink-0 text-primary" />
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex min-w-0 items-center gap-3 break-all hover:text-primary">
              <Mail aria-hidden className="size-4 shrink-0 text-primary" />
              {COMPANY.email}
            </a>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-center text-xs sm:flex-row sm:text-left">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-3">
            {legalNav.map((item, i) => (
              <li key={item.label} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-3 w-px bg-white/30" />}
                <Link to={item.to ?? '/'} className="inline-flex min-h-8 items-center hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
