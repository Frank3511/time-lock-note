import { createConfig, http, injected } from 'wagmi';

export const baseChain: any = {
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org' },
  },
};

const connectors = [injected()];

// TODO: Replace this placeholder with the real builder code data suffix once provided.
export const BUILDER_CODE_SUFFIX = 'TODO_REPLACE_WITH_BUILDER_CODE';

export const wagmiConfig = createConfig({
  chains: [baseChain],
  connectors,
  transports: {
    [baseChain.id]: http(),
  },
});
