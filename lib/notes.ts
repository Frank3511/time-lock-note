export type TimeLockNote = {
  id: string;
  title: string;
  text: string;
  owner: string;
  unlockTime: number;
  createdAt: number;
  txHash?: string;
  revealedAt?: number | null;
  chain: 'Base';
};

const STORAGE_KEY = 'time-lock-note.records.v1';
const DEMO_NOW = Date.UTC(2026, 3, 1, 8, 0, 0);

const seedNotes: TimeLockNote[] = [
  {
    id: 'seed-01',
    title: 'Letter to Future Self',
    text: 'Remember the pace that felt calm. Keep the promise you made when the sky was quiet.',
    owner: '0x9f3a...1C20',
    unlockTime: DEMO_NOW + 1000 * 60 * 60 * 18,
    createdAt: DEMO_NOW - 1000 * 60 * 18,
    chain: 'Base',
  },
  {
    id: 'seed-02',
    title: 'Private Note',
    text: 'The answer you are waiting for arrives with patience, not force.',
    owner: '0x9f3a...1C20',
    unlockTime: DEMO_NOW - 1000 * 60 * 55,
    createdAt: DEMO_NOW - 1000 * 60 * 60 * 24,
    revealedAt: DEMO_NOW - 1000 * 60 * 10,
    chain: 'Base',
  },
  {
    id: 'seed-03',
    title: 'Archive Signal',
    text: 'A small message for a larger tomorrow.',
    owner: '0x8d11...7A44',
    unlockTime: DEMO_NOW + 1000 * 60 * 60 * 62,
    createdAt: DEMO_NOW - 1000 * 60 * 40,
    chain: 'Base',
  },
];

function readStore(): TimeLockNote[] {
  if (typeof window === 'undefined') return seedNotes;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedNotes;
    const parsed = JSON.parse(raw) as TimeLockNote[];
    return parsed.length ? parsed : seedNotes;
  } catch {
    return seedNotes;
  }
}

function writeStore(notes: TimeLockNote[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function notifyStoreUpdate() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('storage'));
}

export function getAllNotes() {
  return [...readStore()].sort((a, b) => b.createdAt - a.createdAt);
}

export function getNotesForAddress(address?: string | null) {
  if (!address) return getAllNotes();
  const lower = address.toLowerCase();
  return [...readStore()]
    .filter((note) => {
      const owner = note.owner.toLowerCase();
      return owner === lower || owner.startsWith(lower.slice(0, 6));
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getLatestNoteForAddress(address?: string | null) {
  const list = getNotesForAddress(address);
  return list[0] ?? null;
}

export function getNoteById(id: string) {
  return readStore().find((note) => note.id === id) ?? null;
}

export function upsertNote(note: TimeLockNote) {
  const next = [note, ...readStore().filter((item) => item.id !== note.id)];
  writeStore(next);
  notifyStoreUpdate();
  return note;
}

export function createNoteRecord(input: {
  title: string;
  text: string;
  owner: string;
  unlockTime: number;
  txHash?: string;
}) {
  return upsertNote({
    id: crypto.randomUUID(),
    title: input.title,
    text: input.text,
    owner: input.owner,
    unlockTime: input.unlockTime,
    createdAt: Date.now(),
    txHash: input.txHash,
    revealedAt: input.unlockTime <= Date.now() ? Date.now() : null,
    chain: 'Base',
  });
}

export function ensureNotesSeeded() {
  if (typeof window === 'undefined') return;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    writeStore(seedNotes);
    notifyStoreUpdate();
  }
}

export function markAsRevealed(id: string) {
  const items = readStore().map((note) => (note.id === id ? { ...note, revealedAt: note.revealedAt ?? Date.now() } : note));
  writeStore(items);
  notifyStoreUpdate();
}
