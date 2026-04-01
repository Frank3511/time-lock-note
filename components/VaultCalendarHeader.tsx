'use client';

import { formatDateOnly } from '@/lib/time';

export function VaultCalendarHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="section-heading">
      <span className="vault-label">
        <span className="dot" />
        {formatDateOnly(Date.now())}
      </span>
      <h1 className="vault-title">{title}</h1>
      <p className="vault-copy">{subtitle}</p>
    </div>
  );
}
