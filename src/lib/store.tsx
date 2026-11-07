import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_PROFILE, type Profile } from '../data/scholarships';

export type AppStatus =
  | 'Saved'
  | 'Documents'
  | 'Applied'
  | 'Under review'
  | 'Shortlisted'
  | 'Awarded'
  | 'Rejected';

export const STATUS_ORDER: AppStatus[] = [
  'Saved',
  'Documents',
  'Applied',
  'Under review',
  'Shortlisted',
  'Awarded',
  'Rejected',
];

export const ACTIVE_STATUSES: AppStatus[] = ['Saved', 'Documents', 'Applied', 'Under review', 'Shortlisted'];

export interface Application {
  scholarshipId: string;
  status: AppStatus;
  docsDone: string[];
  notes: string;
  startedAt: string; // ISO
  updatedAt: string; // ISO
}

interface Store {
  profile: Profile;
  setProfile: (p: Profile) => void;
  saved: string[];
  toggleSave: (id: string) => void;
  applications: Application[];
  startApplication: (id: string) => void;
  setStatus: (id: string, status: AppStatus) => void;
  toggleDoc: (id: string, doc: string) => void;
  setNotes: (id: string, notes: string) => void;
  removeApplication: (id: string) => void;
  compare: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

const StoreContext = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — app keeps working in-memory
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(() => load('grantly.profile', DEFAULT_PROFILE));
  const [saved, setSaved] = useState<string[]>(() => load('grantly.saved', []));
  const [applications, setApplications] = useState<Application[]>(() => load('grantly.applications', []));
  const [compare, setCompare] = useState<string[]>(() => load('grantly.compare', []));

  useEffect(() => save('grantly.profile', profile), [profile]);
  useEffect(() => save('grantly.saved', saved), [saved]);
  useEffect(() => save('grantly.applications', applications), [applications]);
  useEffect(() => save('grantly.compare', compare), [compare]);

  const value = useMemo<Store>(
    () => ({
      profile,
      setProfile: setProfileState,
      saved,
      toggleSave: (id) => setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      applications,
      startApplication: (id) =>
        setApplications((prev) => {
          if (prev.some((a) => a.scholarshipId === id)) return prev;
          const now = new Date().toISOString();
          return [...prev, { scholarshipId: id, status: 'Documents', docsDone: [], notes: '', startedAt: now, updatedAt: now }];
        }),
      setStatus: (id, status) =>
        setApplications((prev) =>
          prev.map((a) => (a.scholarshipId === id ? { ...a, status, updatedAt: new Date().toISOString() } : a)),
        ),
      toggleDoc: (id, doc) =>
        setApplications((prev) =>
          prev.map((a) =>
            a.scholarshipId === id
              ? {
                  ...a,
                  docsDone: a.docsDone.includes(doc) ? a.docsDone.filter((d) => d !== doc) : [...a.docsDone, doc],
                  updatedAt: new Date().toISOString(),
                }
              : a,
          ),
        ),
      setNotes: (id, notes) =>
        setApplications((prev) => prev.map((a) => (a.scholarshipId === id ? { ...a, notes } : a))),
      removeApplication: (id) => setApplications((prev) => prev.filter((a) => a.scholarshipId !== id)),
      compare,
      toggleCompare: (id) =>
        setCompare((prev) => {
          if (prev.includes(id)) return prev.filter((x) => x !== id);
          if (prev.length >= 3) return prev; // max 3 for a readable table
          return [...prev, id];
        }),
      clearCompare: () => setCompare([]),
    }),
    [profile, saved, applications, compare],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
