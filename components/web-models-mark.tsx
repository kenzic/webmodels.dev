import type { CSSProperties } from "react";

/**
 * The Web Models API mark — two brackets (the user's device) holding three
 * offset layers (the model). Drawn on a 48 × 48 grid with 12-unit divisions.
 *
 * The middle layer is always shifted right by 4 units and always carries the
 * signal colour; never centre it, never recolour the whole mark to an
 * implementer's palette.
 */
export function WebModelsMark({
  size = 48,
  ink = "#0B1B3A",
  signal = "#2431C4",
  strokeWidth = 3.4,
  style,
  className,
}: {
  size?: number;
  /** Bracket + outer-layer colour. Navy on light, Panel on navy. */
  ink?: string;
  /** Middle-layer colour. Indigo on light, #8C9DFF on navy. */
  signal?: string;
  /** 3.4 units at display sizes; thicken to ~5 below 20px. */
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={style}
      className={className}
    >
      <path
        d="M14 5H5v38h9"
        stroke={ink}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      <path
        d="M34 5h9v38h-9"
        stroke={ink}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      <rect x="16" y="12" width="16" height="6" fill={ink} />
      <rect x="20" y="21" width="16" height="6" fill={signal} />
      <rect x="16" y="30" width="16" height="6" fill={ink} />
    </svg>
  );
}

/**
 * The mark at small sizes: heavier stroke and taller layers so it survives a
 * favicon, a badge, or a spec footer. Use below ~28px.
 */
export function WebModelsMarkCompact({
  size = 22,
  ink = "#0B1B3A",
  signal = "#2431C4",
  strokeWidth = 4,
  style,
}: {
  size?: number;
  ink?: string;
  signal?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={style}
    >
      <path
        d="M14 5H5v38h9"
        stroke={ink}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      <path
        d="M34 5h9v38h-9"
        stroke={ink}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      <rect x="16" y="11" width="16" height="7" fill={ink} />
      <rect x="20" y="20.5" width="16" height="7" fill={signal} />
      <rect x="16" y="30" width="16" height="7" fill={ink} />
    </svg>
  );
}
