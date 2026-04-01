'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { EmptyState } from '@/components/EmptyState';
import { LockStatusChip } from '@/components/LockStatusChip';
import { TimeLockCard } from '@/components/TimeLockCard';
import { TopTabs } from '@/components/TopTabs';
import { VaultCalendarHeader } from '@/components/VaultCalendarHeader';
import { WalletButton } from '@/components/WalletButton';
import { useNotes } from '@/lib/use-notes';
import { getStatusLabel } from '@/lib/time';

export default function MyLocksPage() {
  const { address } = useAccount();
  const { notes } = useNotes(address);
  const latestStatus = notes[0] ? getStatusLabel(notes[0].unlockTime) : 'sealed';

  return (
    <div className="app-shell">
      <div className="page-frame">
        <header className="nav-bar">
          <div className="brand-mark">
            <span className="brand-orb" />
            <div className="brand-name">
              <strong>time-lock-note</strong>
              <span>Personal archive</span>
            </div>
          </div>
          <TopTabs />
          <WalletButton />
        </header>

        <main className="detail-slab" style={{ marginTop: 18 }}>
          <div className="hero-grid">
            <section className="section-panel">
              <VaultCalendarHeader
                title="My Locked Notes"
                subtitle="A chronological archive of notes sealed from now and released later."
              />

              <div className="stat-grid" style={{ marginTop: 18 }}>
                <div className="stat-card">
                  <span>Total Records</span>
                  <strong>{notes.length}</strong>
                </div>
                <div className="stat-card">
                  <span>Wallet Scope</span>
                  <strong>{address ? 'Connected' : 'Demo view'}</strong>
                </div>
                <div className="stat-card">
                  <span>Newest Note</span>
                  <strong>{notes[0]?.title ?? 'None yet'}</strong>
                </div>
              </div>

              <div className="note-list timeline-line" style={{ marginTop: 18 }}>
                {notes.length ? notes.map((note) => <TimeLockCard key={note.id} note={note} />) : <EmptyState title="No locked notes" message="Create your first lock to build a personal archive." actionHref="/create" actionLabel="Create Lock" />}
              </div>
            </section>

            <aside className="side-panel">
              <div style={{ display: 'grid', gap: 14 }}>
                <LockStatusChip tone={latestStatus === 'revealed' ? 'revealed' : latestStatus === 'unlocks soon' ? 'soon' : 'sealed'} label={latestStatus} />
                <div className="mini-panel">
                  <strong>Archive order</strong>
                  <span>The newest sealed note appears first, while older records remain in the timeline below.</span>
                </div>
                <div className="mini-panel">
                  <strong>Quick action</strong>
                  <span>Move back to the hub or start a new sealed note.</span>
                </div>
                <div className="action-row">
                  <Link href="/" className="secondary-btn">
                    Back to Hub
                  </Link>
                  <Link href="/create" className="primary-btn">
                    Seal Note
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
