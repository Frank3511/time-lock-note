'use client';

import { useAccount } from 'wagmi';
import { EmptyState } from '@/components/EmptyState';
import { LockStatusChip } from '@/components/LockStatusChip';
import { TopTabs } from '@/components/TopTabs';
import { VaultCalendarHeader } from '@/components/VaultCalendarHeader';
import { WalletButton } from '@/components/WalletButton';
import { useNotes } from '@/lib/use-notes';
import { formatDateTime, getStatusLabel } from '@/lib/time';

export default function TimelinePage() {
  const { address } = useAccount();
  const { notes } = useNotes(address);

  const upcoming = notes.filter((note) => note.unlockTime > Date.now()).slice(0, 4);
  const revealed = notes.filter((note) => note.unlockTime <= Date.now()).slice(0, 4);

  return (
    <div className="app-shell">
      <div className="page-frame">
        <header className="nav-bar">
          <div className="brand-mark">
            <span className="brand-orb" />
            <div className="brand-name">
              <strong>time-lock-note</strong>
              <span>Temporal timeline</span>
            </div>
          </div>
          <TopTabs />
          <WalletButton />
        </header>

        <main className="detail-slab" style={{ marginTop: 18 }}>
          <VaultCalendarHeader title="Timeline" subtitle="A lightweight view of what is waiting, and what is already open." />

          <div className="hero-grid" style={{ marginTop: 18 }}>
            <section className="section-panel">
              <h2 className="panel-title">Upcoming Unlocks</h2>
              <div className="note-list timeline-line" style={{ marginTop: 14 }}>
                {upcoming.length ? upcoming.map((note) => (
                  <article key={note.id} className="time-lock-card">
                    <header>
                      <div>
                        <h3>{note.title}</h3>
                        <p>{formatDateTime(note.unlockTime)}</p>
                      </div>
                      <LockStatusChip tone={getStatusLabel(note.unlockTime) === 'unlocks soon' ? 'soon' : 'sealed'} label={getStatusLabel(note.unlockTime)} />
                    </header>
                    <p>Waiting for unlock.</p>
                  </article>
                )) : <EmptyState title="No upcoming items" message="Create a sealed note to populate this timeline." actionHref="/create" actionLabel="Create Lock" />}
              </div>
            </section>

            <section className="section-panel">
              <h2 className="panel-title">Revealed History</h2>
              <div className="note-list timeline-line" style={{ marginTop: 14 }}>
                {revealed.length ? revealed.map((note) => (
                  <article key={note.id} className="time-lock-card">
                    <header>
                      <div>
                        <h3>{note.title}</h3>
                        <p>{formatDateTime(note.unlockTime)}</p>
                      </div>
                      <LockStatusChip tone="revealed" label="revealed" />
                    </header>
                    <p>{note.text}</p>
                  </article>
                )) : <EmptyState title="Nothing revealed yet" message="Your unlocked notes will appear here in time order." actionHref="/my" actionLabel="View My Locks" />}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
