'use client';

import { useState } from 'react';

export function CopyNoteButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button type="button" className="copy-btn" onClick={handleCopy}>
      {copied ? 'Copied' : 'Copy Note'}
    </button>
  );
}
