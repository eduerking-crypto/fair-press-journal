import type { CSSProperties } from "react";

type LogoVariant = "dark" | "light";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
}

const serifStack = "var(--font-serif), Georgia, 'Times New Roman', serif";
const sansStack = "var(--font-sans), 'Helvetica Neue', Arial, sans-serif";

const monogramTextStyle: CSSProperties = {
  fontFamily: serifStack,
  fontWeight: 700,
  fontSize: 22,
  letterSpacing: 1,
};

export default function Logo({ variant = "dark", className }: LogoProps) {
  const titleColor = variant === "light" ? "#f7f3ec" : "#23201c";
  const subtitleColor = variant === "light" ? "#c9c2bd" : "#5a544b";

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
    >
      <svg
        width={44}
        height={44}
        viewBox="0 0 48 48"
        role="img"
        aria-label="Fair Press monogram"
      >
        <rect width={48} height={48} rx={4} fill="#7a1f2b" />
        <text
          x={24}
          y={25}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#f7f3ec"
          style={monogramTextStyle}
        >
          FP
        </text>
      </svg>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.2,
        }}
      >
        <span
          style={{
            fontFamily: serifStack,
            fontVariant: "small-caps",
            fontWeight: 700,
            fontSize: 19,
            letterSpacing: "0.04em",
            color: titleColor,
          }}
        >
          Fair Press
        </span>
        <span
          style={{
            fontFamily: sansStack,
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: subtitleColor,
          }}
        >
          Journal of Science
        </span>
      </span>
    </span>
  );
}
