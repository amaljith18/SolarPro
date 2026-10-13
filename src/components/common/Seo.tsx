import { useEffect } from 'react';
import { COMPANY } from '@/lib/constants';

interface SeoProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = `${COMPANY.name} — Residential, Commercial & Industrial Solar Energy`;

function setMeta(selector: string, content: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

/**
 * Per-page title + description. Updates the tags already present in index.html
 * (so crawlers without JS still get sensible defaults and nothing is duplicated).
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const full = title ? `${title} | ${COMPANY.name}` : DEFAULT_TITLE;
    const initialDescription =
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.dataset.default ??
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ??
      '';
    const descMeta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descMeta && !descMeta.dataset.default) descMeta.dataset.default = initialDescription;

    document.title = full;
    setMeta('meta[property="og:title"]', full);
    setMeta('meta[name="description"]', description ?? initialDescription);
    setMeta('meta[property="og:description"]', description ?? initialDescription);
  }, [title, description]);

  return null;
}
