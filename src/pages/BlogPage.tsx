import { Calendar, ChevronDown, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { Seo } from '@/components/common/Seo';
import { SmartImage } from '@/components/common/SmartImage';
import { blogPosts } from '@/data/blog';
import { easeOut } from '@/lib/animations';
import { cn, formatDate } from '@/lib/utils';

export function BlogPage() {
  const { hash } = useLocation();
  const [open, setOpen] = useState<string | null>(null);

  // Opening /blog#slug (e.g. from search) expands that article.
  useEffect(() => {
    const slug = hash.slice(1);
    if (blogPosts.some((p) => p.slug === slug)) setOpen(slug);
  }, [hash]);

  return (
    <>
      <Seo title="Blog" description="Solar guides, savings explainers and news from the SolarPro team." />
      <PageHeader
        eyebrow="Blog"
        title="Solar Insights & Guides"
        description="Straightforward answers about savings, storage and going solar — written by our engineers."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
      />

      <section className="section-y">
        <Container>
          <StaggerContainer className="mx-auto grid max-w-3xl gap-8">
            {blogPosts.map((post) => {
              const expanded = open === post.slug;
              const bodyId = `${post.slug}-body`;
              return (
                <StaggerItem
                  key={post.slug}
                  as="article"
                  className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy/5"
                >
                  <div id={post.slug} className="grid scroll-mt-28 sm:grid-cols-[14rem_1fr]">
                    <div className="aspect-[16/9] sm:aspect-auto">
                      <SmartImage image={post.image} sizes="(min-width:640px) 224px, 92vw" className="size-full object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-col p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar aria-hidden className="size-3.5 text-primary-700" />
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock aria-hidden className="size-3.5 text-primary-700" />
                          {post.readMinutes} min read
                        </span>
                      </div>
                      <h2 className="mt-3 text-lg sm:text-xl">{post.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed">{post.excerpt}</p>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={bodyId}
                        onClick={() => setOpen(expanded ? null : post.slug)}
                        className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-primary-700"
                      >
                        {expanded ? 'Close article' : 'Read article'}
                        <ChevronDown aria-hidden className={cn('size-4 transition-transform', expanded && 'rotate-180')} />
                      </button>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={bodyId}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        className="flex flex-col gap-4 border-t border-line px-5 py-6 text-[0.9375rem] leading-relaxed sm:px-8"
                      >
                        {post.body.map((para) => (
                          <p key={para.slice(0, 32)}>{para}</p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
