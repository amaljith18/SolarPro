import { Seo } from '@/components/common/Seo';
import { About } from '@/sections/About/About';
import { CTA } from '@/sections/CTA/CTA';
import { Hero } from '@/sections/Hero/Hero';
import { HowItWorks } from '@/sections/HowItWorks/HowItWorks';
import { Projects } from '@/sections/Projects/Projects';
import { Services } from '@/sections/Services/Services';
import { Testimonials } from '@/sections/Testimonials/Testimonials';

export function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Projects />
      <Testimonials />
      <CTA />
    </>
  );
}
