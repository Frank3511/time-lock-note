export function LockStatusChip({ tone, label }: { tone: 'sealed' | 'locked' | 'soon' | 'revealed'; label: string }) {
  return (
    <span className="status-chip" data-tone={tone}>
      {label}
    </span>
  );
}
