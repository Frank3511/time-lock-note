import { formatDateOnly } from '@/lib/time';

const milestones = [
  { label: 'Current Archive', note: 'Live notes and latest status.' },
  { label: 'Soonest Unlock', note: 'The next reveal is warming up.' },
  { label: 'Unlocked History', note: 'Records that are ready to read.' },
  { label: 'Base Anchor', note: 'A sealed note leaves a chain trace.' },
];

export function TimeIndexRail() {
  return (
    <aside className="rail">
      <h2>Time Index</h2>
      <div className="rail-list">
        {milestones.map((item) => (
          <div key={item.label} className="rail-item">
            <strong>{item.label}</strong>
            <span>{item.note}</span>
          </div>
        ))}
        <div className="rail-item">
          <strong>{formatDateOnly(Date.now())}</strong>
          <span>Archive view updated for today.</span>
        </div>
      </div>
    </aside>
  );
}
