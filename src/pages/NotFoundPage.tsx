import { ArrowLeft, SunDim } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { Seo } from '@/components/common/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="section-y bg-primary-50">
        <Container className="flex flex-col items-center py-10 text-center">
          <SunDim aria-hidden className="size-16 text-primary" strokeWidth={1.4} />
          <p className="eyebrow mt-6 text-primary-700">Error 404</p>
          <h1 className="mt-3 text-h2">This page is out of the sun</h1>
          <p className="mt-4 max-w-md">The page you’re looking for doesn’t exist or has moved.</p>
          <div className="mt-8">
            <Button to="/" icon={ArrowLeft} nudgeIcon={false}>
              Back to home
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
