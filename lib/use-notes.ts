'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ensureNotesSeeded,
  getAllNotes,
  getLatestNoteForAddress,
  getNoteById,
  getNotesForAddress,
  type TimeLockNote,
} from './notes';

export function useNotes(address?: string | null) {
  const [notes, setNotes] = useState<TimeLockNote[]>([]);

  const refresh = useCallback(() => {
    setNotes(getNotesForAddress(address));
  }, [address]);

  useEffect(() => {
    ensureNotesSeeded();
    refresh();
    const handler = () => refresh();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [refresh]);

  return {
    notes,
    refresh,
    latest: getLatestNoteForAddress(address),
    all: getAllNotes(),
    byId: (id: string) => getNoteById(id),
  };
}
