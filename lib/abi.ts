export const BASE_TIME_LOCK_NOTE_ABI = [
  {
    type: 'function',
    name: 'write',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'text', type: 'string' },
      { name: 'delaySeconds', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'read',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
] as const;

export const BASE_TIME_LOCK_NOTE_ADDRESS = '0xcb151bde5327e41ab3ff35d6881b47e43db253f2' as const;
