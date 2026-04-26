import { useEffect, useState } from "react";
import { Cpu, MemoryStick, HardDrive, Network as NetworkIcon, Activity } from "lucide-react";

/* ---------------- Radial gauge ---------------- */
function RadialGauge({
  value,
  label,
  unit,
  color,
  icon,
}: {
  value: number;
  label: string;
  unit: string;
  color: string;
  icon: React.ReactNode;
}) {
  const size = 96;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const arc = 0.78; // 78% of circle (3/4 dial)
  const visible = c * arc;
  const offset = visible - (value / 100) * visible;
  const id = `g-${label}`;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-[140deg]">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="oklch(0.25 0.04 280 / 0.6)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${visible} ${c}`}
          strokeLinecap="round"
        />
        {/* value */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${visible - offset} ${c}`}
          style={{
            filter: `drop-shadow(0 0 6px ${color})`,
            transition: "stroke-dasharray .8s cubic-bezier(.2,.8,.2,1)",
          }}
        />
        {/* tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * arc * Math.PI * 2;
          const inner = r - 8;
          const outer = r - 4;
          const x1 = size / 2 + Math.cos(a) * inner;
          const y1 = size / 2 + Math.sin(a) * inner;
          const x2 = size / 2 + Math.cos(a) * outer;
          const y2 = size / 2 + Math.sin(a) * outer;
          const lit = i / 24 <= value / 100;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={lit ? color : "oklch(0.3 0.04 280 / 0.5)"}
              strokeWidth="1"
              opacity={lit ? 0.9 : 0.4}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <div style={{ color }}>{icon}</div>
        <div className="mt-0.5 font-mono text-base font-semibold tabular-nums" style={{ color }}>
          {value}
          <span className="ml-0.5 text-[9px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ---------------- Area chart (CPU/GPU stacked) ---------------- */
function AreaChart({
  cpu,
  gpu,
  height = 90,
}: {
  cpu: number[];
  gpu: number[];
  height?: number;
}) {
  const width = 280;
  const pad = 4;
  const max = 100;
  const step = (width - pad * 2) / (cpu.length - 1);

  const buildPath = (vals: number[]) => {
    const pts = vals.map((v, i) => {
      const x = pad + i * step;
      const y = pad + (1 - v / max) * (height - pad * 2);
      return [x, y] as const;
    });
    const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const area = `${line} L${pad + (vals.length - 1) * step},${height - pad} L${pad},${height - pad} Z`;
    return { line, area };
  };

  const cpuP = buildPath(cpu);
  const gpuP = buildPath(gpu);

  return (
    <div className="relative">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="cpu-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--neon-violet)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--neon-violet)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gpu-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* grid lines */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1={pad}
            x2={width - pad}
            y1={pad + p * (height - pad * 2)}
            y2={pad + p * (height - pad * 2)}
            stroke="oklch(0.5 0.05 280 / 0.12)"
            strokeDasharray="2 4"
          />
        ))}
        {/* GPU first (under) */}
        <path d={gpuP.area} fill="url(#gpu-grad)" />
        <path d={gpuP.line} fill="none" stroke="var(--neon-blue)" strokeWidth="1.5" strokeLinejoin="round" />
        {/* CPU on top */}
        <path d={cpuP.area} fill="url(#cpu-grad)" />
        <path d={cpuP.line} fill="none" stroke="var(--neon-violet)" strokeWidth="1.5" strokeLinejoin="round" />
        {/* current dot */}
        {(() => {
          const last = cpu[cpu.length - 1];
          const x = pad + (cpu.length - 1) * step;
          const y = pad + (1 - last / max) * (height - pad * 2);
          return (
            <>
              <circle cx={x} cy={y} r="6" fill="var(--neon-violet)" opacity="0.2" />
              <circle cx={x} cy={y} r="2.5" fill="var(--neon-violet)" />
            </>
          );
        })()}
      </svg>
      <div className="mt-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-3 rounded-full bg-[var(--neon-violet)] shadow-[0_0_6px_var(--neon-violet)]" />
            CPU
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-3 rounded-full bg-[var(--neon-blue)] shadow-[0_0_6px_var(--neon-blue)]" />
            GPU
          </span>
        </div>
        <span className="tabular-nums">60s</span>
      </div>
    </div>
  );
}

/* ---------------- Memory blocks ---------------- */
function MemoryGrid({ used, total }: { used: number; total: number }) {
  const cells = 32;
  const filled = Math.round((used / total) * cells);
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Alokacja Pamięci
          </div>
          <div className="font-mono text-sm tabular-nums">
            <span className="text-[var(--neon-violet)] font-semibold">{used.toFixed(1)}</span>
            <span className="text-muted-foreground"> / {total} GB</span>
          </div>
        </div>
        <div className="font-mono text-[10px] tabular-nums text-[var(--neon-violet)]">
          {Math.round((used / total) * 100)}%
        </div>
      </div>
      <div className="mt-2 grid grid-cols-16 gap-[3px]" style={{ gridTemplateColumns: "repeat(16, 1fr)" }}>
        {Array.from({ length: cells }).map((_, i) => {
          const lit = i < filled;
          const intensity = lit ? Math.min(1, 0.5 + (i / cells) * 0.5) : 0.08;
          return (
            <div
              key={i}
              className="h-2 rounded-[2px] transition-all"
              style={{
                background: lit
                  ? `linear-gradient(180deg, var(--neon-violet), var(--neon-blue))`
                  : "oklch(0.3 0.04 280 / 0.4)",
                boxShadow: lit ? `0 0 6px oklch(0.72 0.25 300 / ${intensity})` : "none",
                opacity: lit ? intensity : 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Storage ring ---------------- */
function StorageRing({ used, total }: { used: number; total: number }) {
  const segments = [
    { label: "System", value: 42, color: "var(--neon-violet)" },
    { label: "Aplikacje", value: 78, color: "var(--neon-blue)" },
    { label: "Dane", value: 62, color: "var(--neon-cyan)" },
  ];
  const totalUsed = segments.reduce((s, x) => s + x.value, 0);
  const r = 26;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-3">
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={r} stroke="oklch(0.3 0.04 280 / 0.5)" strokeWidth="6" fill="none" />
        {segments.map((seg) => {
          const len = (seg.value / total) * c;
          const dash = `${len} ${c - len}`;
          const dashOffset = -offset;
          offset += len;
          return (
            <circle
              key={seg.label}
              cx="36"
              cy="36"
              r={r}
              stroke={seg.color}
              strokeWidth="6"
              fill="none"
              strokeDasharray={dash}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              style={{ filter: `drop-shadow(0 0 4px ${seg.color})` }}
            />
          );
        })}
      </svg>
      <div className="flex-1">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
Dysk
          </span>
          <span className="font-mono text-xs tabular-nums">
            <span className="text-foreground font-semibold">{totalUsed}</span>
            <span className="text-muted-foreground"> / {total} GB</span>
          </span>
        </div>
        <div className="mt-1.5 space-y-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2 font-mono text-[10px]">
              <span
                className="h-1.5 w-1.5 rounded-sm shrink-0"
                style={{ background: seg.color, boxShadow: `0 0 4px ${seg.color}` }}
              />
              <span className="flex-1 text-muted-foreground">{seg.label}</span>
              <span className="tabular-nums" style={{ color: seg.color }}>
                {seg.value} GB
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Network bars (up/down) ---------------- */
function NetworkBars({ down, up }: { down: number[]; up: number[] }) {
  const height = 56;
  const max = Math.max(...down, ...up, 1);
  return (
    <div>
      <div className="mb-1.5 flex items-end justify-between font-mono text-[10px]">
        <div className="flex items-center gap-3 text-[9px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--neon-green)] shadow-[0_0_4px_var(--neon-green)]" />
            ↓ {down[down.length - 1]}<span className="text-muted-foreground/70 ml-0.5">Mb/s</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--neon-pink)] shadow-[0_0_4px_var(--neon-pink)]" />
            ↑ {up[up.length - 1]}<span className="text-muted-foreground/70 ml-0.5">Mb/s</span>
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Przepustowość</span>
      </div>
      <div className="flex h-[56px] items-end gap-[3px]" style={{ height }}>
        {down.map((d, i) => {
          const u = up[i] ?? 0;
          const dh = (d / max) * (height / 2 - 1);
          const uh = (u / max) * (height / 2 - 1);
          return (
            <div key={i} className="flex flex-1 flex-col items-stretch justify-center gap-[1px]">
              <div
                className="rounded-[1px]"
                style={{
                  height: `${dh}px`,
                  background: "linear-gradient(180deg, var(--neon-green), oklch(0.5 0.18 155))",
                  boxShadow: "0 0 4px var(--neon-green)",
                  opacity: 0.6 + (i / down.length) * 0.4,
                }}
              />
              <div
                className="rounded-[1px]"
                style={{
                  height: `${uh}px`,
                  background: "linear-gradient(0deg, var(--neon-pink), oklch(0.5 0.2 340))",
                  boxShadow: "0 0 4px var(--neon-pink)",
                  opacity: 0.6 + (i / down.length) * 0.4,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Live data hook ---------------- */
function useLiveSeries(initial: number[], min: number, max: number) {
  const [series, setSeries] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        const drift = (Math.random() - 0.5) * (max - min) * 0.2;
        const next = Math.max(min, Math.min(max, last + drift));
        return [...prev.slice(1), Math.round(next)];
      });
    }, 1400);
    return () => clearInterval(id);
  }, [min, max]);
  return series;
}

/* ---------------- Main ---------------- */
export function SystemMetrics() {
  const cpuSeries = useLiveSeries(
    [22, 28, 24, 31, 27, 35, 29, 38, 33, 41, 36, 44, 39, 47, 42, 38, 35, 41, 38, 36],
    15,
    65,
  );
  const gpuSeries = useLiveSeries(
    [40, 38, 44, 50, 46, 52, 48, 56, 52, 60, 55, 62, 58, 54, 49, 51, 47, 52, 56, 53],
    30,
    80,
  );
  const downSeries = useLiveSeries(
    [42, 50, 48, 60, 55, 68, 62, 72, 65, 78, 70, 82, 75, 88, 80, 72, 78, 70, 65, 72],
    30,
    100,
  );
  const upSeries = useLiveSeries(
    [12, 14, 18, 22, 16, 28, 20, 32, 24, 36, 28, 30, 24, 38, 30, 26, 32, 28, 22, 30],
    8,
    50,
  );

  const cpuNow = cpuSeries[cpuSeries.length - 1];
  const gpuNow = gpuSeries[gpuSeries.length - 1];
  const memUsed = 7.2;
  const memTotal = 16;

  return (
    <div className="space-y-4">
      {/* gauges row */}
      <div className="flex items-start justify-between gap-2">
        <RadialGauge
          value={cpuNow}
          label="CPU"
          unit="%"
          color="var(--neon-violet)"
          icon={<Cpu className="h-3 w-3" />}
        />
        <RadialGauge
          value={gpuNow}
          label="GPU"
          unit="%"
          color="var(--neon-blue)"
          icon={<Activity className="h-3 w-3" />}
        />
        <RadialGauge
          value={Math.round((memUsed / memTotal) * 100)}
          label="MEM"
          unit="%"
          color="var(--neon-cyan)"
          icon={<MemoryStick className="h-3 w-3" />}
        />
      </div>

      <div className="divider-glow" />

      {/* compute area chart */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-3 w-3 text-[var(--neon-violet)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Obciążenie obliczeń
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[var(--neon-green)]">
            <span className="h-1 w-1 rounded-full bg-[var(--neon-green)] shadow-[0_0_6px_var(--neon-green)] animate-pulse-glow" />
            Na żywo
          </span>
        </div>
        <AreaChart cpu={cpuSeries} gpu={gpuSeries} />
      </div>

      <div className="divider-glow" />

      {/* memory */}
      <MemoryGrid used={memUsed} total={memTotal} />

      <div className="divider-glow" />

      {/* storage */}
      <div className="flex items-center gap-2">
        <HardDrive className="h-3 w-3 text-[var(--neon-cyan)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Partycje dysku
        </span>
      </div>
      <StorageRing used={182} total={512} />

      <div className="divider-glow" />

      {/* network */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <NetworkIcon className="h-3 w-3 text-[var(--neon-green)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Sieć (we/wy)
          </span>
        </div>
        <NetworkBars down={downSeries} up={upSeries} />
      </div>
    </div>
  );
}
