import neuralCore from "@/assets/neural-core.jpg";
import { Panel, PanelHeader } from "./Panel";
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
  { icon: Search, label: "RESEARCH", status: "Active" },
  { icon: Code2, label: "CODE", status: "Active" },
  { icon: PenLine, label: "WRITE", status: "Active" },
  { icon: BarChart3, label: "ANALYZE", status: "Active" },
  { icon: Workflow, label: "AUTOMATE", status: "Active" },
];

type AgentCard = {
  icon: LucideIcon;
  name: string;
  task: string;
  progress: number;
  color: string;
  position: string;
};

const agents: AgentCard[] = [
  {
    icon: Search,
    name: "Researcher",
    task: "Analyzing market trends",
    progress: 87,
    color: "var(--neon-violet)",
    position: "top-[12%] left-[6%]",
  },
  {
    icon: PieChart,
    name: "Analyst",
    task: "Processing data",
    progress: 91,
    color: "var(--neon-blue)",
    position: "top-[14%] right-[6%]",
  },
  {
    icon: Code2,
    name: "Coder",
    task: "Refactoring codebase",
    progress: 62,
    color: "var(--neon-cyan)",
    position: "top-[42%] left-[2%]",
  },
  {
    icon: Palette,
    name: "Designer",
    task: "Generating visuals",
    progress: 78,
    color: "var(--neon-pink)",
    position: "top-[44%] right-[2%]",
  },
  {
    icon: PenLine,
    name: "Writer",
    task: "Crafting content",
    progress: 43,
    color: "var(--neon-blue)",
    position: "bottom-[18%] left-[8%]",
  },
  {
    icon: Bot,
    name: "Automator",
    task: "Running workflows",
    progress: 64,
    color: "var(--neon-amber)",
    position: "bottom-[10%] right-[8%]",
  },
];

const memorySpark = [12, 18, 14, 22, 30, 26, 38, 32, 44, 36, 52, 48, 60, 55, 68, 62, 72, 65, 78, 70];
const cpuSpark = [20, 24, 22, 30, 28, 34, 30, 38, 36, 42, 38, 44];
const gpuSpark = [40, 38, 44, 50, 46, 52, 48, 56, 52, 60, 55, 62];
const networkSpark = [10, 14, 12, 18, 16, 22, 20, 26, 22, 30, 28, 34];
const sessionSpark = [30, 42, 35, 50, 44, 58, 52, 64, 58, 70, 64, 78, 72, 84, 78, 90];

export function NexusDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden font-display text-foreground">
      <div className="aurora absolute inset-0" />
      <div className="ring-grid absolute inset-0 opacity-[0.45]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.08_0.03_280/0.75)_100%)]" />
      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => {
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

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] grid-cols-12 gap-4 p-4 lg:p-6">
        {/* LEFT COLUMN */}
        <aside className="col-span-12 flex flex-col gap-4 lg:col-span-3 xl:col-span-2">
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
                      {m.status}
                    </span>
                  </button>
                );
              })}
              <button className="flex w-full items-center gap-3 rounded-lg border border-dashed border-white/10 px-3 py-2.5 text-left text-muted-foreground transition hover:border-[var(--neon-violet)]/40 hover:text-foreground">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5">
                  <Plus className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.15em]">Add module</span>
              </button>
            </div>
          </Panel>

          {/* Memory stream */}
          <Panel>
            <PanelHeader
              icon={<Waves className="h-3 w-3 text-[var(--neon-blue)]" />}
              title="Memory Stream"
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
              <span>Long-term memory</span>
              <span className="text-foreground">7.2 TB / 10 TB</span>
            </div>
            <ProgressBar value={72} className="mt-2" />
          </Panel>

          {/* Focus */}
          <Panel>
            <PanelHeader
              icon={<Focus className="h-3 w-3 text-[var(--neon-cyan)]" />}
              title="Focus"
            />
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-sm bg-[var(--neon-cyan)] shadow-[0_0_6px_var(--neon-cyan)]" />
                  <span className="text-sm font-medium">Deep Work</span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">Flow State</div>
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
        <main className="relative col-span-12 flex flex-col lg:col-span-6 xl:col-span-7">
          {/* Top bar — listening + agent */}
          <div className="flex items-start justify-between gap-4 px-2">
            <div className="flex-1" />
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Listening...
              </span>
              <div className="flex h-4 items-center gap-[2px]">
                {[3, 6, 4, 8, 5, 7, 4, 9, 6, 5, 7, 4].map((h, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-full bg-[var(--neon-violet)]"
                    style={{
                      height: `${h * 1.5}px`,
                      animation: `bar-pulse 1.${i}s ease-in-out infinite`,
                      boxShadow: "0 0 4px var(--neon-violet)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] shadow-[0_0_6px_var(--neon-green)]" />
                <div className="leading-tight">
                  <div className="text-xs font-medium">Local AI Agent</div>
                  <div className="font-mono text-[9px] text-muted-foreground">Online</div>
                </div>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur transition hover:border-[var(--neon-violet)]/40">
                <Command className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Greeting */}
          <div className="mt-4 px-2 animate-rise">
            <h1 className="font-display text-4xl font-light tracking-tight md:text-5xl xl:text-6xl neon-text">
              Good Morning, <span className="text-gradient-brand font-medium">Creator</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base text-shimmer inline-block">
              What shall we build today?
            </p>
          </div>

          {/* Quick actions */}
          <div className="mt-5 flex flex-wrap gap-3 px-2">
            <QuickAction icon={Sparkles} title="Smart Plan" sub="AI will build your plan" delay={100} />
            <QuickAction icon={Brain} title="Deep Research" sub="Get expert insights" delay={200} />
            <QuickAction icon={Lightbulb} title="Create Anything" sub="Bring ideas to life" delay={300} />
          </div>

          {/* Neural visualization with floating agents */}
          <div className="relative mt-4 flex-1 min-h-[460px]">
            {/* Concentric expanding rings */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute h-[280px] w-[280px] rounded-full border border-[var(--neon-violet)]/40 animate-ring"
                  style={{ animationDelay: `${i * 1.2}s` }}
                />
              ))}
            </div>

            {/* Rotating orbital rings */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-[420px] w-[420px]">
                <div className="absolute inset-0 rounded-full border border-dashed border-[var(--neon-violet)]/25 animate-slow-spin" />
                <div className="absolute inset-8 rounded-full border border-[var(--neon-blue)]/20 animate-spin-rev" />
                <div className="absolute inset-16 rounded-full border border-dashed border-[var(--neon-cyan)]/20 animate-spin-mid" />
                {/* orbiting dots */}
                {[
                  { r: 210, color: "var(--neon-violet)", dur: "18s" },
                  { r: 170, color: "var(--neon-pink)", dur: "13s" },
                  { r: 130, color: "var(--neon-cyan)", dur: "9s" },
                ].map((o, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background: o.color,
                      boxShadow: `0 0 12px ${o.color}, 0 0 24px ${o.color}`,
                      ["--orbit-r" as string]: `${o.r}px`,
                      animation: `orbit ${o.dur} linear infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Core image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full max-h-[560px] max-w-[720px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.72_0.25_300/0.35),transparent_55%)] blur-2xl animate-pulse-glow" />
                <img
                  src={neuralCore}
                  alt="Neural network core"
                  width={1536}
                  height={1280}
                  className="relative h-full w-full object-contain mix-blend-screen animate-pulse-glow select-none drop-shadow-[0_0_60px_oklch(0.72_0.25_300/0.45)]"
                />
              </div>
            </div>

            {/* Agent cards */}
            {agents.map((a, idx) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.name}
                  className={`absolute ${a.position} w-[180px] md:w-[200px] glass magnetic rounded-xl px-3 py-2.5 animate-float animate-rise`}
                  style={{ animationDelay: `${idx * 0.4}s, ${idx * 120}ms` }}
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
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Activity className="h-2.5 w-2.5 shrink-0 animate-ticker" style={{ color: a.color }} />
                    <ProgressBar value={a.progress} color={a.color} />
                    <span className="font-mono text-[10px] font-medium tabular-nums" style={{ color: a.color }}>
                      {a.progress}%
                    </span>
                  </div>
                </div>
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
                  placeholder="Ask anything or give a command..."
                />
                <span className="hidden md:flex items-center gap-1.5 font-mono text-[10px] text-[var(--neon-green)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-green)] shadow-[0_0_8px_var(--neon-green)] animate-pulse-glow" />
                  LIVE
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <ToolChip icon={Sparkles} />
                  <ToolChip icon={Mic} />
                  <ToolChip icon={Globe} label="Internet" />
                  <ToolChip icon={FileText} label="Files" />
                  <ToolChip icon={Database} label="Memory" />
                  <ToolChip icon={Puzzle} label="Plugins" />
                  <ToolChip icon={Wrench} label="Tools" />
                </div>
                <button className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--neon-violet)]/50 bg-gradient-to-br from-[var(--neon-violet)]/40 to-[var(--neon-blue)]/30 transition hover:scale-110 hover:shadow-[0_0_30px_var(--neon-violet)]">
                  <span className="absolute inset-0 rounded-full animate-ring border border-[var(--neon-violet)]/60" />
                  <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
              Press <span className="text-foreground">⌘K</span> for command palette
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN */}
        <aside className="col-span-12 flex flex-col gap-4 lg:col-span-3">
          {/* System overview */}
          <Panel>
            <PanelHeader
              icon={<Cpu className="h-3 w-3 text-[var(--neon-violet)]" />}
              title="System Overview"
              right={
                <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[var(--neon-green)]">
                  Live <ArrowRight className="h-2.5 w-2.5" />
                </span>
              }
            />
            <div className="space-y-3">
              <SysRow icon={<Cpu className="h-3 w-3" />} label="CPU" value="23%">
                <Sparkline values={cpuSpark} color="var(--neon-violet)" fill="var(--neon-violet)" width={100} />
              </SysRow>
              <SysRow icon={<MemoryStick className="h-3 w-3" />} label="Memory" value="7.2 GB">
                <div className="flex h-3 items-center gap-[3px]">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-full w-3 rounded-sm"
                      style={{
                        background:
                          i < 6
                            ? "linear-gradient(180deg, var(--neon-violet), var(--neon-blue))"
                            : "oklch(0.3 0.04 280)",
                        boxShadow: i < 6 ? "0 0 6px var(--neon-violet)" : "none",
                      }}
                    />
                  ))}
                </div>
              </SysRow>
              <SysRow icon={<Activity className="h-3 w-3" />} label="GPU" value="41%">
                <Sparkline values={gpuSpark} color="var(--neon-blue)" fill="var(--neon-blue)" width={100} />
              </SysRow>
              <SysRow icon={<HardDrive className="h-3 w-3" />} label="Storage" value="182 GB">
                <ProgressBar value={62} color="var(--neon-blue)" />
              </SysRow>
              <SysRow icon={<NetworkIcon className="h-3 w-3" />} label="Network" value="68 Mbps">
                <Sparkline values={networkSpark} color="var(--neon-green)" fill="var(--neon-green)" width={100} />
              </SysRow>
            </div>
          </Panel>

          {/* Thought process */}
          <Panel>
            <PanelHeader
              icon={<Triangle className="h-3 w-3 text-[var(--neon-violet)]" />}
              title="Thought Process"
              right={
                <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[var(--neon-green)]">
                  Live <ArrowRight className="h-2.5 w-2.5" />
                </span>
              }
            />
            <div className="mb-3 font-mono text-[10px] text-muted-foreground">
              Building your response...
            </div>
            <div className="space-y-2.5">
              <ThoughtStep label="Understanding intent" pct={100} done />
              <ThoughtStep label="Expanding knowledge" pct={100} done />
              <ThoughtStep label="Finding connections" pct={87} active />
              <ThoughtStep label="Generating response" pct={0} pending />
              <ThoughtStep label="Optimizing output" pct={0} pending />
            </div>
          </Panel>

          {/* Active tasks */}
          <Panel>
            <PanelHeader
              icon={<Workflow className="h-3 w-3 text-[var(--neon-violet)]" />}
              title="Active Tasks"
              right={<span className="font-mono text-[10px] text-muted-foreground">4 Running</span>}
            />
            <div className="space-y-2">
              <TaskRow icon={Search} name="Market Research" pct={87} color="var(--neon-violet)" />
              <TaskRow icon={BarChart3} name="Competitor Analysis" pct={62} color="var(--neon-pink)" />
              <TaskRow icon={PenLine} name="Content Strategy" pct={43} color="var(--neon-blue)" />
              <TaskRow icon={Code2} name="Code Optimization" pct={21} color="var(--neon-cyan)" />
            </div>
            <button className="mt-3 flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-muted-foreground transition hover:text-foreground">
              View all tasks <ArrowRight className="h-3 w-3" />
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
                <div className="text-sm font-semibold">Flow State</div>
                <div className="font-mono text-[10px] text-muted-foreground">Deep Focus Mode</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg font-medium tracking-wider">02:35:42</div>
                <div className="font-mono text-[9px] text-muted-foreground">Active Session</div>
              </div>
              <Sparkline values={sessionSpark} color="var(--neon-cyan)" fill="var(--neon-cyan)" width={70} />
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, title, sub }: { icon: LucideIcon; title: string; sub: string }) {
  return (
    <button className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur transition hover:border-[var(--neon-violet)]/40 hover:bg-[var(--neon-violet)]/5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-violet)]/30 to-[var(--neon-blue)]/20">
        <Icon className="h-4 w-4 text-[var(--neon-violet)]" />
      </div>
      <div className="text-left">
        <div className="text-sm font-medium leading-tight">{title}</div>
        <div className="font-mono text-[10px] text-muted-foreground">{sub}</div>
      </div>
    </button>
  );
}

function ToolChip({ icon: Icon, label }: { icon: LucideIcon; label?: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition hover:border-[var(--neon-violet)]/40 hover:text-foreground">
      <Icon className="h-3.5 w-3.5" />
      {label && <span className="font-mono text-[11px]">{label}</span>}
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
