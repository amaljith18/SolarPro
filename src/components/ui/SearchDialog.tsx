import { ArrowRight, Search } from 'lucide-react';
import { useId, useMemo, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { searchSite } from '@/data/search';
import { cn } from '@/lib/utils';
import { Modal } from './Modal';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = ['Residential', 'Battery', 'Texas', 'Maintenance'];

/** Accessible combobox search over services, projects, articles and sections. */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Search SolarPro" hideTitle size="lg" position="top">
      <SearchBody onClose={onClose} />
    </Modal>
  );
}

function SearchBody({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const listId = useId();
  const results = useMemo(() => searchSite(query), [query]);

  const go = (to: string) => {
    onClose();
    void navigate(to);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[active];
      if (item) go(item.to);
    }
  };

  return (
    <div className="pt-8">
      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-body/70" />
        <input
          data-autofocus
          type="search"
          role="combobox"
          aria-label="Search the site"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search services, projects, articles…"
          className="h-14 w-full rounded-2xl border border-line bg-muted pr-4 pl-12 text-base text-navy placeholder:text-body/60 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15 focus:outline-none"
        />
      </div>

      <ul id={listId} role="listbox" aria-label="Search results" className="mt-3 max-h-[50vh] overflow-y-auto">
        {results.map((r, i) => (
          <li
            key={r.id}
            id={`${listId}-${r.id}`}
            role="option"
            aria-selected={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(r.to)}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors',
              i === active ? 'bg-primary-50' : 'hover:bg-muted',
            )}
          >
            <span className="w-16 shrink-0 rounded-full bg-white px-2 py-1 text-center text-[0.6875rem] font-semibold text-primary-700 ring-1 ring-primary-100">
              {r.kind}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-navy">{r.title}</span>
              <span className="block truncate text-xs">{r.description}</span>
            </span>
            <ArrowRight aria-hidden className="size-4 shrink-0 text-primary-700" />
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="text-sm">
        {query.trim() && results.length === 0 && (
          <p className="px-1 py-4">
            No results for “<span className="font-medium text-navy">{query}</span>”. Try a service or location.
          </p>
        )}
        {!query.trim() && (
          <div className="flex flex-wrap items-center gap-2 px-1 pt-2 pb-1">
            <span className="text-xs">Try:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-navy hover:border-primary hover:text-primary-700"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
