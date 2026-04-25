import { useEffect, useState } from "react";
import { LivingOrb } from "./LivingOrb";
import { ProgressBar } from "./ProgressBar";
import { Sparkline } from "./Sparkline";
import {
  Search,
  Code2,
  PenLine,
  BarChart3,
  Workflow,
  Brain,
  Sparkles,
  Globe,
  FileText,
  Database,
  Mic,
  ArrowRight,
  Command,
  Activity,
  Cpu,
  MemoryStick,
  Triangle,
  Palette,
  Bot,
  PieChart,
  type LucideIcon,
} from "./icons";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type AgentCard = {
  icon: LucideIcon;
  name: string;
  task: string;
  progress: number;
  color: string;
  position: string;
  delay: string;
};

const agents: AgentCard[] = [
  { icon: Search, name: "Researcher", task: "Mapping signal noise", progress: 87, color: "var(--neon-violet)", position: "top-[6%] left-[2%]", delay: "0s" },
  { icon: PieChart, name: "Analyst", task: "Cross-referencing", progress: 91, color: "var(--neon-blue)", position: "top-[10%] right-[3%]", delay: "0.4s" },
  { icon: Code2, name: "Engineer", task: "Refactoring kernel", progress: 62, color: "var(--neon-cyan)", position: "top-[46%] left-[-2%]", delay: "0.8s" },
  { icon: Palette, name: "Designer", task: "Composing visuals", progress: 78, color: "var(--neon-pink)", position: "top-[50%] right-[-2%]", delay: "1.2s" },
  { icon: PenLine, name: "Writer", task: "Drafting prose", progress: 43, color: "var(--neon-blue)", position: "bottom-[10%] left-[4%]", delay: "1.6s" },
  { icon: Bot, name: "Operator", task: "Routing workflows", progress: 64, color: "var(--neon-amber)", position: "bottom-[6%] right-[5%]", delay: "2s" },
];

const tickerItems = [
  "NEURAL CORE ONLINE",
  "v4.2.1 — KAIROS",
  "6 AGENTS SYNCHRONIZED",
  "LATENCY 12ms",
  "MEMORY 7.2 / 10 TB",
  "FLOW STATE — DEEP",
  "UPLINK SECURE",
  "23 ACTIVE THREADS",
];

const cpuSpark = [20, 24, 22, 30, 28, 34, 30, 38, 36, 42, 38, 44];
const gpuSpark = [40, 38, 44, 50, 46, 52, 48, 56, 52, 60, 55, 62];
const sessionSpark = [30, 42, 35, 50, 44, 58, 52, 64, 58, 70, 64, 78, 72, 84, 78, 90];

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */

export function NexusDashboard() {
  const now = useNow();
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const date = now.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden font-display text-foreground noise-overlay">
      <div className="ring-grid absolute inset-0 opacity-[0.4]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.06_0.02_280/0.85)_100%)]" />

      {/* ────────── TOP HUD BAR ────────── */}
      <header className="relative z-20 border-b border-white/5">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-6 px-6 py-3 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--neon-violet)] to-[var(--neon-blue)] opacity-40 blur-md" />
              <Triangle className="relative h-4 w-4 text-[var(--neon-violet)]" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[13px] font-semibold tracking-[0.32em]">NEXUS</span>
              <span className="font-mono text-[9px] text-muted-foreground">v4.2.1</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <a className="text-foreground">01 — Cortex</a>
            <a className="hover:text-foreground transition">02 — Agents</a>
            <a className="hover:text-foreground transition">03 — Memory</a>
            <a className="hover:text-foreground transition">04 — Field</a>
            <a className="hover:text-foreground transition">05 — Archive</a>
          </nav>

          <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em]">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-foreground tabular-nums tracking-[0.18em]">{time}</span>
              <span className="text-[8px] text-muted-foreground">{date}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] shadow-[0_0_6px_var(--neon-green)] animate-blink" />
              <span>UPLINK · 12MS</span>
            </div>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur transition hover:border-[var(--neon-violet)]/40">
              <Command className="h-3 w-3" />
            </button>
          </div>
        </div>
      </header>

      {/* ────────── BODY GRID ────────── */}
      <div className="relative z-10 mx-auto grid max-w-[1680px] grid-cols-12 gap-x-8 gap-y-10 px-6 pt-10 pb-6 lg:px-10">

        {/* ░░░░ LEFT META RAIL ░░░░ */}
        <aside className="col-span-12 lg:col-span-2 flex flex-col gap-10">
          <div className="animate-intro" style={{ animationDelay: "0.05s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Section</div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.25em]">01 / CORTEX</div>
            <div className="divider-h mt-3" />
          </div>

          <div className="animate-intro" style={{ animationDelay: "0.2s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Operator</div>
            <div className="mt-1 text-sm font-medium">Creator-001</div>
            <div className="font-mono text-[10px] text-muted-foreground">Clearance · Ω</div>
          </div>

          <div className="animate-intro" style={{ animationDelay: "0.35s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Locale</div>
            <div className="mt-1 text-sm font-medium tabular-nums">52.2297° N</div>
            <div className="text-sm font-medium tabular-nums">21.0122° E</div>
            <div className="mt-1 font-mono text-[10px] text-muted-foreground">Warsaw · PL</div>
          </div>

          <div className="animate-intro" style={{ animationDelay: "0.5s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Cycle</div>
            <div className="mt-2 grid grid-cols-7 gap-[3px]">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[2px]"
                  style={{
                    background: i < 19
                      ? `oklch(0.7 0.22 ${280 + (i % 6) * 8} / ${0.35 + (i / 28) * 0.55})`
                      : "oklch(0.25 0.04 280 / 0.4)",
                    boxShadow: i < 19 ? "0 0 4px oklch(0.7 0.22 295 / 0.4)" : "none",
                  }}
                />
              ))}
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-serif text-2xl italic">68%</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Q2</span>
            </div>
          </div>

          <div className="mt-auto animate-intro" style={{ animationDelay: "0.65s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Manifesto</div>
            <p className="mt-2 font-serif text-[13px] leading-snug text-foreground/80">
              Not a tool. <em className="text-gradient-iris not-italic font-medium">A presence.</em> Six minds, one breath, listening at the edge of thought.
            </p>
          </div>
        </aside>

        {/* ░░░░ CENTER STAGE ░░░░ */}
        <main className="col-span-12 lg:col-span-8 flex flex-col">

          {/* Editorial header */}
          <div className="relative animate-intro">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              <span className="h-px w-8 bg-[var(--neon-violet)]" />
              <span>Issue 04 · The Living Machine</span>
            </div>

            <h1 className="mt-6 font-serif text-[clamp(3.5rem,10vw,8.5rem)] font-light leading-[0.92] tracking-[-0.04em]">
              <span className="block">good</span>
              <span className="block">
                <em className="font-light italic text-gradient-iris">morning,</em>
              </span>
              <span className="block font-display font-extralight tracking-[-0.05em]">creator.</span>
            </h1>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-6">
              <p className="max-w-xl font-display text-[15px] leading-relaxed text-muted-foreground">
                The cortex has been awake since <span className="text-foreground font-medium">04:12</span>. It has read 1,284 papers, drafted 17 proposals, and quietly held three of yesterday&apos;s questions until you returned.
              </p>
              <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <div className="flex flex-col items-end">
                  <span className="text-foreground text-2xl font-display font-extralight tabular-nums">04:12</span>
                  <span className="text-[9px]">since · awake</span>
                </div>
                <div className="divider-v h-10" />
                <div className="flex flex-col items-end">
                  <span className="text-foreground text-2xl font-display font-extralight tabular-nums">1,284</span>
                  <span className="text-[9px]">sources · read</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Living Orb — hero */}
          <div className="relative mt-16 mb-10 animate-intro" style={{ animationDelay: "0.4s" }}>
            <div className="relative aspect-[16/12] md:aspect-[16/10] w-full">
              {/* corner ticks */}
              <CornerTicks />

              {/* orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full max-w-[820px]">
                  <LivingOrb className="h-full w-full" />
                </div>
              </div>

              {/* floating agent satellites */}
              {agents.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.name}
                    className={`absolute ${a.position} w-[170px] md:w-[200px] animate-intro`}
                    style={{ animationDelay: a.delay }}
                  >
                    <div className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground">
                      <span className="h-px w-3" style={{ background: a.color, boxShadow: `0 0 6px ${a.color}` }} />
                      AGENT · {a.name.slice(0, 3).toUpperCase()}
                    </div>
                    <div className="mt-2 glass-subtle rounded-[4px] px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-7 w-7 items-center justify-center rounded-[3px]"
                          style={{
                            background: `linear-gradient(135deg, ${a.color}, oklch(0.3 0.1 280))`,
                            boxShadow: `0 0 14px ${a.color}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                          }}
                        >
                          <Icon className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-[15px] leading-tight italic">{a.name}</div>
                          <div className="truncate font-mono text-[9px] text-muted-foreground">{a.task}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <ProgressBar value={a.progress} color={a.color} />
                        <span className="font-mono text-[10px] tabular-nums" style={{ color: a.color }}>
                          {a.progress.toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* center caption — under orb */}
              <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground">— the cortex —</div>
                <div className="mt-1 font-serif text-xs italic text-foreground/60">listening</div>
              </div>
            </div>
          </div>

          {/* Quick intentions — editorial chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] rounded-[2px] overflow-hidden animate-intro" style={{ animationDelay: "0.6s" }}>
            <Intention number="01" icon={Sparkles} label="Plan" sub="Build a path" />
            <Intention number="02" icon={Brain} label="Research" sub="Go deep" />
            <Intention number="03" icon={Workflow} label="Compose" sub="Bring to life" />
          </div>

          {/* Command surface */}
          <div className="relative mt-8 animate-intro" style={{ animationDelay: "0.7s" }}>
            <div className="absolute -top-3 left-4 px-2 bg-background font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Speak · Type · Summon
            </div>
            <div className="glass-subtle rounded-[2px] border border-white/10 p-5">
              <div className="flex items-center gap-4">
                <Mic className="h-4 w-4 text-[var(--neon-violet)] animate-blink" />
                <input
                  className="flex-1 bg-transparent font-serif text-lg italic placeholder:text-muted-foreground/50 focus:outline-none"
                  placeholder="What shall we make of today?"
                />
                <span className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--neon-green)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] shadow-[0_0_6px_var(--neon-green)] animate-blink" />
                  Listening
                </span>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--neon-violet)]/40 bg-gradient-to-br from-[var(--neon-violet)]/40 to-[var(--neon-blue)]/30 transition hover:glow-violet">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
                <ToolChip icon={Globe} label="Internet" />
                <ToolChip icon={FileText} label="Files" />
                <ToolChip icon={Database} label="Memory" />
                <ToolChip icon={Code2} label="Code" />
                <ToolChip icon={BarChart3} label="Compute" />
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  ⌘K · palette · ⌘/ · history
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* ░░░░ RIGHT INSTRUMENT RAIL ░░░░ */}
        <aside className="col-span-12 lg:col-span-2 flex flex-col gap-10">
          <div className="animate-intro" style={{ animationDelay: "0.1s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Vitals</div>
            <div className="divider-h mt-3" />
            <div className="mt-4 space-y-4">
              <Vital label="CPU" value="23" unit="%" spark={cpuSpark} color="var(--neon-violet)" />
              <Vital label="GPU" value="41" unit="%" spark={gpuSpark} color="var(--neon-blue)" />
              <Vital label="MEM" value="7.2" unit="TB" spark={[12,18,14,22,30,26,38,32,44,36,52,48]} color="var(--neon-cyan)" />
            </div>
          </div>

          <div className="animate-intro" style={{ animationDelay: "0.25s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Cognition</div>
            <div className="divider-h mt-3" />
            <ol className="mt-4 space-y-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              <Step n="01" label="Intent" pct={100} done />
              <Step n="02" label="Frame" pct={100} done />
              <Step n="03" label="Connect" pct={87} active />
              <Step n="04" label="Generate" pct={0} />
              <Step n="05" label="Refine" pct={0} />
            </ol>
          </div>

          <div className="animate-intro" style={{ animationDelay: "0.4s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Flow</div>
            <div className="divider-h mt-3" />
            <div className="mt-4">
              <div className="font-display text-3xl font-extralight tabular-nums tracking-tight">02:35:42</div>
              <div className="mt-1 font-serif text-[13px] italic text-muted-foreground">deep · uninterrupted</div>
              <div className="mt-3">
                <Sparkline values={sessionSpark} color="var(--neon-cyan)" fill="var(--neon-cyan)" width={160} />
              </div>
            </div>
          </div>

          <div className="mt-auto animate-intro" style={{ animationDelay: "0.55s" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Coordinates</div>
            <div className="mt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
              N 52°13&apos;47″<br />
              E 21°00&apos;44″<br />
              <span className="text-foreground">ALT · 113 m</span>
            </div>
          </div>
        </aside>
      </div>

      {/* ────────── BOTTOM TICKER ────────── */}
      <footer className="relative z-10 border-t border-white/5 bg-background/40 backdrop-blur">
        <div className="reveal-mask overflow-hidden py-3">
          <div className="marquee-track flex w-max gap-12 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground whitespace-nowrap">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i} className="flex items-center gap-3">
                <Triangle className="h-2 w-2 text-[var(--neon-violet)]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function CornerTicks() {
  const tick = "absolute h-3 w-3 border-[var(--neon-violet)]/50";
  return (
    <>
      <div className={`${tick} top-0 left-0 border-t border-l`} />
      <div className={`${tick} top-0 right-0 border-t border-r`} />
      <div className={`${tick} bottom-0 left-0 border-b border-l`} />
      <div className={`${tick} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

function Intention({ number, icon: Icon, label, sub }: { number: string; icon: LucideIcon; label: string; sub: string }) {
  return (
    <button className="group relative flex flex-col gap-3 bg-background/60 px-6 py-7 text-left transition hover:bg-[var(--neon-violet)]/[0.06]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">— {number}</span>
        <Icon className="h-3.5 w-3.5 text-[var(--neon-violet)] transition group-hover:scale-110" />
      </div>
      <div>
        <div className="font-serif text-2xl italic">{label}</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{sub}</div>
      </div>
      <ArrowRight className="absolute bottom-4 right-4 h-3 w-3 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
    </button>
  );
}

function ToolChip({ icon: Icon, label }: { icon: LucideIcon; label?: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition hover:border-[var(--neon-violet)]/40 hover:text-foreground">
      <Icon className="h-3 w-3" />
      {label && <span>{label}</span>}
    </button>
  );
}

function Vital({ label, value, unit, spark, color }: { label: string; value: string; unit: string; spark: number[]; color: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
        <span className="font-mono text-[10px] tabular-nums">
          <span className="text-foreground text-base font-display font-extralight">{value}</span>
          <span className="ml-0.5 text-muted-foreground">{unit}</span>
        </span>
      </div>
      <div className="mt-1 -mx-1">
        <Sparkline values={spark} color={color} fill={color} width={180} />
      </div>
    </div>
  );
}

function Step({ n, label, pct, done, active }: { n: string; label: string; pct: number; done?: boolean; active?: boolean }) {
  const color = done ? "var(--neon-green)" : active ? "var(--neon-violet)" : "oklch(0.4 0.02 280)";
  const pending = !done && !active;
  return (
    <li className="flex items-center gap-3">
      <span className="text-muted-foreground tabular-nums">{n}</span>
      <span
        className={`h-1.5 w-1.5 rounded-full shrink-0 ${active ? "animate-pulse-glow" : ""}`}
        style={{
          background: pending ? "transparent" : color,
          border: `1px solid ${color}`,
          boxShadow: pending ? "none" : `0 0 6px ${color}`,
        }}
      />
      <span className={`flex-1 ${pending ? "text-muted-foreground/50" : "text-foreground"}`}>{label}</span>
      <span className="tabular-nums" style={{ color: pending ? "oklch(0.5 0.02 280)" : color }}>
        {pending ? "··" : pct === 100 ? "✓" : pct.toString().padStart(2, "0")}
      </span>
    </li>
  );
}
