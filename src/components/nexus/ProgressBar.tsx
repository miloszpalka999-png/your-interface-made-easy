type Props = {
  value: number;
  color?: string;
  className?: string;
};

export function ProgressBar({ value, color = "var(--neon-violet)", className }: Props) {
  return (
    <div className={`h-1 w-full overflow-hidden rounded-full bg-white/5 ${className ?? ""}`}>
      <div
        className="h-full rounded-full animate-bar-pulse"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: `linear-gradient(90deg, ${color}, oklch(0.78 0.15 240))`,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </div>
  );
}
