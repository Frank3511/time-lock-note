export function formatDateTime(value: string | number | Date) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatDateOnly(value: string | number | Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function getCountdownParts(target: number) {
  const delta = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(delta / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, done: delta === 0 };
}

export function getStatusLabel(unlockTime: number) {
  const delta = unlockTime - Date.now();
  if (delta <= 0) return 'revealed';
  if (delta < 1000 * 60 * 60 * 24) return 'unlocks soon';
  if (delta < 1000 * 60 * 60 * 72) return 'locked';
  return 'sealed';
}

export function countdownText(target: number) {
  const { days, hours, minutes, seconds, done } = getCountdownParts(target);
  if (done) return '00d 00h 00m 00s';
  return `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(
    minutes,
  ).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}
