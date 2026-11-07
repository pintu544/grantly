import { useState } from 'react';
import Compare from './components/Compare';
import Dashboard from './components/Dashboard';
import Detail from './components/Detail';
import Discover from './components/Discover';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import Tracker from './components/Tracker';
import { StoreProvider } from './lib/store';

export type View = 'dashboard' | 'discover' | 'tracker' | 'compare';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const openDetail = (id: string) => {
    setDetailId(id);
    window.scrollTo({ top: 0 });
  };
  const navigate = (v: View) => {
    setView(v);
    setDetailId(null);
    window.scrollTo({ top: 0 });
  };

  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col bg-[#f7f5ef]">
        <Header view={view} onNavigate={navigate} onOpenProfile={() => setProfileOpen(true)} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          {detailId ? (
            <Detail id={detailId} onBack={() => setDetailId(null)} onGoTracker={() => navigate('tracker')} />
          ) : view === 'dashboard' ? (
            <Dashboard onNavigate={navigate} onOpenDetail={openDetail} onOpenProfile={() => setProfileOpen(true)} />
          ) : view === 'discover' ? (
            <Discover onOpenDetail={openDetail} />
          ) : view === 'tracker' ? (
            <Tracker onOpenDetail={openDetail} onNavigateDiscover={() => navigate('discover')} />
          ) : (
            <Compare onOpenDetail={openDetail} onNavigateDiscover={() => navigate('discover')} />
          )}
        </main>
        <footer className="border-t border-[#e5e1d8] bg-[#fbfaf6]">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-[13px] text-[#5b6360] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              <span className="font-display font-bold text-[#0c3b2e]">Grantly</span> — built for The Outpost,
              Frontend Arena · 7 Nov 2026. Sample scholarship data for demonstration; verify on official portals.
            </p>
            <p className="shrink-0">React · TypeScript · Tailwind CSS</p>
          </div>
        </footer>
        {profileOpen && <ProfileForm onClose={() => setProfileOpen(false)} />}
      </div>
    </StoreProvider>
  );
}
