import { ArrowRight, Compass, Crown, GitCompareArrows, X } from 'lucide-react';
import { daysUntil, evaluate, formatDeadline, formatINR, SCHOLARSHIPS } from '../data/scholarships';
import { useStore } from '../lib/store';
import { EmptyState } from './ui';

export default function Compare({
  onOpenDetail,
  onNavigateDiscover,
}: {
  onOpenDetail: (id: string) => void;
  onNavigateDiscover: () => void;
}) {
  const { compare, toggleCompare, clearCompare, profile } = useStore();
  const items = compare.map((id) => SCHOLARSHIPS.find((s) => s.id === id)!).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-semibold text-[#1a1f1c]">Compare scholarships</h1>
        <p className="mt-1 text-sm text-[#5b6360]">Line up to three scholarships side by side and pick the best fit.</p>
        <div className="mt-6">
          <EmptyState
            title="Nothing to compare yet"
            body="From Discover, tap Compare on any scholarship card — add up to three and they will line up here, with the best amount and the nearest deadline highlighted."
            action={
              <button
                type="button"
                onClick={onNavigateDiscover}
                className="inline-flex items-center gap-2 rounded-full bg-[#0c3b2e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0a2e24]"
              >
                <Compass className="h-4 w-4" aria-hidden /> Discover scholarships
              </button>
            }
          />
        </div>
      </div>
    );
  }

  const maxAmount = Math.max(...items.map((s) => s.amount));
  const minDeadline = Math.min(...items.map((s) => daysUntil(s.deadline)));
  const bestScore = Math.max(...items.map((s) => evaluate(s, profile).score));

  const rows: { label: string; render: (s: (typeof items)[number]) => React.ReactNode; highlight?: (s: (typeof items)[number]) => boolean }[] = [
    {
      label: 'Award per year',
      render: (s) => <span className="font-display text-lg font-semibold text-[#0c3b2e]">{formatINR(s.amount)}</span>,
      highlight: (s) => s.amount === maxAmount,
    },
    {
      label: 'Deadline',
      render: (s) => (
        <span className="font-semibold text-[#1a1f1c]">
          {formatDeadline(s.deadline)}
          <span className="block text-xs font-medium text-[#5b6360]">
            {daysUntil(s.deadline) < 0 ? 'Closed' : daysUntil(s.deadline) === 0 ? 'Closes today' : `${daysUntil(s.deadline)} days left`}
          </span>
        </span>
      ),
      highlight: (s) => daysUntil(s.deadline) === minDeadline,
    },
    {
      label: 'Your match',
      render: (s) => {
        const score = evaluate(s, profile).score;
        return (
          <span className="font-semibold text-[#1a1f1c]">
            {score}%
            <span className="block text-xs font-medium text-[#5b6360]">{score >= 70 ? 'Strong match' : score >= 50 ? 'Partial match' : 'Low match'}</span>
          </span>
        );
      },
      highlight: (s) => evaluate(s, profile).score === bestScore,
    },
    { label: 'Category', render: (s) => <span className="font-medium text-[#1a1f1c]">{s.category}</span> },
    { label: 'Region', render: (s) => <span className="font-medium text-[#1a1f1c]">{s.state}</span> },
    { label: 'Levels', render: (s) => <span className="font-medium text-[#1a1f1c]">{s.levels.join(', ')}</span> },
    {
      label: 'Minimum marks',
      render: (s) => <span className="font-medium text-[#1a1f1c]">{s.minMarks === null ? 'No bar' : `${s.minMarks}%`}</span>,
    },
    {
      label: 'Income cap',
      render: (s) => <span className="font-medium text-[#1a1f1c]">{s.maxIncome === null ? 'No cap' : `₹${s.maxIncome} LPA`}</span>,
    },
    { label: 'Documents', render: (s) => <span className="font-medium text-[#1a1f1c]">{s.documents.length} needed</span> },
    { label: 'Seats', render: (s) => <span className="font-medium text-[#1a1f1c]">{s.seats}</span> },
    { label: 'Renewal', render: (s) => <span className="font-medium text-[#1a1f1c]">{s.renewal}</span> },
  ];

  return (
    <div className="animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#1a1f1c]">Compare scholarships</h1>
          <p className="mt-1 text-sm text-[#5b6360]">
            {items.length} selected · <Crown className="inline h-3.5 w-3.5 text-[#c79a2b]" aria-hidden /> marks the best value in each row.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCompare}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e1d8] bg-white px-4 py-2 text-sm font-semibold text-[#b42318] hover:bg-[#fdecea]"
        >
          <X className="h-4 w-4" aria-hidden /> Clear comparison
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e5e1d8] bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#e5e1d8]">
              <th scope="col" className="w-36 px-5 py-4 text-left align-bottom">
                <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                  <GitCompareArrows className="h-4 w-4" aria-hidden /> Scholarship
                </span>
              </th>
              {items.map((s) => (
                <th key={s.id} scope="col" className="min-w-52 px-5 py-4 text-left align-top">
                  <button type="button" onClick={() => onOpenDetail(s.id)} className="text-left font-display text-[17px] leading-snug font-semibold text-[#0c3b2e] hover:underline">
                    {s.name}
                  </button>
                  <span className="mt-1 block text-xs font-medium text-[#5b6360]">
                    {s.provider} · {s.category}
                  </span>
                  <span className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenDetail(s.id)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#0c3b2e] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0a2e24]"
                    >
                      View <ArrowRight className="h-3 w-3" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompare(s.id)}
                      className="inline-flex items-center gap-1 rounded-full border border-[#e5e1d8] px-3 py-1.5 text-xs font-bold text-[#5b6360] hover:border-[#b42318] hover:text-[#b42318]"
                    >
                      <X className="h-3 w-3" aria-hidden /> Remove
                    </button>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-[#f0ede4] last:border-0 hover:bg-[#fbfaf6]">
                <th scope="row" className="px-5 py-3.5 text-left align-top text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                  {row.label}
                </th>
                {items.map((s) => {
                  const hot = row.highlight?.(s) ?? false;
                  return (
                    <td key={s.id} className={`px-5 py-3.5 align-top ${hot ? 'bg-[#fdf8e7]' : ''}`}>
                      <span className="inline-flex items-start gap-1.5">
                        {hot && <Crown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c79a2b]" aria-label="Best in this row" />}
                        {row.render(s)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[#5b6360]">
        Match scores are computed from the profile on file. Change your profile and the scores here update instantly.
      </p>
    </div>
  );
}
