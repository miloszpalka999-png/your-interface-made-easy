import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: Props) {
  return (
    <div
      className={`glass rounded-2xl p-4 ${className ?? ""}`}
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
