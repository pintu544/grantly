import { AlertTriangle, Check, Clock, X } from 'lucide-react';
import { daysUntil, formatDeadline, formatINR, type Scholarship } from '../data/scholarships';

export function DeadlineChip({ deadline, size = 'md' }: { deadline: string; size?: 'sm' | 'md' }) {
  const days = daysUntil(deadline);
  const base =
    size === 'sm'
      ? 'text-[11px] px-2 py-0.5 gap-1'
      : 'text-xs px-2.5 py-1 gap-1.5';
  if (days < 0) {
    return (
      <span className={`inline-flex items-center rounded-full bg-[#fdecea] text-[#b42318] font-semibold ${base}`}>
        <X className="h-3 w-3" aria-hidden /> Closed
      </span>
    );
  }
  if (days <= 3) {
    return (
      <span className={`inline-flex items-center rounded-full bg-[#fdecea] text-[#b42318] font-semibold animate-pulse-soft ${base}`}>
        <AlertTriangle className="h-3 w-3" aria-hidden />
        {days === 0 ? 'Closes today' : days === 1 ? '1 day left' : `${days} days left`}
      </span>
    );
  }
  if (days <= 7) {
    return (
      <span className={`inline-flex items-center rounded-full bg-[#fef3e2] text-[#b54708] font-semibold ${base}`}>
        <Clock className="h-3 w-3" aria-hidden />
        {days} days left
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center rounded-full bg-[#e6f2ec] text-[#0c3b2e] font-semibold ${base}`}>
      <Clock className="h-3 w-3" aria-hidden />
      {formatDeadline(deadline)}
    </span>
  );
}

export function MatchRing({ score, size = 44 }: { score: number; size?: number }) {
  const r = 15.5;
  const c = 2 * Math.PI * r;
  const color = score >= 70 ? '#0c3b2e' : score >= 50 ? '#b54708' : '#b42318';
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Eligibility match ${score} percent`}
      title={`Eligibility match: ${score}%`}
    >
      <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden>
        <circle cx="18" cy="18" r={r} fill="none" stroke="#e9e4d6" strokeWidth="3.5" />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (score / 100) * c}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-[#1a1f1c]">{score}%</span>
    </span>
  );
}

export function Amount({ value, className = '' }: { value: number; className?: string }) {
  return <span className={`font-display font-semibold ${className}`}>{formatINR(value)}</span>;
}

export function CategoryTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#e5e1d8] bg-white px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#5b6360] uppercase">
      {label}
    </span>
  );
}

export function CriteriaIcon({ status }: { status: 'met' | 'missed' | 'info' }) {
  if (status === 'met')
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f2ec] text-[#0c3b2e]" aria-label="Meets criterion">
        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
      </span>
    );
  if (status === 'missed')
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fdecea] text-[#b42318]" aria-label="Does not meet criterion">
        <X className="h-3 w-3" strokeWidth={3} aria-hidden />
      </span>
    );
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f7f5ef] text-[#5b6360]" aria-label="Information">
      <Clock className="h-3 w-3" aria-hidden />
    </span>
  );
}

export function ScholarshipMeta({ s }: { s: Scholarship }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#5b6360]">
      <span className="font-medium text-[#1a1f1c]">{s.provider}</span>
      <span aria-hidden>·</span>
      <span>{s.state}</span>
      <span aria-hidden>·</span>
      <span>{s.levels.join(' · ')}</span>
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d8d2c2] bg-white/60 px-6 py-12 text-center">
      <p className="font-display text-xl font-semibold text-[#1a1f1c]">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#5b6360]">{body}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
