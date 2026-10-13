import { Clapperboard } from 'lucide-react';
import { CONFIG } from '@/lib/constants';
import { Modal } from './Modal';
import { useUI } from '@/app/providers/ui-context';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

function isEmbed(url: string) {
  return /youtube(-nocookie)?\.com\/embed\/|player\.vimeo\.com\/video\//.test(url);
}

/** Plays VITE_HERO_VIDEO_URL (YouTube/Vimeo embed or video file); honest fallback when unset. */
export function VideoModal({ open, onClose }: VideoModalProps) {
  const { openQuote } = useUI();
  const url = CONFIG.heroVideoUrl;

  return (
    <Modal open={open} onClose={onClose} title="How SolarPro works" hideTitle={Boolean(url)} size="xl" tone="dark">
      {url ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          {isEmbed(url) ? (
            <iframe
              src={`${url}${url.includes('?') ? '&' : '?'}autoplay=1&rel=0`}
              title="SolarPro introduction video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="size-full border-0"
            />
          ) : (
            <video src={url} controls autoPlay playsInline className="size-full">
              Your browser doesn’t support embedded video.
            </video>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 px-4 pt-2 pb-8 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/10 text-primary">
            <Clapperboard aria-hidden className="size-8" />
          </span>
          <p className="max-w-md text-sm leading-relaxed text-white/80">
            Our introduction video is coming soon. In the meantime, a solar specialist can walk you through the
            process — from consultation to switch-on — in a free call.
          </p>
          <button
            type="button"
            onClick={() => openQuote()}
            className="inline-flex h-11 items-center rounded-full bg-primary-600 px-6 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Book a Free Consultation
          </button>
        </div>
      )}
    </Modal>
  );
}
