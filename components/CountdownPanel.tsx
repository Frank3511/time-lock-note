'use client';

import { useEffect, useState } from 'react';
import { countdownText } from '@/lib/time';

export function CountdownPanel({ target, subtitle }: { target: number; subtitle: string }) {
  const [value, setValue] = useState('00d 00h 00m 00s');

  useEffect(() => {
    const update = () => setValue(countdownText(target));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <div className="countdown-panel">
      <span>{subtitle}</span>
      <strong suppressHydrationWarning>{value}</strong>
    </div>
  );
}
