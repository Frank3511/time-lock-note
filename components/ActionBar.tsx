import Link from 'next/link';

export function ActionBar({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="action-row">
      <Link href={primaryHref} className="primary-btn">
        {primaryLabel}
      </Link>
      <Link href={secondaryHref} className="secondary-btn">
        {secondaryLabel}
      </Link>
    </div>
  );
}
