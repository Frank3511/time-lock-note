export function SealNoteButton({
  isPending,
  disabled,
  onClick,
}: {
  isPending?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="seal-btn" onClick={onClick} disabled={disabled}>
      {isPending ? 'Sealing Note...' : 'Create Lock'}
    </button>
  );
}
