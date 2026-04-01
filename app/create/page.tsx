'use client';

import { useAccount } from 'wagmi';
import { ActionBar } from '@/components/ActionBar';
import { CountdownPanel } from '@/components/CountdownPanel';
import { LockStatusChip } from '@/components/LockStatusChip';
import { SealNoteComposer } from '@/components/SealNoteComposer';
import { TimeIndexRail } from '@/components/TimeIndexRail';
import { TopTabs } from '@/components/TopTabs';
import { VaultCalendarHeader } from '@/components/VaultCalendarHeader';
import { WalletButton } from '@/components/WalletButton';
import { useNotes } from '@/lib/use-notes';
import { getStatusLabel } from '@/lib/time';

export default function CreateLockPage() {
  const { address } = useAccount();
  const { latest } = useNotes(address);
  const latestStatus = latest ? getStatusLabel(latest.unlockTime) : 'sealed';

  return (
    <div className="app-shell">
      <div className="page-frame">
        <header className="nav-bar">
          <div className="brand-mark">
            <span className="brand-orb" />
            <div className="brand-name">
              <strong>time-lock-note</strong>
              <span>Sealing chamber</span>
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
                title="Create Lock"
                subtitle="Write now, set the unlock time, and seal the note into the future archive."
              />

              <div className="hero-grid">
                <div className="section-panel">
                  <h2 className="panel-title">Sealed Composer</h2>
                  <div style={{ marginTop: 14 }}>
                    <SealNoteComposer />
                  </div>
                </div>
                <div className="side-panel">
                  <div style={{ display: 'grid', gap: 14 }}>
                    <LockStatusChip tone={latest ? (latestStatus === 'revealed' ? 'revealed' : latestStatus === 'unlocks soon' ? 'soon' : 'sealed') : 'sealed'} label={latestStatus} />
                    <CountdownPanel target={latest?.unlockTime ?? Date.now() + 1000 * 60 * 60 * 24} subtitle="Your most recent unlock" />
                    <div className="mini-panel">
                      <strong>Seal flow</strong>
                      <span>Connect wallet, write the note, set the unlock time, and submit.</span>
                    </div>
                    <ActionBar primaryHref="/my" primaryLabel="View My Locks" secondaryHref="/" secondaryLabel="Back to Hub" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
