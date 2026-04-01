'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { ActionBar } from '@/components/ActionBar';
import { CopyNoteButton } from '@/components/CopyNoteButton';
import { CountdownPanel } from '@/components/CountdownPanel';
import { EmptyState } from '@/components/EmptyState';
import { LockStatusChip } from '@/components/LockStatusChip';
import { RevealPanel } from '@/components/RevealPanel';
import { TopTabs } from '@/components/TopTabs';
import { WalletButton } from '@/components/WalletButton';
import { useNotes } from '@/lib/use-notes';
import { formatDateTime, getStatusLabel } from '@/lib/time';

export default function NoteDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { address } = useAccount();
  const { byId } = useNotes(address);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const noteId = Array.isArray(params.id) ? params.id[0] : params.id;
  const note = noteId ? byId(noteId) : null;
  const status = useMemo(() => (note ? getStatusLabel(note.unlockTime) : 'sealed'), [note, tick]);
  const isRevealed = status === 'revealed';

  return (
    <div className="app-shell">
      <div className="page-frame">
        <header className="nav-bar">
          <div className="brand-mark">
            <span className="brand-orb" />
            <div className="brand-name">
              <strong>time-lock-note</strong>
              <span>Temporal record</span>
            </div>
          </div>
          <TopTabs />
          <WalletButton />
        </header>

        <main className="detail-slab" style={{ marginTop: 18 }}>
          {!note ? (
            <EmptyState title="Note not found" message="This sealed record is not available in the local archive." actionHref="/my" actionLabel="Back to My Locks" />
          ) : (
            <div className="detail-grid">
              <section className="detail-record">
                <div className="section-panel">
                  <div style={{ display: 'grid', gap: 12 }}>
                    <LockStatusChip tone={isRevealed ? 'revealed' : status === 'unlocks soon' ? 'soon' : 'sealed'} label={status} />
                    <h1 className="record-title">{note.title}</h1>
                    <div className="time-meta">
                      <span>Owner {note.owner}</span>
                      <span>Unlocks {formatDateTime(note.unlockTime)}</span>
                    </div>
                    <p className={isRevealed ? 'record-text' : 'record-text masked-text'}>
                      {isRevealed ? note.text : 'Content remains hidden until the unlock time arrives.'}
                    </p>
                  </div>
                </div>

                <div className="section-panel">
                  <h2 className="panel-title">Reveal Panel</h2>
                  <div style={{ marginTop: 14 }}>
                    <RevealPanel
                      isRevealed={isRevealed}
                      text={note.text}
                      unlockTimeLabel={`Unlocks ${formatDateTime(note.unlockTime)}`}
                    />
                  </div>
                </div>
              </section>

              <aside className="side-panel">
                <div style={{ display: 'grid', gap: 14 }}>
                  <CountdownPanel target={note.unlockTime} subtitle="Countdown to reveal" />
                  <div className="mini-panel">
                    <strong>Chain Trace</strong>
                    <span>{note.txHash ? `Transaction ${note.txHash.slice(0, 10)}...` : 'Local archive record'}</span>
                  </div>
                  {isRevealed ? (
                    <CopyNoteButton text={note.text} />
                  ) : (
                    <div className="mini-panel">
                      <strong>Copy locked</strong>
                      <span>Copy becomes available after the unlock time.</span>
                    </div>
                  )}
                  <ActionBar primaryHref="/create" primaryLabel="Seal Another Note" secondaryHref="/my" secondaryLabel="My Locked Notes" />
                  <button type="button" className="ghost-btn" onClick={() => router.back()}>
                    Back
                  </button>
                </div>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
