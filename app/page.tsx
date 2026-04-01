'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ActionBar } from '@/components/ActionBar';
import { CountdownPanel } from '@/components/CountdownPanel';
import { EmptyState } from '@/components/EmptyState';
import { LockStatusChip } from '@/components/LockStatusChip';
import { RevealPanel } from '@/components/RevealPanel';
import { TimeIndexRail } from '@/components/TimeIndexRail';
import { TimeLockCard } from '@/components/TimeLockCard';
import { TopTabs } from '@/components/TopTabs';
import { VaultCalendarHeader } from '@/components/VaultCalendarHeader';
import { WalletButton } from '@/components/WalletButton';
import { useNotes } from '@/lib/use-notes';
import { formatDateTime, getStatusLabel } from '@/lib/time';

export default function VaultHubPage() {
  const { address } = useAccount();
  const { latest, notes } = useNotes(address);
  const activeNote = latest ?? notes[0] ?? null;
  const status = activeNote ? getStatusLabel(activeNote.unlockTime) : 'sealed';
  const mockViews = 81 + notes.length * 24;
  const chainWrites = notes.filter((note) => Boolean(note.txHash)).length;

  return (
    <div className="app-shell">
      <div className="page-frame">
        <header className="nav-bar">
          <div className="brand-mark">
            <span className="brand-orb" />
            <div className="brand-name">
              <strong>time-lock-note</strong>
              <span>Future archive hub</span>
            </div>
          </div>
          <TopTabs />
          <WalletButton />
        </header>

        <div className="layout-grid">
          <TimeIndexRail />

          <main className="main-panel">
            <div className="hero-slab">
              <VaultCalendarHeader
                title="Vault Hub"
                subtitle="Seal a note, wait for the unlock time, and reveal it when the archive turns open."
              />

              <div className="stat-grid">
                <div className="stat-card">
                  <span>Current State</span>
                  <strong>{status}</strong>
                </div>
                <div className="stat-card">
                  <span>Connected Notes</span>
                  <strong>{notes.length}</strong>
                </div>
                <div className="stat-card">
                  <span>Latest Unlock</span>
                  <strong>{activeNote ? formatDateTime(activeNote.unlockTime) : 'No record yet'}</strong>
                </div>
              </div>

              <div className="action-row">
                <Link href="/create" className="primary-btn">
                  Seal a Note
                </Link>
                <Link href="/my" className="secondary-btn">
                  View My Locked Notes
                </Link>
              </div>

              <div className="section-panel">
                <h2 className="panel-title">Latest Note</h2>
                <div style={{ marginTop: 14 }}>
                  {activeNote ? <TimeLockCard note={activeNote} /> : <EmptyState title="No notes yet" message="Create your first sealed note to start the archive." actionHref="/create" actionLabel="Create Lock" />}
                </div>
              </div>
            </div>
          </main>

          <aside className="side-panel">
            <div style={{ display: 'grid', gap: 14 }}>
              <LockStatusChip tone={status === 'revealed' ? 'revealed' : status === 'unlocks soon' ? 'soon' : 'sealed'} label={status} />
              {activeNote ? <CountdownPanel target={activeNote.unlockTime} subtitle="Unlock countdown" /> : <CountdownPanel target={Date.now() + 1000 * 60 * 60 * 24} subtitle="Unlock countdown" />}
              {activeNote ? (
                <RevealPanel
                  isRevealed={status === 'revealed'}
                  text={activeNote.text}
                  unlockTimeLabel={`Unlocks ${formatDateTime(activeNote.unlockTime)}`}
                />
              ) : (
                <div className="mini-panel">
                  <strong>Archive ready</strong>
                  <span>Connect a wallet to inspect your latest sealed note.</span>
                </div>
              )}
              <div className="mini-panel">
                <strong>Archive metrics</strong>
                <span>Views {mockViews}</span>
                <span>Writes {chainWrites}</span>
              </div>
              <ActionBar primaryHref="/create" primaryLabel="Seal Note" secondaryHref="/timeline" secondaryLabel="View Timeline" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
