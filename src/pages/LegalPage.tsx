import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { Seo } from '@/components/common/Seo';
import type { LegalDoc } from '@/data/legal';
import { formatDate } from '@/lib/utils';

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Seo title={doc.title} />
      <PageHeader
        eyebrow="Legal"
        title={doc.title}
        description={`Last updated ${formatDate(doc.updated)}`}
        crumbs={[{ label: 'Home', to: '/' }, { label: doc.title }]}
      />
      <section className="section-y">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-8">
            {doc.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl">{s.heading}</h2>
                <p className="mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
