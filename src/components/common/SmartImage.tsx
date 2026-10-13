import { Sun } from 'lucide-react';
import { useState } from 'react';
import type { ImageAsset } from '@/types';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  image: ImageAsset;
  /** `sizes` attribute for responsive selection. */
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  className?: string;
}

/**
 * <img> with explicit dimensions (no layout shift), lazy loading by default,
 * and a branded placeholder if the source can't be loaded.
 */
export function SmartImage({ image, sizes, priority = false, className }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={image.alt ? 'img' : undefined}
        aria-label={image.alt || undefined}
        aria-hidden={image.alt ? undefined : true}
        className={cn(
          'flex items-center justify-center bg-[linear-gradient(135deg,#0f2a3b_0%,#1d4f6e_45%,#4baf24_120%)]',
          className,
        )}
      >
        <Sun aria-hidden className="size-10 text-sun/80" strokeWidth={1.6} />
      </div>
    );
  }

  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={cn('bg-navy-800/10', className)}
    />
  );
}
