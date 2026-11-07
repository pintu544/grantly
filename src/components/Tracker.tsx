import { Award, CheckCircle2, Compass, FileCheck2, Trash2, XCircle } from 'lucide-react';
import { daysUntil, SCHOLARSHIPS } from '../data/scholarships';
import { ACTIVE_STATUSES, STATUS_ORDER, useStore, type AppStatus } from '../lib/store';
import { Amount, DeadlineChip, EmptyState } from './ui';

const STATUS_STYLE: Record<AppStatus, string> = {
  Saved: 'bg-[#f7f5ef] text-[#5b6360]',
  Documents: 'bg-[#fef3e2] text-[#b54708]',
  Applied: 'bg-[#e6f2ec] text-[#0c3b2e]',
  'Under review': 'bg-[#e8eefb] text-[#1d4ed8]',
  Shortlisted: 'bg-[#f3e8ff] text-[#7e22ce]',
  Awarded: 'bg-[#e6f2ec] text-[#0c3b2e]',
  Rejected: 'bg-[#fdecea] text-[#b42318]',
};

export default function Tracker({ onOpenDetail, onNavigateDiscover }: { onOpenDetail: (id: string) => void; onNavigateDiscover: () => void }) {
  const { applications, setStatus, toggleDoc, setNotes, removeApplication } = useStore();

  const inFlight = applications.filter((a) => ACTIVE_STATUSES.includes(a.status));
  const awarded = applications.filter((a) => a.status === 'Awarded');
  const rejected = applications.filter((a) => a.status === 'Rejected');

  const totalDocs = applications.reduce((sum, a) => {
    const s = SCHOLARSHIPS.find((x) => x.id === a.scholarshipId);
    return sum + (s ? s.documents.length : 0);
  }, 0);
  const doneDocs = applications.reduce((sum, a) => sum + a.docsDone.length, 0);

  if (applications.length === 0) {
    return (
      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-semibold text-[#1a1f1c]">My Applications</h1>
        <p className="mt-1 text-sm text-[#5b6360]">Every application you start lives here, with its documents and deadlines.</p>
        <div className="mt-6">
          <EmptyState
            title="Nothing in your tracker yet"
            body="Start an application from any scholarship's detail page and it will appear here with a document checklist and a live deadline countdown."
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

  const renderCard = (app: (typeof applications)[number]) => {
    const s = SCHOLARSHIPS.find((x) => x.id === app.scholarshipId);
    if (!s) return null;
    const pct = s.documents.length === 0 ? 100 : Math.round((app.docsDone.length / s.documents.length) * 100);
    return (
      <article key={s.id} className="rounded-2xl border border-[#e5e1d8] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <button type="button" onClick={() => onOpenDetail(s.id)} className="text-left font-display text-lg leading-snug font-semibold text-[#1a1f1c] hover:underline">
              {s.name}
            </button>
            <p className="mt-0.5 text-[13px] text-[#5b6360]">
              {s.provider} · <Amount value={s.amount} /> / year
            </p>
          </div>
          <DeadlineChip deadline={s.deadline} size="sm" />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#5b6360]">Documents ready</span>
            <span className="text-[#1a1f1c]">
              {app.docsDone.length} of {s.documents.length} · {pct}%
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#f0ede4]" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Documents ready">
            <div className="h-full rounded-full bg-[#0c3b2e] transition-all" style={{ width: `${pct}%` }} />
          </div>
          <ul className="mt-3 space-y-1.5">
            {s.documents.map((doc) => {
              const done = app.docsDone.includes(doc);
              return (
                <li key={doc}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-[#fbfaf6]">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleDoc(s.id, doc)}
                      className="h-4 w-4 shrink-0 accent-[#0c3b2e]"
                    />
                    <span className={done ? 'text-[#5b6360] line-through' : 'text-[#1a1f1c]'}>{doc}</span>
                    {done && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-[#0c3b2e]" aria-hidden />}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-4 grid gap-3 border-t border-[#f0ede4] pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label htmlFor={`status-${s.id}`} className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
              Status
            </label>
            <select
              id={`status-${s.id}`}
              value={app.status}
              onChange={(e) => setStatus(s.id, e.target.value as AppStatus)}
              className={`mt-1.5 w-full rounded-xl border border-[#e5e1d8] px-3 py-2 text-sm font-semibold focus:border-[#0c3b2e] focus:outline-none sm:w-auto ${STATUS_STYLE[app.status]}`}
            >
              {STATUS_ORDER.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => removeApplication(s.id)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#fdecea] px-3 py-2 text-xs font-semibold text-[#b42318] hover:bg-[#fdecea]"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
          </button>
        </div>

        <div className="mt-3">
          <label htmlFor={`notes-${s.id}`} className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
            Notes
          </label>
          <textarea
            id={`notes-${s.id}`}
            value={app.notes}
            onChange={(e) => setNotes(s.id, e.target.value)}
            rows={2}
            placeholder="Reference number, login details, reminders…"
            className="mt-1.5 w-full resize-y rounded-xl border border-[#e5e1d8] bg-white px-3 py-2 text-sm text-[#1a1f1c] placeholder:text-[#5b6360] focus:border-[#0c3b2e] focus:outline-none"
          />
        </div>
        <p className="mt-3 text-[11px] text-[#5b6360]">
          Started {new Date(app.startedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          {daysUntil(s.deadline) >= 0 ? ` · ${daysUntil(s.deadline)} days to deadline` : ' · deadline passed'}
        </p>
      </article>
    );
  };

  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-3xl font-semibold text-[#1a1f1c]">My Applications</h1>
      <p className="mt-1 text-sm text-[#5b6360]">
        {inFlight.length} in flight · {awarded.length} awarded · {rejected.length} closed · {doneDocs} of {totalDocs} documents ready
      </p>

      {awarded.length > 0 && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#e6f2ec] px-5 py-4">
          <Award className="h-6 w-6 shrink-0 text-[#0c3b2e]" aria-hidden />
          <p className="text-sm font-semibold text-[#0c3b2e]">
            {awarded.length === 1 ? 'One scholarship awarded' : `${awarded.length} scholarships awarded`} —{' '}
            {awarded
              .map((a) => SCHOLARSHIPS.find((x) => x.id === a.scholarshipId)?.name)
              .filter(Boolean)
              .join(', ')}
            . Congratulations!
          </p>
        </div>
      )}

      {ACTIVE_STATUSES.map((status) => {
        const group = applications.filter((a) => a.status === status);
        if (group.length === 0) return null;
        return (
          <section key={status} className="mt-8">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#1a1f1c]">
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_STYLE[status]}`}>{status}</span>
              <span className="text-sm font-semibold text-[#5b6360]">({group.length})</span>
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">{group.map(renderCard)}</div>
          </section>
        );
      })}

      {(awarded.length > 0 || rejected.length > 0) && (
        <section className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-[#1a1f1c]">
            <XCircle className="h-5 w-5 text-[#5b6360]" aria-hidden /> Decided
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {[...awarded, ...rejected].map(renderCard)}
          </div>
        </section>
      )}

      <p className="mt-8 flex items-center gap-2 text-xs leading-relaxed text-[#5b6360]">
        <FileCheck2 className="h-4 w-4 shrink-0" aria-hidden />
        Everything on this page is saved in your browser (local storage) — your applications and notes stay on this device.
      </p>
    </div>
  );
}
