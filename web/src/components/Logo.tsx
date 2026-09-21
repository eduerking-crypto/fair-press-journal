import type { CSSProperties } from "react";

type LogoVariant = "dark" | "light";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

const serifStack = "var(--font-serif), Georgia, 'Times New Roman', serif";
const sansStack = "var(--font-sans), 'Helvetica Neue', Arial, sans-serif";

const STRAND_A = "#39738a";
const STRAND_B = "#7cbd90";
const RUNG = "#c7dde7";

const wordmarkTitleStyle: CSSProperties = {
  fontFamily: serifStack,
  fontVariant: "small-caps",
  fontWeight: 700,
  fontSize: 19,
  letterSpacing: "0.04em",
};

const wordmarkSubStyle: CSSProperties = {
  fontFamily: sansStack,
  fontWeight: 600,
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

export function DnaMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Fair Press DNA helix mark"
    >
      <rect width={48} height={48} rx={14} fill="#eaf4f7" />
      {/* rungs */}
      <line x1={19} y1={12} x2={29} y2={12} stroke={RUNG} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={16.2} y1={20} x2={31.8} y2={20} stroke={RUNG} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={16.2} y1={28} x2={31.8} y2={28} stroke={RUNG} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={19} y1={36} x2={29} y2={36} stroke={RUNG} strokeWidth={2.4} strokeLinecap="round" />
      {/* strand A */}
      <path
        d="M19 8 C 14 16, 34 20, 29 28 C 24 36, 30 38, 29 40"
        fill="none"
        stroke={STRAND_A}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* strand B (counter-wave) */}
      <path
        d="M29 8 C 34 16, 14 20, 19 28 C 24 36, 18 38, 19 40"
        fill="none"
        stroke={STRAND_B}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* base pairs highlights */}
      <circle cx={19} cy={8} r={2.6} fill={STRAND_A} />
      <circle cx={29} cy={8} r={2.6} fill={STRAND_B} />
      <circle cx={29} cy={40} r={2.6} fill={STRAND_A} />
      <circle cx={19} cy={40} r={2.6} fill={STRAND_B} />
    </svg>
  );
}

export default function Logo({ variant = "dark", className }: LogoProps) {
  const titleColor = variant === "light" ? "#f7f3ec" : "#22303a";
  const subtitleColor = variant === "light" ? "#c9d4d9" : "#5b6b75";

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
    >
      <DnaMark size={42} />
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.2,
        }}
      >
        <span style={{ ...wordmarkTitleStyle, color: titleColor }}>
          Fair Press
        </span>
        <span style={{ ...wordmarkSubStyle, color: subtitleColor }}>
          Journal of Science
        </span>
      </span>
    </span>
  );
}
