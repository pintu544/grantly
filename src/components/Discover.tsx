import { Bookmark, BookmarkCheck, Filter, GitCompareArrows, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  CATEGORIES,
  daysUntil,
  evaluate,
  INDIAN_STATES,
  LEVELS,
  SCHOLARSHIPS,
  type Category,
  type Level,
} from '../data/scholarships';
import { useStore } from '../lib/store';
import { Amount, CategoryTag, DeadlineChip, EmptyState, MatchRing } from './ui';

type Sort = 'match' | 'deadline' | 'amount';

export default function Discover({ onOpenDetail }: { onOpenDetail: (id: string) => void }) {
  const { profile, saved, toggleSave, compare, toggleCompare } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | Category>('All');
  const [level, setLevel] = useState<'All' | Level>('All');
  const [state, setState] = useState('All India');
  const [sort, setSort] = useState<Sort>('match');
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SCHOLARSHIPS.map((s) => ({ s, score: evaluate(s, profile).score })).filter(({ s }) => {
      if (q && !`${s.name} ${s.provider} ${s.description} ${s.tags.join(' ')}`.toLowerCase().includes(q)) return false;
      if (category !== 'All' && s.category !== category) return false;
      if (level !== 'All' && !s.levels.includes(level)) return false;
      if (state !== 'All India' && s.state !== 'All India' && s.state !== state) return false;
      if (eligibleOnly && evaluate(s, profile).score < 70) return false;
      return true;
    });
    if (sort === 'match') list.sort((a, b) => b.score - a.score || daysUntil(a.s.deadline) - daysUntil(b.s.deadline));
    if (sort === 'deadline') list.sort((a, b) => daysUntil(a.s.deadline) - daysUntil(b.s.deadline));
    if (sort === 'amount') list.sort((a, b) => b.s.amount - a.s.amount);
    return list;
  }, [query, category, level, state, sort, eligibleOnly, profile]);

  const hasFilters = query !== '' || category !== 'All' || level !== 'All' || state !== 'All India' || eligibleOnly;
  const reset = () => {
    setQuery('');
    setCategory('All');
    setLevel('All');
    setState('All India');
    setEligibleOnly(false);
    setSort('match');
  };

  const filterPanel = (
    <div className="space-y-5">
      <div>
        <label htmlFor="discover-search" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
          Search
        </label>
        <div className="relative mt-2">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#5b6360]" aria-hidden />
          <input
            id="discover-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, provider, keyword…"
            className="w-full rounded-xl border border-[#e5e1d8] bg-white py-2.5 pr-3 pl-9 text-sm text-[#1a1f1c] placeholder:text-[#5b6360] focus:border-[#0c3b2e] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-bold tracking-wide text-[#5b6360] uppercase" id="cat-label">
          Category
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-labelledby="cat-label">
          {(['All', ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                category === c ? 'bg-[#0c3b2e] text-white' : 'border border-[#e5e1d8] bg-white text-[#5b6360] hover:border-[#0c3b2e] hover:text-[#0c3b2e]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="filter-level" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
          Education level
        </label>
        <select
          id="filter-level"
          value={level}
          onChange={(e) => setLevel(e.target.value as 'All' | Level)}
          className="mt-2 w-full rounded-xl border border-[#e5e1d8] bg-white px-3 py-2.5 text-sm text-[#1a1f1c] focus:border-[#0c3b2e] focus:outline-none"
        >
          <option value="All">All levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-state" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
          State
        </label>
        <select
          id="filter-state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[#e5e1d8] bg-white px-3 py-2.5 text-sm text-[#1a1f1c] focus:border-[#0c3b2e] focus:outline-none"
        >
          {INDIAN_STATES.map((st) => (
            <option key={st} value={st}>
              {st === 'All India' ? 'All India (any state)' : st}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-sort" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
          Sort by
        </label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="mt-2 w-full rounded-xl border border-[#e5e1d8] bg-white px-3 py-2.5 text-sm text-[#1a1f1c] focus:border-[#0c3b2e] focus:outline-none"
        >
          <option value="match">Best match first</option>
          <option value="deadline">Closing soonest</option>
          <option value="amount">Highest amount</option>
        </select>
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-[#e5e1d8] bg-white px-3 py-3">
        <input
          type="checkbox"
          checked={eligibleOnly}
          onChange={(e) => setEligibleOnly(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#0c3b2e]"
        />
        <span className="text-sm">
          <span className="block font-semibold text-[#1a1f1c]">Strong matches only</span>
          <span className="block text-xs text-[#5b6360]">Hide scholarships where you meet under 70% of criteria.</span>
        </span>
      </label>

      {hasFilters && (
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b42318] hover:underline"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#1a1f1c]">Discover scholarships</h1>
          <p className="mt-1 text-sm text-[#5b6360]">
            {results.length} of {SCHOLARSHIPS.length} scholarships · ranked for {profile.name.split(' ')[0]}&rsquo;s profile
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-[#e5e1d8] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1f1c] lg:hidden"
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
          {hasFilters && <span className="inline-flex h-2 w-2 rounded-full bg-[#c79a2b]" aria-label="Filters active" />}
        </button>
      </div>

      {filtersOpen && (
        <div className="mt-4 rounded-2xl border border-[#e5e1d8] bg-[#fbfaf6] p-5 lg:hidden">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-[#1a1f1c]">
              <Filter className="h-4 w-4" aria-hidden /> Filters
            </span>
            <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="rounded-full p-1 hover:bg-[#efece2]">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          {filterPanel}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-[#e5e1d8] bg-[#fbfaf6] p-5">{filterPanel}</div>
        </aside>

        <div>
          {compare.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#c79a2b]/40 bg-[#fdf8e7] px-4 py-3">
              <p className="text-sm font-semibold text-[#1a1f1c]">
                {compare.length} selected to compare {compare.length < 3 ? '(pick up to 3)' : '(maximum reached)'}
              </p>
              <span className="text-xs text-[#5b6360]">Use the compare toggle on any card, then open Compare above.</span>
            </div>
          )}

          {results.length === 0 ? (
            <EmptyState
              title="No scholarships match those filters"
              body="Try widening the category or state, or clear the strong-matches-only toggle — some scholarships may still be worth a look."
              action={
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0c3b2e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0a2e24]"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden /> Reset filters
                </button>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map(({ s, score }) => {
                const isSaved = saved.includes(s.id);
                const inCompare = compare.includes(s.id);
                const closed = daysUntil(s.deadline) < 0;
                return (
                  <article
                    key={s.id}
                    className="flex flex-col rounded-2xl border border-[#e5e1d8] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CategoryTag label={s.category} />
                        <h2 className="mt-2.5 font-display text-[17px] leading-snug font-semibold text-[#1a1f1c]">
                          <button type="button" onClick={() => onOpenDetail(s.id)} className="text-left hover:underline">
                            {s.name}
                          </button>
                        </h2>
                        <p className="mt-1 text-[13px] text-[#5b6360]">
                          {s.provider} · {s.state}
                        </p>
                      </div>
                      <MatchRing score={score} />
                    </div>
                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-[#5b6360]">{s.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div>
                        <Amount value={s.amount} className="text-lg text-[#0c3b2e]" />
                        <span className="text-xs text-[#5b6360]"> / year</span>
                      </div>
                      <DeadlineChip deadline={s.deadline} size="sm" />
                    </div>
                    <div className="mt-4 flex items-center gap-2 border-t border-[#f0ede4] pt-4">
                      <button
                        type="button"
                        onClick={() => toggleSave(s.id)}
                        aria-pressed={isSaved}
                        className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-colors ${
                          isSaved ? 'bg-[#e6f2ec] text-[#0c3b2e]' : 'bg-[#0c3b2e] text-white hover:bg-[#0a2e24]'
                        }`}
                      >
                        {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" aria-hidden /> : <Bookmark className="h-3.5 w-3.5" aria-hidden />}
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCompare(s.id)}
                        disabled={!inCompare && compare.length >= 3}
                        aria-pressed={inCompare}
                        title={inCompare ? 'Remove from comparison' : compare.length >= 3 ? 'Compare holds up to 3' : 'Add to comparison'}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${
                          inCompare
                            ? 'border-[#c79a2b] bg-[#fdf8e7] text-[#9a7414]'
                            : 'border-[#e5e1d8] bg-white text-[#5b6360] hover:border-[#c79a2b] hover:text-[#9a7414] disabled:cursor-not-allowed disabled:opacity-40'
                        }`}
                      >
                        <GitCompareArrows className="h-3.5 w-3.5" aria-hidden />
                        Compare
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDetail(s.id)}
                        disabled={closed}
                        className="inline-flex items-center justify-center rounded-full bg-[#f7f5ef] px-3 py-2 text-xs font-bold text-[#1a1f1c] hover:bg-[#efece2] disabled:opacity-40"
                      >
                        Details
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
