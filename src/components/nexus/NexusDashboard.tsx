import { useState } from "react";
import NeuralCoreCanvas from "./NeuralCoreCanvas";
import { Panel, PanelHeader } from "./Panel";
import { SystemMetrics } from "./SystemMetrics";
import { ProgressBar } from "./ProgressBar";
import { Sparkline } from "./Sparkline";
import {
  Search,
  Code2,
  PenLine,
  BarChart3,
  Workflow,
  Plus,
  Brain,
  Sparkles,
  Lightbulb,
  Globe,
  FileText,
  Database,
  Puzzle,
  Wrench,
  Mic,
  ArrowRight,
  Command,
  Activity,
  Cpu,
  HardDrive,
  NetworkIcon,
  MemoryStick,
  Triangle,
  Waves,
  Focus,
  Palette,
  Bot,
  PieChart,
  type LucideIcon,
} from "./icons";

type ModuleItem = {
  icon: LucideIcon;
  label: string;
  status: "Active" | "Idle";
};

const modules: ModuleItem[] = [
  { icon: Search, label: "BADANIA", status: "Active" },
  { icon: Code2, label: "KOD", status: "Active" },
  { icon: PenLine, label: "PISANIE", status: "Active" },
  { icon: BarChart3, label: "ANALIZA", status: "Active" },
  { icon: Workflow, label: "AUTOMATYZACJA", status: "Active" },
];

type AgentCard = {
  id: string;
  icon: LucideIcon;
  name: string;
  task: string;
  progress: number;
  color: string;
  position: string;
  status: "Running" | "Thinking" | "Idle";
  uptime: string;
  cpu: number;
  memory: string;
  lastAction: string;
};

const agents: AgentCard[] = [
  {
    id: "researcher",
    icon: Search,
    name: "Badacz",
    task: "Analizuje trendy rynkowe",
    progress: 87,
    color: "var(--neon-violet)",
    position: "top-[12%] left-[6%]",
    status: "Running",
    uptime: "01:42:18",
    cpu: 34,
    memory: "1.2 GB",
    lastAction: "Zindeksowano 248 źródeł",
  },
  {
    id: "analyst",
    icon: PieChart,
    name: "Analityk",
    task: "Przetwarza dane",
    progress: 91,
    color: "var(--neon-blue)",
    position: "top-[14%] right-[6%]",
    status: "Running",
    uptime: "02:08:55",
    cpu: 51,
    memory: "2.4 GB",
    lastAction: "Obliczono 12 metryk",
  },
  {
    id: "coder",
    icon: Code2,
    name: "Programista",
    task: "Refaktoryzuje kod",
    progress: 62,
    color: "var(--neon-cyan)",
    position: "top-[42%] left-[2%]",
    status: "Thinking",
    uptime: "00:54:03",
    cpu: 22,
    memory: "0.9 GB",
    lastAction: "Zmieniono 8 plików",
  },
  {
    id: "designer",
    icon: Palette,
    name: "Projektant",
    task: "Generuje grafiki",
    progress: 78,
    color: "var(--neon-pink)",
    position: "top-[44%] right-[2%]",
    status: "Running",
    uptime: "01:11:42",
    cpu: 47,
    memory: "1.8 GB",
    lastAction: "Wyrenderowano 5 klatek",
  },
  {
    id: "writer",
    icon: PenLine,
    name: "Pisarz",
    task: "Tworzy treści",
    progress: 43,
    color: "var(--neon-blue)",
    position: "bottom-[18%] left-[8%]",
    status: "Thinking",
    uptime: "00:23:11",
    cpu: 18,
    memory: "0.6 GB",
    lastAction: "Naszkicowano 3 sekcje",
  },
  {
    id: "automator",
    icon: Bot,
    name: "Automatyk",
    task: "Uruchamia procesy",
    progress: 64,
    color: "var(--neon-amber)",
    position: "bottom-[10%] right-[8%]",
    status: "Running",
    uptime: "03:31:09",
    cpu: 29,
    memory: "1.1 GB",
    lastAction: "Wywołano 14 hooków",
  },
];

const memorySpark = [12, 18, 14, 22, 30, 26, 38, 32, 44, 36, 52, 48, 60, 55, 68, 62, 72, 65, 78, 70];
const cpuSpark = [20, 24, 22, 30, 28, 34, 30, 38, 36, 42, 38, 44];
const gpuSpark = [40, 38, 44, 50, 46, 52, 48, 56, 52, 60, 55, 62];
const networkSpark = [10, 14, 12, 18, 16, 22, 20, 26, 22, 30, 28, 34];
const sessionSpark = [30, 42, 35, 50, 44, 58, 52, 64, 58, 70, 64, 78, 72, 84, 78, 90];

export function NexusDashboard() {
  const [hoverAgent, setHoverAgent] = useState<string | null>(null);
  const [pinnedAgent, setPinnedAgent] = useState<string | null>("researcher");
  const [voiceActive, setVoiceActive] = useState(false);
  const [coreGlow, setCoreGlow] = useState(1);
  const [coreDensity, setCoreDensity] = useState(1);
  const [coreSpeed, setCoreSpeed] = useState(1);
  const activeId = hoverAgent ?? pinnedAgent;
  const activeAgent = agents.find((a) => a.id === activeId) ?? agents[0];

  function cycleAgent() {
    const idx = agents.findIndex((a) => a.id === pinnedAgent);
    const next = agents[(idx + 1) % agents.length];
    setPinnedAgent(next.id);
  }

  return (
    <div className="relative h-screen overflow-hidden font-display text-foreground">
      <div className="aurora absolute inset-0" />
      <div className="ring-grid absolute inset-0 opacity-[0.45]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.08_0.03_280/0.75)_100%)]" />
      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => {
          const top = (i * 53) % 100;
          const left = (i * 37) % 100;
          const size = 2 + (i % 3);
          const dur = 8 + (i % 7);
          return (
            <span
              key={i}
              className="absolute rounded-full bg-[var(--neon-violet)] animate-float"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
                opacity: 0.25 + ((i % 5) / 10),
                boxShadow: `0 0 ${4 + size * 2}px var(--neon-violet)`,
                animationDuration: `${dur}s`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 mx-auto grid h-screen max-w-[1600px] grid-cols-12 gap-3 p-3 lg:p-4">
        {/* LEFT COLUMN */}
        <aside className="col-span-12 flex flex-col gap-3 overflow-y-auto lg:col-span-3 xl:col-span-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-blue)] opacity-30 blur-md" />
              <Triangle className="relative h-6 w-6 text-[var(--neon-violet)]" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-xl font-semibold tracking-[0.25em]">NEXUS</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                AI Agent OS
              </div>
            </div>
          </div>

          {/* Core modules */}
          <Panel>
            <PanelHeader
              icon={<Triangle className="h-3 w-3 text-[var(--neon-violet)]" />}
              title="Core Modules"
            />
            <div className="space-y-2">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.label}
                    className="group flex w-full items-center gap-3 rounded-lg border border-transparent bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-[var(--neon-violet)]/30 hover:bg-[var(--neon-violet)]/10"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--neon-violet)]/20 to-[var(--neon-blue)]/10">
                      <Icon className="h-3.5 w-3.5 text-[var(--neon-violet)]" />
                    </div>
                    <span className="flex-1 font-mono text-[11px] font-medium tracking-[0.15em]">
                      {m.label}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[var(--neon-green)]">
                      <span className="h-1 w-1 rounded-full bg-[var(--neon-green)] shadow-[0_0_6px_var(--neon-green)]" />
                      {m.status === "Active" ? "Aktywny" : "Bezczynny"}
                    </span>
                  </button>
                );
              })}
              <button className="flex w-full items-center gap-3 rounded-lg border border-dashed border-white/10 px-3 py-2.5 text-left text-muted-foreground transition hover:border-[var(--neon-violet)]/40 hover:text-foreground">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5">
                  <Plus className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.15em]">Dodaj moduł</span>
              </button>
            </div>
          </Panel>

          {/* Memory stream */}
          <Panel>
            <PanelHeader
              icon={<Waves className="h-3 w-3 text-[var(--neon-blue)]" />}
              title="Strumień Pamięci"
            />
            <div className="flex h-12 items-end gap-[3px]">
              {memorySpark.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${v}%`,
                    background: `linear-gradient(180deg, var(--neon-violet), var(--neon-blue))`,
                    opacity: 0.55 + (i / memorySpark.length) * 0.45,
                    boxShadow: "0 0 6px var(--neon-violet)",
                  }}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>Pamięć długoterminowa</span>
              <span className="text-foreground">7.2 TB / 10 TB</span>
            </div>
            <ProgressBar value={72} className="mt-2" />
          </Panel>

          {/* Focus */}
          <Panel>
            <PanelHeader
              icon={<Focus className="h-3 w-3 text-[var(--neon-cyan)]" />}
              title="Skupienie"
            />
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-sm bg-[var(--neon-cyan)] shadow-[0_0_6px_var(--neon-cyan)]" />
                  <span className="text-sm font-medium">Głęboka praca</span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">Stan przepływu</div>
              </div>
              <RingProgress value={92} />
            </div>
          </Panel>

          {/* Orb */}
          <div className="hidden lg:flex flex-1 items-end justify-start gap-3 px-2 pb-2">
            <div className="relative h-24 w-24 animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--neon-violet)]/30 to-[var(--neon-blue)]/20 blur-xl" />
              <div className="absolute inset-2 rounded-full border border-[var(--neon-violet)]/40" />
              <div className="absolute inset-4 rounded-full border border-[var(--neon-blue)]/30 animate-slow-spin" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-violet)] shadow-[0_0_20px_var(--neon-violet)] animate-pulse-glow" />
            </div>
            <button className="self-end rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur transition hover:border-[var(--neon-violet)]/50">
              <Mic className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </aside>

        {/* CENTER COLUMN */}
        <main className="relative col-span-12 flex min-h-0 flex-col lg:col-span-6 xl:col-span-7">
          {/* Top bar — listening + agent */}
          <div className="flex items-start justify-between gap-3 px-2">
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => setVoiceActive((v) => !v)}
              aria-pressed={voiceActive}
              className={`hidden md:flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur transition ${
                voiceActive
                  ? "border-[var(--neon-pink)]/60 bg-[var(--neon-pink)]/10 shadow-[0_0_20px_oklch(0.75_0.25_340/0.4)]"
                  : "border-white/10 bg-white/[0.04] hover:border-[var(--neon-violet)]/40"
              }`}
            >
              <Mic
                className={`h-3 w-3 ${voiceActive ? "text-[var(--neon-pink)]" : "text-muted-foreground"}`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                  voiceActive ? "text-[var(--neon-pink)]" : "text-muted-foreground"
                }`}
              >
                {voiceActive ? "Słucham" : "Głos wył."}
              </span>
              <div className="flex h-4 items-center gap-[2px]">
                {[3, 6, 4, 8, 5, 7, 4, 9, 6, 5, 7, 4].map((h, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-full"
                    style={{
                      height: `${(voiceActive ? h : 2) * 1.5}px`,
                      background: voiceActive ? "var(--neon-pink)" : "oklch(0.5 0.05 280)",
                      animation: voiceActive ? `bar-pulse 0.${4 + (i % 5)}s ease-in-out infinite` : "none",
                      boxShadow: voiceActive ? "0 0 4px var(--neon-pink)" : "none",
                      transition: "height .4s ease",
                    }}
                  />
                ))}
              </div>
            </button>
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] shadow-[0_0_6px_var(--neon-green)]" />
                <div className="leading-tight">
                  <div className="text-xs font-medium">Lokalny Agent AI</div>
                  <div className="font-mono text-[9px] text-muted-foreground">Online</div>
                </div>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur transition hover:border-[var(--neon-violet)]/40">
                <Command className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Greeting */}
          <div className="mt-3 px-2 animate-rise">
            <h1 className="font-display text-3xl font-light leading-tight tracking-tight md:text-4xl xl:text-5xl neon-text">
              Dzień dobry, <span className="text-gradient-brand font-medium">Twórco</span>
            </h1>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm text-shimmer inline-block">
              Co dziś tworzymy?
            </p>
          </div>

          {/* Quick actions */}
          <div className="mt-3 flex flex-wrap gap-2 px-2">
            <QuickAction icon={Sparkles} title="Inteligentny Plan" sub="AI ułoży plan działania" delay={100} />
            <QuickAction icon={Brain} title="Głęboka Analiza" sub="Eksperckie spostrzeżenia" delay={200} />
            <QuickAction icon={Lightbulb} title="Stwórz Cokolwiek" sub="Ożyw swoje pomysły" delay={300} />
          </div>

          {/* Neural visualization with floating agents */}
          <div className="relative mt-2 flex-1 min-h-0">
            {/* Concentric expanding rings */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute h-[280px] w-[280px] rounded-full border animate-ring"
                  style={{
                    borderColor: voiceActive
                      ? "color-mix(in oklab, var(--neon-pink) 60%, transparent)"
                      : "color-mix(in oklab, var(--neon-violet) 40%, transparent)",
                    animationDelay: `${i * (voiceActive ? 0.5 : 1.2)}s`,
                    animationDuration: voiceActive ? "1.8s" : "3.5s",
                  }}
                />
              ))}
            </div>

            {/* Voice mode — circular waveform */}
            {voiceActive && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <svg width="360" height="360" viewBox="0 0 360 360" className="animate-slow-spin">
                  {Array.from({ length: 64 }).map((_, i) => {
                    const a = (i / 64) * Math.PI * 2;
                    const baseR = 140;
                    const amp = 8 + ((i * 13) % 22);
                    const x1 = 180 + Math.cos(a) * baseR;
                    const y1 = 180 + Math.sin(a) * baseR;
                    const x2 = 180 + Math.cos(a) * (baseR + amp);
                    const y2 = 180 + Math.sin(a) * (baseR + amp);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="var(--neon-pink)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        style={{
                          animation: `bar-pulse 0.${4 + (i % 6)}s ease-in-out infinite`,
                          filter: "drop-shadow(0 0 4px var(--neon-pink))",
                          opacity: 0.7,
                        }}
                      />
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Core controls — visible during voice mode */}
            {voiceActive && (
              <div className="absolute right-3 top-3 z-20 w-56 animate-rise rounded-xl border border-[var(--neon-pink)]/30 bg-black/55 p-3 backdrop-blur-xl shadow-[0_0_30px_oklch(0.75_0.25_340/0.25)]">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-pink)] shadow-[0_0_6px_var(--neon-pink)]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--neon-pink)]">
                    Strojenie Rdzenia
                  </span>
                </div>
                {[
                  { label: "Blask", val: coreGlow, set: setCoreGlow, min: 0.2, max: 2, step: 0.05 },
                  { label: "Gęstość", val: coreDensity, set: setCoreDensity, min: 0.2, max: 1.5, step: 0.05 },
                  { label: "Prędkość", val: coreSpeed, set: setCoreSpeed, min: 0.2, max: 3, step: 0.05 },
                ].map((s) => (
                  <label key={s.label} className="mb-2 flex flex-col gap-1 last:mb-0">
                    <div className="flex justify-between font-mono text-[10px] text-white/70">
                      <span>{s.label}</span>
                      <span className="tabular-nums text-white/40">{s.val.toFixed(2)}×</span>
                    </div>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={s.val}
                      onChange={(e) => s.set(Number(e.target.value))}
                      className="w-full accent-[var(--neon-pink)]"
                    />
                  </label>
                ))}
              </div>
            )}

            {/* spacer to keep prior closing */}
            {false && (
              <div />

            {/* Rotating orbital rings */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-[420px] w-[420px]">
                <div className="absolute inset-0 rounded-full border border-dashed border-[var(--neon-violet)]/25 animate-slow-spin" />
                <div className="absolute inset-8 rounded-full border border-[var(--neon-blue)]/20 animate-spin-rev" />
                <div className="absolute inset-16 rounded-full border border-dashed border-[var(--neon-cyan)]/20 animate-spin-mid" />
                {[
                  { r: 210, color: "var(--neon-violet)", dur: 18 },
                  { r: 170, color: "var(--neon-pink)", dur: 13 },
                  { r: 130, color: "var(--neon-cyan)", dur: 9 },
                ].map((o, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background: o.color,
                      boxShadow: `0 0 12px ${o.color}, 0 0 24px ${o.color}`,
                      ["--orbit-r" as string]: `${o.r}px`,
                      animation: `orbit ${voiceActive ? o.dur / 2.5 : o.dur}s linear infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Core image — interactive */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={cycleAgent}
                aria-label={`Przełącz aktywnego agenta. Obecnie: ${activeAgent.name}`}
                className="group relative h-full w-full max-h-[520px] max-w-[680px] cursor-pointer focus:outline-none"
                style={{ ["--core-color" as string]: voiceActive ? "var(--neon-pink)" : activeAgent.color }}
              >
                <div
                  className="absolute inset-0 rounded-full blur-2xl animate-pulse-glow transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at center, ${voiceActive ? "var(--neon-pink)" : activeAgent.color} 0%, transparent 55%)`,
                    opacity: voiceActive ? 0.7 : 0.45,
                    animationDuration: voiceActive ? "1.4s" : "4s",
                  }}
                />
                <div
                  className="relative h-full w-full select-none transition-all duration-500 group-hover:scale-[1.03]"
                  style={{
                    filter: `drop-shadow(0 0 ${voiceActive ? 90 : 60}px ${voiceActive ? "var(--neon-pink)" : activeAgent.color})`,
                    transform: voiceActive ? "scale(1.04)" : undefined,
                  }}
                  aria-label="Rdzeń sieci neuronowej"
                >
                  <NeuralCoreCanvas
                    voiceActive={voiceActive}
                    glow={coreGlow}
                    density={coreDensity}
                    speedMul={coreSpeed}
                  />
                </div>

                {/* Center HUD with active agent details */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 w-[220px] -translate-x-1/2 -translate-y-1/2">
                  <div
                    key={activeAgent.id}
                    className="glass animate-rise rounded-2xl px-4 py-3 text-left backdrop-blur-xl"
                    style={{
                      borderColor: `color-mix(in oklab, ${activeAgent.color} 50%, transparent)`,
                      boxShadow: `0 0 40px color-mix(in oklab, ${activeAgent.color} 35%, transparent)`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full animate-pulse-glow"
                        style={{ background: activeAgent.color, boxShadow: `0 0 10px ${activeAgent.color}` }}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                        Aktywny Agent
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-baseline justify-between">
                      <div className="text-base font-semibold" style={{ color: activeAgent.color }}>
                        {activeAgent.name}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: activeAgent.color }}>
                        {activeAgent.status === "Running" ? "Pracuje" : activeAgent.status === "Thinking" ? "Myśli" : "Bezczynny"}
                      </span>
                    </div>
                    <div className="mt-1 truncate text-[11px] text-muted-foreground">{activeAgent.task}</div>
                    <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[9px]">
                      <Stat label="CZAS" value={activeAgent.uptime} />
                      <Stat label="CPU" value={`${activeAgent.cpu}%`} />
                      <Stat label="PAMIĘĆ" value={activeAgent.memory} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <ProgressBar value={activeAgent.progress} color={activeAgent.color} />
                      <span className="font-mono text-[10px] tabular-nums" style={{ color: activeAgent.color }}>
                        {activeAgent.progress}%
                      </span>
                    </div>
                    <div className="mt-2 truncate font-mono text-[9px] text-muted-foreground">
                      › {activeAgent.lastAction}
                    </div>
                  </div>
                  <div className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70">
                    Kliknij rdzeń, aby zmienić ↻
                  </div>
                </div>

                {/* Connection lines from core to active agent */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeAgent.color} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={activeAgent.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>

            {/* Agent cards */}
            {agents.map((a, idx) => {
              const Icon = a.icon;
              const isActive = a.id === activeId;
              return (
                <button
                  type="button"
                  key={a.id}
                  onMouseEnter={() => setHoverAgent(a.id)}
                  onMouseLeave={() => setHoverAgent(null)}
                  onClick={() => setPinnedAgent(a.id)}
                  aria-pressed={pinnedAgent === a.id}
                  className={`absolute ${a.position} w-[180px] text-left md:w-[200px] glass magnetic rounded-xl px-3 py-2.5 animate-float animate-rise transition-all duration-500 focus:outline-none ${
                    isActive ? "z-20 scale-[1.06]" : "z-10"
                  }`}
                  style={{
                    animationDelay: `${idx * 0.4}s, ${idx * 120}ms`,
                    borderColor: isActive ? `color-mix(in oklab, ${a.color} 60%, transparent)` : undefined,
                    boxShadow: isActive
                      ? `0 0 0 1px ${a.color}, 0 0 36px color-mix(in oklab, ${a.color} 45%, transparent)`
                      : undefined,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="relative flex h-6 w-6 items-center justify-center rounded-md"
                      style={{
                        background: `linear-gradient(135deg, ${a.color}, oklch(0.4 0.15 280))`,
                        boxShadow: `0 0 14px ${a.color}`,
                      }}
                    >
                      <Icon className="h-3 w-3 text-white" />
                      <span
                        className="absolute -inset-1 rounded-md animate-ring"
                        style={{ border: `1px solid ${a.color}`, animationDelay: `${idx * 0.5}s` }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold leading-tight">{a.name}</div>
                      <div className="truncate font-mono text-[9px] text-muted-foreground">
                        {a.task}
                      </div>
                    </div>
                    {pinnedAgent === a.id && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: a.color, boxShadow: `0 0 8px ${a.color}` }}
                      />
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Activity className="h-2.5 w-2.5 shrink-0 animate-ticker" style={{ color: a.color }} />
                    <ProgressBar value={a.progress} color={a.color} />
                    <span className="font-mono text-[10px] font-medium tabular-nums" style={{ color: a.color }}>
                      {a.progress}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Command bar */}
          <div className="mt-4 px-2">
            <div className="glass conic-border rounded-2xl p-4 relative overflow-hidden">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-violet)] to-transparent animate-scan" />
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--neon-violet)] shadow-[0_0_10px_var(--neon-violet)] animate-pulse-glow" />
                <input
                  className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                  placeholder="Zapytaj o cokolwiek lub wydaj polecenie..."
                />
                <span className="hidden md:flex items-center gap-1.5 font-mono text-[10px] text-[var(--neon-green)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] shadow-[0_0_8px_var(--neon-green)] animate-pulse-glow" />
                  NA ŻYWO
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <ToolChip icon={Sparkles} />
                  <ToolChip icon={Mic} />
                  <ToolChip icon={Globe} label="Internet" />
                  <ToolChip icon={FileText} label="Pliki" />
                  <ToolChip icon={Database} label="Pamięć" />
                  <ToolChip icon={Puzzle} label="Wtyczki" />
                  <ToolChip icon={Wrench} label="Narzędzia" />
                </div>
                <button className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--neon-violet)]/50 bg-gradient-to-br from-[var(--neon-violet)]/40 to-[var(--neon-blue)]/30 transition hover:scale-110 hover:shadow-[0_0_30px_var(--neon-violet)]">
                  <span className="absolute inset-0 rounded-full animate-ring border border-[var(--neon-violet)]/60" />
                  <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
              Naciśnij <span className="text-foreground">⌘K</span>, aby otworzyć paletę poleceń
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN */}
        <aside className="col-span-12 flex flex-col gap-3 overflow-y-auto lg:col-span-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* System overview */}
          <Panel>
            <PanelHeader
              icon={<Cpu className="h-3 w-3 text-[var(--neon-violet)]" />}
              title="Przegląd Systemu"
              right={
                <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[var(--neon-green)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--neon-green)] shadow-[0_0_6px_var(--neon-green)] animate-pulse-glow" />
                  Na żywo
                </span>
              }
            />
            <SystemMetrics />
          </Panel>

          {/* Thought process */}
          <Panel>
            <PanelHeader
              icon={<Triangle className="h-3 w-3 text-[var(--neon-violet)]" />}
              title="Proces Myślowy"
              right={
                <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[var(--neon-green)]">
                  Na żywo <ArrowRight className="h-2.5 w-2.5" />
                </span>
              }
            />
            <div className="mb-3 font-mono text-[10px] text-muted-foreground">
              Buduję odpowiedź...
            </div>
            <div className="space-y-2.5">
              <ThoughtStep label="Rozumienie intencji" pct={100} done />
              <ThoughtStep label="Rozszerzanie wiedzy" pct={100} done />
              <ThoughtStep label="Wyszukiwanie powiązań" pct={87} active />
              <ThoughtStep label="Generowanie odpowiedzi" pct={0} pending />
              <ThoughtStep label="Optymalizacja wyniku" pct={0} pending />
            </div>
          </Panel>

          {/* Active tasks */}
          <Panel>
            <PanelHeader
              icon={<Workflow className="h-3 w-3 text-[var(--neon-violet)]" />}
              title="Aktywne Zadania"
              right={<span className="font-mono text-[10px] text-muted-foreground">4 W toku</span>}
            />
            <div className="space-y-2">
              <TaskRow icon={Search} name="Badanie rynku" pct={87} color="var(--neon-violet)" />
              <TaskRow icon={BarChart3} name="Analiza konkurencji" pct={62} color="var(--neon-pink)" />
              <TaskRow icon={PenLine} name="Strategia treści" pct={43} color="var(--neon-blue)" />
              <TaskRow icon={Code2} name="Optymalizacja kodu" pct={21} color="var(--neon-cyan)" />
            </div>
            <button className="mt-3 flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-muted-foreground transition hover:text-foreground">
              Zobacz wszystkie zadania <ArrowRight className="h-3 w-3" />
            </button>
          </Panel>

          {/* Flow state */}
          <Panel>
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[var(--neon-cyan)]/20 blur-md" />
                <Focus className="relative h-5 w-5 text-[var(--neon-cyan)]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Stan Przepływu</div>
                <div className="font-mono text-[10px] text-muted-foreground">Tryb głębokiego skupienia</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg font-medium tracking-wider">02:35:42</div>
                <div className="font-mono text-[9px] text-muted-foreground">Aktywna sesja</div>
              </div>
              <Sparkline values={sessionSpark} color="var(--neon-cyan)" fill="var(--neon-cyan)" width={70} />
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  sub,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  delay?: number;
}) {
  return (
    <button
      style={{ animationDelay: `${delay}ms` }}
      className="group magnetic animate-rise relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur transition hover:border-[var(--neon-violet)]/50 hover:bg-[var(--neon-violet)]/5 hover:shadow-[0_0_30px_oklch(0.72_0.25_300/0.35)]"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--neon-violet)]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-violet)]/30 to-[var(--neon-blue)]/20 group-hover:shadow-[0_0_16px_var(--neon-violet)]">
        <Icon className="h-4 w-4 text-[var(--neon-violet)] transition group-hover:scale-110" />
      </div>
      <div className="relative text-left">
        <div className="text-sm font-medium leading-tight">{title}</div>
        <div className="font-mono text-[10px] text-muted-foreground">{sub}</div>
      </div>
    </button>
  );
}

function ToolChip({ icon: Icon, label }: { icon: LucideIcon; label?: string }) {
  return (
    <button className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--neon-violet)]/50 hover:bg-[var(--neon-violet)]/10 hover:text-foreground hover:shadow-[0_0_18px_oklch(0.72_0.25_300/0.4)]">
      <Icon className="h-3.5 w-3.5 transition group-hover:text-[var(--neon-violet)]" />
      {label && <span className="font-mono text-[11px] tracking-wider">{label}</span>}
    </button>
  );
}

function SysRow({
  icon,
  label,
  value,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex justify-end">{children}</div>
      <span className="font-mono text-xs font-medium tabular-nums">{value}</span>
    </div>
  );
}

function ThoughtStep({
  label,
  pct,
  done,
  active,
  pending,
}: {
  label: string;
  pct: number;
  done?: boolean;
  active?: boolean;
  pending?: boolean;
}) {
  const color = done ? "var(--neon-green)" : active ? "var(--neon-violet)" : "oklch(0.4 0.02 280)";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full ${
          active ? "animate-pulse-glow" : ""
        }`}
        style={{
          background: pending ? "transparent" : color,
          border: `1.5px solid ${color}`,
          boxShadow: pending ? "none" : `0 0 8px ${color}`,
        }}
      />
      <span
        className={`flex-1 text-xs ${pending ? "text-muted-foreground/60" : "text-foreground"}`}
      >
        {label}
      </span>
      <span
        className="font-mono text-[10px] tabular-nums"
        style={{ color: pending ? "oklch(0.5 0.02 280)" : color }}
      >
        {pending ? "..." : `${pct}%`}
      </span>
    </div>
  );
}

function TaskRow({
  icon: Icon,
  name,
  pct,
  color,
}: {
  icon: LucideIcon;
  name: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <div
        className="flex h-6 w-6 items-center justify-center rounded-md"
        style={{ background: `${color.replace(")", " / 0.2)")}`, color }}
      >
        <Icon className="h-3 w-3" />
      </div>
      <span className="flex-1 truncate text-xs font-medium">{name}</span>
      <span className="font-mono text-[11px] tabular-nums" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

function RingProgress({ value }: { value: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-14 w-14">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} stroke="oklch(0.3 0.04 280)" strokeWidth="4" fill="none" />
        <circle
          cx="28"
          cy="28"
          r={r}
          stroke="var(--neon-cyan)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 0 4px var(--neon-cyan))" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold text-[var(--neon-cyan)]">
        {value}%
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1.5">
      <div className="text-[8px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 truncate text-[11px] font-medium tabular-nums text-foreground">
        {value}
      </div>
    </div>
  );
}
