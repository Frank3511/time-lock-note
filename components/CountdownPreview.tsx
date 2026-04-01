'use client';

import { CountdownPanel } from './CountdownPanel';
import { LockStatusChip } from './LockStatusChip';

export function CountdownPreview({ target }: { target: number }) {
  return (
    <div className="side-panel">
      <div style={{ display: 'grid', gap: 12 }}>
        <LockStatusChip tone={target <= Date.now() ? 'revealed' : 'soon'} label={target <= Date.now() ? 'Revealed' : 'Countdown'} />
        <CountdownPanel target={target} subtitle="Next unlock window" />
      </div>
    </div>
  );
}
