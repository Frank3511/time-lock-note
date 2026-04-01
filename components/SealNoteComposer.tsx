'use client';

import { useMemo, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { useRouter } from 'next/navigation';
import { BASE_TIME_LOCK_NOTE_ABI, BASE_TIME_LOCK_NOTE_ADDRESS } from '@/lib/abi';
import { createNoteRecord } from '@/lib/notes';
import { formatDateTime } from '@/lib/time';
import { trackTransaction } from '@/utils/track';
import { baseChain } from '@/lib/wagmi';
import { UnlockTimePicker } from './UnlockTimePicker';
import { SealNoteButton } from './SealNoteButton';
import { LockStatusChip } from './LockStatusChip';

const APP_ID = 'app-032';
const APP_NAME = 'time-lock-note';

function toDelaySeconds(unlockTime: string) {
  const target = new Date(unlockTime).getTime();
  const delta = Math.max(0, target - Date.now());
  return Math.max(60, Math.floor(delta / 1000));
}

export function SealNoteComposer() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [title, setTitle] = useState('Future Note');
  const [text, setText] = useState('');
  const [unlockTime, setUnlockTime] = useState(() => {
    const next = new Date(Date.now() + 1000 * 60 * 60 * 24);
    return next.toISOString().slice(0, 16);
  });
  const [status, setStatus] = useState('Ready to seal');
  const [txHash, setTxHash] = useState<string | null>(null);

  const targetDate = useMemo(() => new Date(unlockTime), [unlockTime]);

  async function handleSeal() {
    if (!isConnected || !address) {
      setStatus('Connect a wallet first');
      return;
    }

    if (!text.trim()) {
      setStatus('Write a note first');
      return;
    }

    const delaySeconds = toDelaySeconds(unlockTime);
    setStatus('Submitting to Base');
    try {
      const hash = await writeContractAsync({
        chainId: baseChain.id,
        address: BASE_TIME_LOCK_NOTE_ADDRESS,
        abi: BASE_TIME_LOCK_NOTE_ABI,
        functionName: 'write',
        args: [text.trim(), BigInt(delaySeconds)],
      });

      setTxHash(hash);
      const note = createNoteRecord({
        title: title.trim() || 'Future Note',
        text: text.trim(),
        owner: address,
        unlockTime: targetDate.getTime(),
        txHash: hash,
      });

      await trackTransaction(APP_ID, APP_NAME, address, hash);
      setStatus('Sealed successfully');
      router.push(`/locks/${note.id}`);
    } catch {
      setStatus('Seal failed');
    }
  }

  return (
    <section className="composer-slab">
      <div className="composer-grid">
        <div className="time-meta">
          <LockStatusChip tone={isConnected ? 'sealed' : 'locked'} label={isConnected ? 'Wallet ready' : 'Wallet needed'} />
          <span>{txHash ? `Tx ${txHash.slice(0, 10)}...` : status}</span>
        </div>
        <div className="field-group">
          <label htmlFor="note-title">Note Title</label>
          <input
            id="note-title"
            className="composer-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a short title"
          />
        </div>
        <div className="field-group">
          <label htmlFor="note-text">Note Text</label>
          <textarea
            id="note-text"
            className="composer-textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write something for the future"
          />
        </div>
        <UnlockTimePicker value={unlockTime} onChange={setUnlockTime} />
        <div className="time-meta">
          <span>Unlock at {formatDateTime(targetDate)}</span>
          <span>Chain: Base</span>
        </div>
        <SealNoteButton isPending={isPending} disabled={isPending} onClick={handleSeal} />
      </div>
    </section>
  );
}
