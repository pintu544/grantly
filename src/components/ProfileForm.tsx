import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { INDIAN_STATES, LEVELS, type Level, type Profile } from '../data/scholarships';
import { useStore } from '../lib/store';

export default function ProfileForm({ onClose }: { onClose: () => void }) {
  const { profile, setProfile } = useStore();
  const [draft, setDraft] = useState<Profile>(profile);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...draft, name: draft.name.trim() || profile.name, marks: Math.min(100, Math.max(0, draft.marks)) });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8 nice-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="profile-title" className="font-display text-2xl font-semibold text-[#1a1f1c]">
              Your profile
            </h2>
            <p className="mt-1 text-sm text-[#5b6360]">
              Grantly scores every scholarship against this profile. Change anything and matches update instantly.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile editor"
            className="rounded-full p-2 text-[#5b6360] hover:bg-[#f7f5ef] hover:text-[#1a1f1c]"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <form onSubmit={save} className="mt-6 space-y-5">
          <div>
            <label htmlFor="pf-name" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
              Full name
            </label>
            <input
              id="pf-name"
              type="text"
              value={draft.name}
              onChange={(e) => set('name', e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#e5e1d8] px-3 py-2.5 text-sm focus:border-[#0c3b2e] focus:outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pf-level" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                Education level
              </label>
              <select
                id="pf-level"
                value={draft.level}
                onChange={(e) => set('level', e.target.value as Level)}
                className="mt-2 w-full rounded-xl border border-[#e5e1d8] bg-white px-3 py-2.5 text-sm focus:border-[#0c3b2e] focus:outline-none"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pf-stream" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                Course / stream
              </label>
              <input
                id="pf-stream"
                type="text"
                value={draft.stream}
                onChange={(e) => set('stream', e.target.value)}
                placeholder="e.g. B.Tech Computer Science"
                className="mt-2 w-full rounded-xl border border-[#e5e1d8] px-3 py-2.5 text-sm focus:border-[#0c3b2e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pf-marks" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                Marks in last exam — {draft.marks}%
              </label>
              <input
                id="pf-marks"
                type="range"
                min={35}
                max={100}
                value={draft.marks}
                onChange={(e) => set('marks', Number(e.target.value))}
                className="mt-3 w-full accent-[#0c3b2e]"
                aria-valuetext={`${draft.marks} percent`}
              />
              <p className="mt-1 text-xs text-[#5b6360]">35% – 100%. Many merit scholarships need 75%+.</p>
            </div>
            <div>
              <label htmlFor="pf-income" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                Family income (₹ LPA)
              </label>
              <input
                id="pf-income"
                type="number"
                min={0}
                max={50}
                step={0.5}
                value={draft.income}
                onChange={(e) => set('income', Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-[#e5e1d8] px-3 py-2.5 text-sm focus:border-[#0c3b2e] focus:outline-none"
              />
              <p className="mt-1 text-xs text-[#5b6360]">Need-based schemes usually cap at ₹2.5–8 LPA.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pf-category" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                Category
              </label>
              <select
                id="pf-category"
                value={draft.category}
                onChange={(e) => set('category', e.target.value as Profile['category'])}
                className="mt-2 w-full rounded-xl border border-[#e5e1d8] bg-white px-3 py-2.5 text-sm focus:border-[#0c3b2e] focus:outline-none"
              >
                {(['General', 'OBC', 'SC', 'ST', 'EWS'] as const).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pf-gender" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
                Gender
              </label>
              <select
                id="pf-gender"
                value={draft.gender}
                onChange={(e) => set('gender', e.target.value as Profile['gender'])}
                className="mt-2 w-full rounded-xl border border-[#e5e1d8] bg-white px-3 py-2.5 text-sm focus:border-[#0c3b2e] focus:outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="pf-state" className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">
              State of domicile
            </label>
            <select
              id="pf-state"
              value={draft.state}
              onChange={(e) => set('state', e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#e5e1d8] bg-white px-3 py-2.5 text-sm focus:border-[#0c3b2e] focus:outline-none"
            >
              {INDIAN_STATES.filter((s) => s !== 'All India').map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="text-xs font-bold tracking-wide text-[#5b6360] uppercase">Also applies to me</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ['disability', 'I have a disability certificate'],
                  ['sports', 'I play sports at district level or above'],
                  ['minority', 'I belong to a notified minority community'],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold ${
                    draft[key] ? 'border-[#0c3b2e] bg-[#e6f2ec] text-[#0c3b2e]' : 'border-[#e5e1d8] bg-white text-[#5b6360]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={draft[key]}
                    onChange={(e) => set(key, e.target.checked)}
                    className="h-4 w-4 accent-[#0c3b2e]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex gap-3 border-t border-[#f0ede4] pt-5">
            <button
              type="submit"
              className="flex-1 rounded-full bg-[#0c3b2e] px-5 py-3 text-sm font-bold text-white hover:bg-[#0a2e24]"
            >
              Save profile
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#e5e1d8] px-5 py-3 text-sm font-semibold text-[#1a1f1c] hover:bg-[#f7f5ef]"
            >
              Cancel
            </button>
          </div>
          <p className="text-center text-xs text-[#5b6360]">Stored only in this browser — nothing is uploaded anywhere.</p>
        </form>
      </div>
    </div>
  );
}
