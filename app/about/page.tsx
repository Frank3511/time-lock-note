'use client';

import Link from 'next/link';
import { TopTabs } from '@/components/TopTabs';
import { VaultCalendarHeader } from '@/components/VaultCalendarHeader';
import { WalletButton } from '@/components/WalletButton';

export default function AboutPage() {
  return (
    <div className="app-shell">
      <div className="page-frame">
        <header className="nav-bar">
          <div className="brand-mark">
            <span className="brand-orb" />
            <div className="brand-name">
              <strong>time-lock-note</strong>
              <span>About</span>
            </div>
          </div>
          <TopTabs />
          <WalletButton />
        </header>

        <main className="detail-slab" style={{ marginTop: 18 }}>
          <div className="section-panel" style={{ maxWidth: 760 }}>
            <VaultCalendarHeader
              title="About"
              subtitle="Write a note now, seal it on Base, and reveal it only after the unlock time."
            />
            <div className="mini-panel" style={{ marginTop: 18 }}>
              <strong>How it works</strong>
              <span>Connect a wallet, seal a note, wait for the timer, and read it later.</span>
            </div>
            <div className="action-row" style={{ marginTop: 18 }}>
              <Link href="/create" className="primary-btn">
                Create Lock
              </Link>
              <Link href="/" className="secondary-btn">
                Vault Hub
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
