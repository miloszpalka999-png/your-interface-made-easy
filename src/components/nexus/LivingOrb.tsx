import { useEffect, useRef } from "react";

/**
 * LivingOrb — a "living" neural core rendered on canvas.
 * - Breathing radial plasma core
 * - Wobbling organic silhouette (sum of sines on radius)
 * - Inner swirling filaments (parametric curves)
 * - Orbiting particle dust + sparks
 * - Pulse rings emitted on heartbeat
 */
export function LivingOrb({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Particles orbiting the core
    type P = { a: number; r: number; s: number; size: number; hue: number; life: number };
    const particles: P[] = Array.from({ length: 90 }).map(() => ({
      a: Math.random() * Math.PI * 2,
      r: 0.55 + Math.random() * 0.55,
      s: (Math.random() - 0.5) * 0.004 + 0.0015,
      size: Math.random() * 1.6 + 0.4,
      hue: Math.random() < 0.5 ? 295 : 240,
      life: Math.random(),
    }));

    // Sparks (short-lived bright dots flying outward)
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number };
    const sparks: Spark[] = [];

    let t = 0;
    let lastBeat = 0;

    const draw = (now: number) => {
      t = now / 1000;
      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height) * 0.28;

      // Heartbeat (two-stage pulse, ~ every 1.6s)
      const beatPeriod = 1.6;
      const beatPhase = (t % beatPeriod) / beatPeriod;
      const heartbeat =
        Math.exp(-Math.pow((beatPhase - 0.0) * 6, 2)) * 1.0 +
        Math.exp(-Math.pow((beatPhase - 0.18) * 6, 2)) * 0.6;
      const breath = 1 + Math.sin(t * 0.9) * 0.04 + heartbeat * 0.06;

      // emit pulse ring on each beat
      if (t - lastBeat > beatPeriod) {
        lastBeat = t;
        for (let i = 0; i < 8; i++) {
          const a = Math.random() * Math.PI * 2;
          const sp = 30 + Math.random() * 50;
          sparks.push({
            x: cx + Math.cos(a) * baseR * 0.7,
            y: cy + Math.sin(a) * baseR * 0.7,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp,
            life: 0,
            max: 0.8 + Math.random() * 0.6,
            hue: Math.random() < 0.5 ? 295 : 240,
          });
        }
      }

      // Clear with subtle trail (motion blur)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(10, 8, 22, 0.22)";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      // Outer breathing aura
      const auraR = baseR * 2.6 * breath;
      const aura = ctx.createRadialGradient(cx, cy, baseR * 0.4, cx, cy, auraR);
      aura.addColorStop(0, "rgba(170, 110, 255, 0.30)");
      aura.addColorStop(0.35, "rgba(110, 130, 255, 0.14)");
      aura.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, auraR, 0, Math.PI * 2);
      ctx.fill();

      // Wobbling organic silhouette (membrane)
      const lobes = 6;
      ctx.beginPath();
      const steps = 180;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const wob =
          Math.sin(a * lobes + t * 1.2) * 0.06 +
          Math.sin(a * 3 - t * 0.7) * 0.05 +
          Math.sin(a * 11 + t * 1.9) * 0.02;
        const r = baseR * (1 + wob) * breath;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const membrane = ctx.createRadialGradient(cx, cy, baseR * 0.1, cx, cy, baseR * 1.2);
      membrane.addColorStop(0, "rgba(255, 220, 255, 0.95)");
      membrane.addColorStop(0.25, "rgba(190, 130, 255, 0.55)");
      membrane.addColorStop(0.6, "rgba(120, 130, 255, 0.25)");
      membrane.addColorStop(1, "rgba(60, 40, 120, 0.0)");
      ctx.fillStyle = membrane;
      ctx.fill();

      // Inner swirling filaments
      ctx.lineWidth = 0.8;
      for (let f = 0; f < 5; f++) {
        ctx.beginPath();
        const phase = t * (0.4 + f * 0.15) + f * 1.3;
        for (let i = 0; i <= 240; i++) {
          const u = i / 240;
          const a = u * Math.PI * 6 + phase;
          const rr =
            baseR *
            (0.25 + u * 0.7) *
            (1 + Math.sin(a * 1.7 + t) * 0.08) *
            breath;
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr * 0.92;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const hue = f % 2 === 0 ? 295 : 235;
        ctx.strokeStyle = `hsla(${hue}, 90%, 75%, ${0.18 + 0.08 * Math.sin(t + f)})`;
        ctx.stroke();
      }

      // Bright pulsing core
      const coreR = baseR * (0.32 + heartbeat * 0.08) * breath;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      core.addColorStop(0, "rgba(255, 255, 255, 1)");
      core.addColorStop(0.3, "rgba(230, 180, 255, 0.95)");
      core.addColorStop(0.7, "rgba(150, 110, 255, 0.45)");
      core.addColorStop(1, "rgba(60, 40, 160, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting particles
      for (const p of particles) {
        p.a += p.s;
        p.life += 0.005;
        const wobble = Math.sin(t * 1.3 + p.a * 3) * 0.04;
        const r = baseR * (p.r + wobble) * breath;
        const x = cx + Math.cos(p.a) * r;
        const y = cy + Math.sin(p.a) * r * 0.95;
        const alpha = 0.35 + 0.45 * Math.sin(p.life * 6.28);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 78%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1 / 60;
        s.x += s.vx / 60;
        s.y += s.vy / 60;
        s.vx *= 0.98;
        s.vy *= 0.98;
        const k = 1 - s.life / s.max;
        if (k <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `hsla(${s.hue}, 95%, 80%, ${k})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.4 * k + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Highlight crescent (specular "alive" sheen)
      const sheenA = t * 0.3;
      const sx = cx + Math.cos(sheenA) * baseR * 0.35;
      const sy = cy + Math.sin(sheenA) * baseR * 0.35;
      const sheen = ctx.createRadialGradient(sx, sy, 0, sx, sy, baseR * 0.9);
      sheen.addColorStop(0, "rgba(255, 240, 255, 0.35)");
      sheen.addColorStop(1, "rgba(255, 240, 255, 0)");
      ctx.fillStyle = sheen;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.05 * breath, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
