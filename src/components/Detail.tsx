import { ArrowLeft, Bookmark, BookmarkCheck, CheckCircle2, FileText, GitCompareArrows, Info, ListChecks, Play, ShieldCheck, Users } from 'lucide-react';
import { daysUntil, evaluate, formatDeadline, matchLabel, SCHOLARSHIPS } from '../data/scholarships';
import { useStore } from '../lib/store';
import { Amount, CategoryTag, CriteriaIcon, DeadlineChip, MatchRing } from './ui';

export default function Detail({
  id,
  onBack,
  onGoTracker,
}: {
  id: string;
  onBack: () => void;
  onGoTracker: () => void;
}) {
  const { profile, saved, toggleSave, compare, toggleCompare, applications, startApplication } = useStore();
  const s = SCHOLARSHIPS.find((x) => x.id === id);
  if (!s) {
    return (
      <div className="animate-fade-up">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0c3b2e] hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
        </button>
        <p className="mt-6 text-[#5b6360]">That scholarship could not be found.</p>
      </div>
    );
  }

  const { score, criteria } = evaluate(s, profile);
  const isSaved = saved.includes(s.id);
  const inCompare = compare.includes(s.id);
  const app = applications.find((a) => a.scholarshipId === s.id);
  const closed = daysUntil(s.deadline) < 0;
  const metCount = criteria.filter((c) => c.status === 'met').length;
  const decisive = criteria.filter((c) => c.status !== 'info').length;

  return (
    <div className="animate-fade-up">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e1d8] bg-white px-3.5 py-2 text-sm font-semibold text-[#1a1f1c] hover:border-[#0c3b2e]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to results
      </button>

      {/* Hero panel */}
      <section className="mt-4 overflow-hidden rounded-3xl bg-[#0c3b2e] text-white">
        <div className="px-6 py-8 sm:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase">{s.category}</span>
                <span className="text-xs font-medium text-white/70">{s.provider}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">{s.name}</h1>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">{s.description}</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 px-5 py-4">
              <MatchRing score={score} size={64} />
              <span className="text-xs font-bold tracking-wide uppercase">{matchLabel(score)}</span>
              <span className="text-[11px] text-white/70">
                {metCount} of {decisive} criteria met
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-sm">
            <span>
              <span className="text-white/60">Award · </span>
              <Amount value={s.amount} className="text-xl text-white" />
              <span className="text-white/70"> / year</span>
            </span>
            <span>
              <span className="text-white/60">Closes · </span>
              <span className="font-semibold">{formatDeadline(s.deadline)}</span>
            </span>
            <span>
              <span className="text-white/60">Seats · </span>
              <span className="font-semibold">{s.seats}</span>
            </span>
            <DeadlineChip deadline={s.deadline} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {app ? (
              <button
                type="button"
                onClick={onGoTracker}
                className="inline-flex items-center gap-2 rounded-full bg-[#c79a2b] px-5 py-2.5 text-sm font-bold text-[#0a2e24] hover:brightness-105"
              >
                <Play className="h-4 w-4" aria-hidden /> Continue application — {app.status}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => startApplication(s.id)}
                disabled={closed}
                className="inline-flex items-center gap-2 rounded-full bg-[#c79a2b] px-5 py-2.5 text-sm font-bold text-[#0a2e24] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="h-4 w-4" aria-hidden /> Start application
              </button>
            )}
            <button
              type="button"
              onClick={() => toggleSave(s.id)}
              aria-pressed={isSaved}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}
              {isSaved ? 'Saved' : 'Save for later'}
            </button>
            <button
              type="button"
              onClick={() => toggleCompare(s.id)}
              disabled={!inCompare && compare.length >= 3}
              aria-pressed={inCompare}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-40"
            >
              <GitCompareArrows className="h-4 w-4" aria-hidden />
              {inCompare ? 'In comparison' : 'Add to compare'}
            </button>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* Eligibility */}
          <section className="rounded-2xl border border-[#e5e1d8] bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#1a1f1c]">
              <ShieldCheck className="h-5 w-5 text-[#0c3b2e]" aria-hidden /> Do you qualify?
            </h2>
            <p className="mt-1 text-sm text-[#5b6360]">
              Checked against {profile.name.split(' ')[0]}&rsquo;s profile — {profile.level}, {profile.marks}% marks, ₹{profile.income} LPA family income,{' '}
              {profile.state}. Edit your profile to re-check instantly.
            </p>
            <ul className="mt-4 space-y-3">
              {criteria.map((c) => (
                <li key={c.label} className="flex items-start gap-3 rounded-xl bg-[#fbfaf6] px-4 py-3">
                  <CriteriaIcon status={c.status} />
                  <div>
                    <p className="text-sm font-semibold text-[#1a1f1c]">{c.label}</p>
                    <p className="text-[13px] text-[#5b6360]">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section className="rounded-2xl border border-[#e5e1d8] bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#1a1f1c]">
              <CheckCircle2 className="h-5 w-5 text-[#0c3b2e]" aria-hidden /> What you get
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 rounded-xl bg-[#e6f2ec]/60 px-4 py-3 text-sm font-medium text-[#1a1f1c]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0c3b2e]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[#5b6360]">
              <span className="font-semibold text-[#1a1f1c]">Amount: </span>
              {s.amountNote}. <span className="font-semibold text-[#1a1f1c]">Renewal: </span>
              {s.renewal}.
            </p>
          </section>

          {/* Steps */}
          <section className="rounded-2xl border border-[#e5e1d8] bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#1a1f1c]">
              <ListChecks className="h-5 w-5 text-[#0c3b2e]" aria-hidden /> How to apply
            </h2>
            <ol className="mt-4 space-y-0">
              {s.steps.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
                  {i < s.steps.length - 1 && <span className="absolute top-8 left-[15px] h-full w-px bg-[#e5e1d8]" aria-hidden />}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0c3b2e] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-sm font-medium text-[#1a1f1c]">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="space-y-6">
          {/* Documents */}
          <section className="rounded-2xl border border-[#e5e1d8] bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#1a1f1c]">
              <FileText className="h-5 w-5 text-[#0c3b2e]" aria-hidden /> Documents needed
            </h2>
            <ul className="mt-4 space-y-2">
              {s.documents.map((d) => (
                <li key={d} className="flex items-center gap-2.5 rounded-lg border border-[#f0ede4] px-3 py-2.5 text-sm text-[#1a1f1c]">
                  <FileText className="h-4 w-4 shrink-0 text-[#5b6360]" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-[#5b6360]">
              Keep scans ready as clear PDFs or photos under 2 MB each. You can tick these off in the tracker as you gather them.
            </p>
          </section>

          {/* Facts */}
          <section className="rounded-2xl border border-[#e5e1d8] bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#1a1f1c]">
              <Users className="h-5 w-5 text-[#0c3b2e]" aria-hidden /> At a glance
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[#5b6360]">Category</dt>
                <dd className="font-semibold text-[#1a1f1c]">
                  <CategoryTag label={s.category} />
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#5b6360]">Levels</dt>
                <dd className="text-right font-semibold text-[#1a1f1c]">{s.levels.join(', ')}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#5b6360]">Region</dt>
                <dd className="font-semibold text-[#1a1f1c]">{s.state}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#5b6360]">Deadline</dt>
                <dd className="font-semibold text-[#1a1f1c]">{formatDeadline(s.deadline)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#5b6360]">Tags</dt>
                <dd className="text-right font-semibold text-[#1a1f1c]">{s.tags.join(' · ')}</dd>
              </div>
            </dl>
          </section>

          <aside className="flex gap-3 rounded-2xl border border-[#c79a2b]/40 bg-[#fdf8e7] p-5 text-sm leading-relaxed text-[#5b6360]">
            <Info className="h-5 w-5 shrink-0 text-[#9a7414]" aria-hidden />
            <p>
              <span className="font-semibold text-[#1a1f1c]">Sample listing.</span> Grantly&rsquo;s catalogue is
              demonstration data for this hackathon. Always verify eligibility, amounts and deadlines on the
              scheme&rsquo;s official portal before applying.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
