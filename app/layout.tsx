import type { ReactNode } from 'react';
import { Providers } from './providers';
import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>time-lock-note</title>
        <meta name="description" content="A Base time-lock note mini app for sealing and revealing delayed messages." />
        <meta name="base:app_id" content="69c22f7b3c2c56b9bbd2f616" />
        <meta
          name="talentapp:project_verification"
          content="69b5c0357f492674e84294b703f53da1733be13f137881d207d98d1ead2d517e2d6cb4f0a12b1ec4ae2defdd9586e2cbe67025fa26e79290c42aed3ceb1d36ce"
        />
        <meta name="theme-color" content="#F8FAFF" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
