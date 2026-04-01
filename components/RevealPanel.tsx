import { LockStatusChip } from './LockStatusChip';

export function RevealPanel({
  isRevealed,
  text,
  unlockTimeLabel,
}: {
  isRevealed: boolean;
  text: string;
  unlockTimeLabel: string;
}) {
  return (
    <div className="mini-panel">
      <LockStatusChip tone={isRevealed ? 'revealed' : 'locked'} label={isRevealed ? 'Revealed' : 'Sealed'} />
      <span>{unlockTimeLabel}</span>
      <strong style={{ display: 'block', marginTop: 12, marginBottom: 8 }}>Content</strong>
      <p className={isRevealed ? 'record-text' : 'record-text masked-text'}>{isRevealed ? text : 'Hidden until unlock'}</p>
    </div>
  );
}
