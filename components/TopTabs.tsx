'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Vault Hub' },
  { href: '/create', label: 'Create Lock' },
  { href: '/my', label: 'My Locks' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/about', label: 'About' },
];

export function TopTabs() {
  const pathname = usePathname();

  return (
    <nav className="top-tabs" aria-label="Primary">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href} className="top-tab" data-active={pathname === tab.href}>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
