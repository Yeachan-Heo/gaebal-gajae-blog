type IconName = 'chevronDown' | 'chevronUp' | 'check';

const paths: Record<IconName, React.ReactNode> = {
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronUp: <path d="M18 15l-6-6-6 6" />,
  check: <path d="M5 12.5l4.25 4.25L19 7" />,
};

export function SiteIcon({
  name,
  className = '',
  size = 16,
  strokeWidth = 2,
}: {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={["ui-icon", className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
