import Link from 'next/link';
import { LockStatusChip } from './LockStatusChip';
import { formatDateTime, getStatusLabel } from '@/lib/time';
import type { TimeLockNote } from '@/lib/notes';

export function TimeLockCard({ note }: { note: TimeLockNote }) {
  const status = getStatusLabel(note.unlockTime);
  const tone = status === 'revealed' ? 'revealed' : status === 'unlocks soon' ? 'soon' : 'sealed';

  return (
    <article className="time-lock-card">
      <header>
        <div>
          <h3>{note.title}</h3>
          <p>{note.owner}</p>
        </div>
        <LockStatusChip tone={tone} label={status} />
      </header>
      <p>{status === 'revealed' ? note.text : 'Sealed note, waiting for unlock time.'}</p>
      <footer>
        <span className="footer-note">Unlocks {formatDateTime(note.unlockTime)}</span>
        <Link href={`/locks/${note.id}`} className="secondary-btn">
          Open Detail
        </Link>
      </footer>
    </article>
  );
}
