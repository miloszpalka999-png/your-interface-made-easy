import type { ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Panel({ children, className, delay = 0 }: Props) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div
      onMouseMove={onMove}
      style={{ animationDelay: `${delay}ms` }}
      className={`glass animate-rise rounded-2xl p-4 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  icon,
  title,
  right,
}: {
  icon?: ReactNode;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </span>
      </div>
      {right}
    </div>
  );
}
