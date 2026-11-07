import { Bookmark, GitCompareArrows, GraduationCap, LayoutDashboard, Menu, Search, User, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../lib/store';
import type { View } from '../App';

const NAV: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'discover', label: 'Discover', icon: Search },
  { id: 'tracker', label: 'My Applications', icon: Bookmark },
  { id: 'compare', label: 'Compare', icon: GitCompareArrows },
];

export default function Header({
  view,
  onNavigate,
  onOpenProfile,
}: {
  view: View;
  onNavigate: (v: View) => void;
  onOpenProfile: () => void;
}) {
  const { compare, applications, profile } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeCount = applications.filter((a) => a.status !== 'Awarded' && a.status !== 'Rejected').length;

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e1d8] bg-[#fbfaf6]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5"
          aria-label="Grantly home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0c3b2e] text-white">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-display text-[22px] font-bold tracking-tight text-[#0c3b2e]">Grantly</span>
          <span className="hidden rounded-full bg-[#e6f2ec] px-2 py-0.5 text-[11px] font-semibold text-[#0c3b2e] sm:inline-block">
            Scholarships, simplified
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={view === id ? 'page' : undefined}
              className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                view === id ? 'bg-[#0c3b2e] text-white' : 'text-[#5b6360] hover:bg-[#efece2] hover:text-[#1a1f1c]'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
              {id === 'tracker' && activeCount > 0 && (
                <span
                  className={`ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold ${
                    view === id ? 'bg-white/20 text-white' : 'bg-[#0c3b2e] text-white'
                  }`}
                >
                  {activeCount}
                </span>
              )}
              {id === 'compare' && compare.length > 0 && (
                <span
                  className={`ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold ${
                    view === id ? 'bg-white/20 text-white' : 'bg-[#c79a2b] text-white'
                  }`}
                >
                  {compare.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-2 rounded-full border border-[#e5e1d8] bg-white py-1.5 pr-3 pl-1.5 text-sm font-semibold text-[#1a1f1c] shadow-sm transition-colors hover:border-[#0c3b2e]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e6f2ec] text-[#0c3b2e]">
              <User className="h-4 w-4" aria-hidden />
            </span>
            <span className="hidden max-w-28 truncate sm:inline">{profile.name.split(' ')[0]}</span>
            <span className="hidden text-xs font-medium text-[#5b6360] lg:inline">· {profile.level}</span>
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e1d8] bg-white text-[#1a1f1c] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-[#e5e1d8] bg-[#fbfaf6] px-4 py-3 md:hidden" aria-label="Mobile">
          <div className="grid gap-1">
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  onNavigate(id);
                  setMenuOpen(false);
                }}
                aria-current={view === id ? 'page' : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                  view === id ? 'bg-[#0c3b2e] text-white' : 'text-[#1a1f1c] hover:bg-[#efece2]'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
                {id === 'tracker' && activeCount > 0 && <span className="ml-auto text-xs font-bold">({activeCount})</span>}
                {id === 'compare' && compare.length > 0 && <span className="ml-auto text-xs font-bold">({compare.length})</span>}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
