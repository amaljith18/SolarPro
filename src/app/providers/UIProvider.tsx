import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { QuoteModal } from '@/components/ui/QuoteModal';
import { SearchDialog } from '@/components/ui/SearchDialog';
import { VideoModal } from '@/components/ui/VideoModal';
import type { PropertyType } from '@/types';
import { UIContext, type UIContextValue } from './ui-context';

type Dialog = { kind: 'quote'; propertyType?: PropertyType } | { kind: 'video' } | { kind: 'search' } | null;

/** Owns the site-wide dialogs so any component can open them via useUI(). */
export function UIProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const close = useCallback(() => setDialog(null), []);

  const value = useMemo<UIContextValue>(
    () => ({
      openQuote: (propertyType) => setDialog({ kind: 'quote', propertyType }),
      openVideo: () => setDialog({ kind: 'video' }),
      openSearch: () => setDialog({ kind: 'search' }),
    }),
    [],
  );

  return (
    <UIContext.Provider value={value}>
      {children}
      <QuoteModal
        open={dialog?.kind === 'quote'}
        propertyType={dialog?.kind === 'quote' ? dialog.propertyType : undefined}
        onClose={close}
      />
      <VideoModal open={dialog?.kind === 'video'} onClose={close} />
      <SearchDialog open={dialog?.kind === 'search'} onClose={close} />
    </UIContext.Provider>
  );
}
