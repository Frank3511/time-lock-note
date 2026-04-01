'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button type="button" className="wallet-button" onClick={() => disconnect()}>
        <span className="wallet-dot" />
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="wallet-button"
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending || !connectors.length}
    >
      <span className="wallet-dot" />
      {isPending ? 'Connecting' : 'Connect Wallet'}
    </button>
  );
}
