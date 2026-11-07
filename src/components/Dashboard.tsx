import { ArrowRight, Bookmark, CalendarClock, CheckCircle2, Compass, FileCheck2, IndianRupee, Search, Sparkles, Trophy } from 'lucide-react';
import { daysUntil, evaluate, formatINR, SCHOLARSHIPS } from '../data/scholarships';
import { useStore } from '../lib/store';
import { Amount, CategoryTag, DeadlineChip, MatchRing } from './ui';

export default function Dashboard({
  onNavigate,
  onOpenDetail,
  onOpenProfile,
}: {
  onNavigate: (v: 'discover' | 'tracker') => void;
  onOpenDetail: (id: string) => void;
  onOpenProfile: () => void;
}) {
  const { profile, saved, applications } = useStore();

  const scored = SCHOLARSHIPS.map((s) => ({ s, score: evaluate(s, profile).score })).filter(
    ({ s }) => daysUntil(s.deadline) >= 0,
  );
  const strongMatches = scored.filter(({ score }) => score >= 70).length;
  const inFlight = applications.filter((a) => a.status !== 'Awarded' && a.status !== 'Rejected');
  const potential = [...new Set([...saved, ...applications.map((a) => a.scholarshipId)])].reduce((sum, id) => {
    const s = SCHOLARSHIPS.find((x) => x.id === id);
    return sum + (s ? s.amount : 0);
  }, 0);

  const tracked = [...new Set([...saved, ...applications.map((a) => a.scholarshipId)])]
    .map((id) => SCHOLARSHIPS.find((x) => x.id === id)!)
    .filter(Boolean)
    .filter((s) => daysUntil(s.deadline) >= 0)
    .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline))
    .slice(0, 5);

  const topMatches = [...scored].sort((a, b) => b.score - a.score || b.s.amount - a.s.amount).slice(0, 4);

  return (
    <div className="animate-fade-up space-y-10">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-[#0c3b2e] text-white">
        <div className="grid gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl">
              Scholarships, found and tracked — in one calm place.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">
              Grantly matches your profile against {SCHOLARSHIPS.length} scholarships, tells you exactly
              where you stand on eligibility, and keeps every deadline and document in sight — so no
              opportunity slips past.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('discover')}
                className="inline-flex items-center gap-2 rounded-full bg-[#c79a2b] px-5 py-3 text-sm font-bold text-[#0a2e24] transition-transform hover:scale-[1.02] focus-visible:outline-white"
              >
                <Search className="h-4 w-4" aria-hidden />
                Discover scholarships
              </button>
              <button
                type="button"
                onClick={onOpenProfile}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                {strongMatches > 0 ? `${strongMatches} strong matches for you` : 'Complete your profile'}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide whitespace-nowrap text-white/70 uppercase">
                <Trophy className="h-3.5 w-3.5" aria-hidden /> Matches
              </p>
              <p className="mt-2 font-display text-4xl font-semibold">{strongMatches}</p>
              <p className="mt-1 text-xs text-white/70">of {SCHOLARSHIPS.length} scholarships fit your profile</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide whitespace-nowrap text-white/70 uppercase">
                <IndianRupee className="h-3.5 w-3.5" aria-hidden /> Potential
              </p>
              <p className="mt-2 font-display text-4xl font-semibold">{formatINR(potential)}</p>
              <p className="mt-1 text-xs text-white/70">per year, across saved &amp; applied</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide whitespace-nowrap text-white/70 uppercase">
                <Bookmark className="h-3.5 w-3.5" aria-hidden /> Saved
              </p>
              <p className="mt-2 font-display text-4xl font-semibold">{saved.length}</p>
              <p className="mt-1 text-xs text-white/70">scholarships on your shortlist</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide whitespace-nowrap text-white/70 uppercase">
                <FileCheck2 className="h-3.5 w-3.5" aria-hidden /> In flight
              </p>
              <p className="mt-2 font-display text-4xl font-semibold">{inFlight.length}</p>
              <p className="mt-1 text-xs text-white/70">applications being worked on</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing soon */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#1a1f1c]">Closing soon</h2>
            <p className="mt-1 text-sm text-[#5b6360]">Deadlines for scholarships you saved or started.</p>
          </div>
          {tracked.length > 0 && (
            <button
              type="button"
              onClick={() => onNavigate('tracker')}
              className="hidden items-center gap-1 text-sm font-semibold text-[#0c3b2e] hover:underline sm:inline-flex"
            >
              Open tracker <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
        {tracked.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-[#d8d2c2] bg-white/60 px-6 py-10 text-center">
            <CalendarClock className="mx-auto h-8 w-8 text-[#c79a2b]" aria-hidden />
            <p className="mt-3 font-display text-lg font-semibold text-[#1a1f1c]">No deadlines on your radar yet</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-[#5b6360]">
              Save a scholarship from Discover and it will appear here with a live countdown, so you always know what is due next.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('discover')}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0c3b2e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0a2e24]"
            >
              <Compass className="h-4 w-4" aria-hidden /> Browse scholarships
            </button>
          </div>
        ) : (
          <ol className="mt-4 space-y-2.5">
            {tracked.map((s) => {
              const app = applications.find((a) => a.scholarshipId === s.id);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onOpenDetail(s.id)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-[#e5e1d8] bg-white px-4 py-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:px-5"
                  >
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f2ec] font-display text-sm font-bold text-[#0c3b2e] sm:flex">
                      {daysUntil(s.deadline)}d
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-[#1a1f1c]">{s.name}</span>
                      <span className="mt-0.5 block text-[13px] text-[#5b6360]">
                        <Amount value={s.amount} /> / year · {app ? `Status: ${app.status}` : 'Saved — not started yet'}
                      </span>
                    </span>
                    <DeadlineChip deadline={s.deadline} />
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#5b6360] sm:block" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {/* Top matches */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#1a1f1c]">Top matches for you</h2>
            <p className="mt-1 text-sm text-[#5b6360]">
              Ranked by how well {profile.name.split(' ')[0]}&rsquo;s profile fits each scholarship&rsquo;s eligibility.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('discover')}
            className="hidden items-center gap-1 text-sm font-semibold text-[#0c3b2e] hover:underline sm:inline-flex"
          >
            See all {SCHOLARSHIPS.length} <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {topMatches.map(({ s, score }) => (
            <article
              key={s.id}
              className="group rounded-2xl border border-[#e5e1d8] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CategoryTag label={s.category} />
                  <h3 className="mt-2.5 font-display text-lg leading-snug font-semibold text-[#1a1f1c]">{s.name}</h3>
                  <p className="mt-1 text-[13px] text-[#5b6360]">
                    {s.provider} · {s.state}
                  </p>
                </div>
                <MatchRing score={score} />
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#5b6360]">{s.description}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0ede4] pt-4">
                <span className="whitespace-nowrap">
                  <Amount value={s.amount} className="text-lg text-[#0c3b2e]" />
                  <span className="text-xs text-[#5b6360]"> / year</span>
                </span>
                <div className="flex items-center gap-2">
                  <DeadlineChip deadline={s.deadline} size="sm" />
                  <button
                    type="button"
                    onClick={() => onOpenDetail(s.id)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#0c3b2e] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0a2e24]"
                  >
                    View <ArrowRight className="h-3 w-3" aria-hidden />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="rounded-3xl border border-[#e5e1d8] bg-white p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-[#1a1f1c]">From confusion to submitted, in three steps</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: '1. Discover what fits',
              body: 'Tell Grantly about yourself once. It scores every scholarship against your marks, income, state and category — no more reading 40-page PDFs.',
            },
            {
              icon: CheckCircle2,
              title: '2. Know exactly what to do',
              body: 'Each scholarship shows a plain-language eligibility checklist, the exact documents needed, and the steps to apply — nothing hidden.',
            },
            {
              icon: CalendarClock,
              title: '3. Track it to the finish',
              body: 'Save, start, and move applications through Saved → Applied → Awarded. Deadlines and document checklists keep you ahead of every date.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f2ec] text-[#0c3b2e]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-[#1a1f1c]">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#5b6360]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
