import Link from 'next/link';

export function EmptyState({
  title,
  message,
  actionHref,
  actionLabel,
}: {
  title: string;
  message: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      <Link href={actionHref} className="primary-btn">
        {actionLabel}
      </Link>
    </div>
  );
}
