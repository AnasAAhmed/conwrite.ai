interface SplitTextProps {
  text: string;
  mode?: "words" | "chars";
  className?: string;
  itemClassName?: string;
  delayPerItem?: number; // seconds
  duration?: number; // seconds
  y?: number; // px slide
}

export function SplitText2({
  text,
  mode = "words",
  className = "",
  itemClassName = "",
  delayPerItem = 0.04,
  duration = 0.3,
  y = 12,
}: SplitTextProps) {
  const pieces =
    mode === "words" ? text.split(/(\s+)/) : [...text];

  return (
    <h1 className={`inline-block ${className}`} aria-label={text} role="text">
      {pieces.map((piece, i) => {
        const isSpace = /^\s+$/.test(piece);
        if (isSpace) return <span key={`s-${i}`}>{piece}</span>;

        return (
          <span
            key={i}
            className={`split-text-item responsive-filter inline-block will-change-transform ${itemClassName}`}
            style={{
              animationDelay: `${i * delayPerItem}s`,
              animationDuration: `${duration}s`,
              transform: `translateY(${y}px)`,
            }}
          >
            <span className="inline-block">{piece}</span>
          </span>
        );
      })}
    </h1>
  );
}
