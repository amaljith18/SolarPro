import { createContext, useContext } from 'react';
import type { PropertyType } from '@/types';

export interface UIContextValue {
  /** Open the quote form, optionally pre-selecting a property type. */
  openQuote: (propertyType?: PropertyType) => void;
  openVideo: () => void;
  openSearch: () => void;
}

export const UIContext = createContext<UIContextValue | null>(null);

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>');
  return ctx;
}
