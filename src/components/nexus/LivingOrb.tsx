import { useEffect, useRef } from "react";

/**
 * LivingOrb — award-grade living neural entity.
 *
 * Layers (back → front):
 *  1. Volumetric nebula field (procedural noise haze)
 *  2. Concentric energy rings with chromatic aberration
 *  3. Lightning arcs (Bezier-jittered) firing on heartbeat
 *  4. Wobbling organic membrane (sum-of-sines silhouette)
 *  5. Iridescent inner filaments (parametric flow)
 *  6. Pulsing plasma core with subsurface glow
 *  7. Orbiting particle dust + sparks + after-glow trails
 *  8. Specular sheen following the cursor
 *  9. Dithered film grain pass
 *
 * Reactivity: gently follows pointer; intensifies on hover.
 */
export function LivingOrb({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, inside: false, intensity: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    // Pointer tracking
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - rect.left) / rect.width;
      pointerRef.current.y = (e.clientY - rect.top) / rect.height;
      pointerRef.current.inside = true;
    };
    const onLeave = () => {
      pointerRef.current.inside = false;
    };
    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    // Particles
    type P = {
      a: number;
      r: number;
      s: number;
      size: number;
      hue: number;
      life: number;
      tilt: number;
    };
    const particles: P[] = Array.from({ length: 140 }).map(() => ({
      a: Math.random() * Math.PI * 2,
      r: 0.5 + Math.random() * 0.7,
      s: (Math.random() - 0.5) * 0.005 + 0.0012,
      size: Math.random() * 1.8 + 0.3,
      hue: [295, 240, 320, 200][Math.floor(Math.random() * 4)],
      life: Math.random(),
      tilt: 0.85 + Math.random() * 0.2,
    }));

    // Sparks
    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      hue: number;
    };
    const sparks: Spark[] = [];

    // Lightning arcs (cached per-beat)
    type Arc = { points: { x: number; y: number }[]; life: number; max: number; hue: number };
    const arcs: Arc[] = [];

    // Pre-baked nebula noise (low-res, scaled up for perf)
    const noiseSize = 128;
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = noiseSize;
    noiseCanvas.height = noiseSize;
    const nctx = noiseCanvas.getContext("2d")!;
    const nimg = nctx.createImageData(noiseSize, noiseSize);
    for (let i = 0; i < nimg.data.length; i += 4) {
      const v = Math.random() * 255;
      nimg.data[i] = v;
      nimg.data[i + 1] = v * 0.7;
      nimg.data[i + 2] = v;
      nimg.data[i + 3] = 255;
    }
    nctx.putImageData(nimg, 0, 0);

    let t = 0;
    let lastBeat = -10;

    const buildArc = (cx: number, cy: number, r: number, hue: number): Arc => {
      const a1 = Math.random() * Math.PI * 2;
      const a2 = a1 + (Math.random() - 0.5) * 1.2 + Math.PI;
      const x1 = cx + Math.cos(a1) * r;
      const y1 = cy + Math.sin(a1) * r;
      const x2 = cx + Math.cos(a2) * r;
      const y2 = cy + Math.sin(a2) * r;
      const segs = 14;
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= segs; i++) {
        const u = i / segs;
        const bx = x1 + (x2 - x1) * u;
        const by = y1 + (y2 - y1) * u;
        const jitter = (1 - Math.abs(u - 0.5) * 2) * r * 0.35;
        points.push({
          x: bx + (Math.random() - 0.5) * jitter,
          y: by + (Math.random() - 0.5) * jitter,
        });
      }
      return { points, life: 0, max: 0.35 + Math.random() * 0.25, hue };
    };

    const draw = (now: number) => {
      t = now / 1000;
      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height) * 0.27;

      // Pointer ease
      const p = pointerRef.current;
      p.intensity += ((p.inside ? 1 : 0) - p.intensity) * 0.04;
      const px = (p.x - 0.5) * width;
      const py = (p.y - 0.5) * height;

      // Heartbeat (double-thump)
      const beatPeriod = 1.45;
      const beatPhase = (t % beatPeriod) / beatPeriod;
      const heartbeat =
        Math.exp(-Math.pow((beatPhase - 0.0) * 7, 2)) * 1.0 +
        Math.exp(-Math.pow((beatPhase - 0.16) * 7, 2)) * 0.65;
      const breath = 1 + Math.sin(t * 0.85) * 0.035 + heartbeat * 0.07 + p.intensity * 0.04;

      // Beat events
      if (t - lastBeat > beatPeriod) {
        lastBeat = t;
        // Sparks burst
        for (let i = 0; i < 14; i++) {
          const a = Math.random() * Math.PI * 2;
          const sp = 40 + Math.random() * 80;
          sparks.push({
            x: cx + Math.cos(a) * baseR * 0.75,
            y: cy + Math.sin(a) * baseR * 0.75,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp,
            life: 0,
            max: 0.7 + Math.random() * 0.7,
            hue: [295, 240, 320, 200][Math.floor(Math.random() * 4)],
          });
        }
        // Lightning arcs
        const arcCount = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < arcCount; i++) {
          arcs.push(buildArc(cx, cy, baseR * (0.6 + Math.random() * 0.35), Math.random() < 0.5 ? 295 : 200));
        }
      }

      // Trail clear (motion blur)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(8, 6, 20, 0.28)";
      ctx.fillRect(0, 0, width, height);

      // Volumetric nebula haze
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.14 + p.intensity * 0.05;
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.02);
      const nebScale = (Math.max(width, height) / noiseSize) * 1.4;
      ctx.scale(nebScale, nebScale);
      ctx.drawImage(noiseCanvas, -noiseSize / 2, -noiseSize / 2);
      ctx.restore();

      ctx.globalCompositeOperation = "lighter";

      // Outer breathing aura (multi-stop)
      const auraR = baseR * 2.8 * breath;
      const aura = ctx.createRadialGradient(cx, cy, baseR * 0.3, cx, cy, auraR);
      aura.addColorStop(0, "rgba(180, 120, 255, 0.35)");
      aura.addColorStop(0.25, "rgba(140, 110, 255, 0.18)");
      aura.addColorStop(0.55, "rgba(80, 130, 255, 0.10)");
      aura.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, auraR, 0, Math.PI * 2);
      ctx.fill();

      // Concentric energy rings with chromatic aberration
      for (let i = 0; i < 3; i++) {
        const rr = baseR * (1.15 + i * 0.18 + Math.sin(t * 0.6 + i) * 0.03);
        const a = 0.12 - i * 0.03;
        // R channel offset
        ctx.strokeStyle = `rgba(255, 80, 200, ${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx + 1.5, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
        // B channel offset
        ctx.strokeStyle = `rgba(80, 180, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(cx - 1.5, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Lightning arcs (decay)
      for (let i = arcs.length - 1; i >= 0; i--) {
        const a = arcs[i];
        a.life += 1 / 60;
        const k = 1 - a.life / a.max;
        if (k <= 0) {
          arcs.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `hsla(${a.hue}, 100%, 85%, ${k * 0.9})`;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = `hsla(${a.hue}, 100%, 70%, ${k})`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        a.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Wobbling organic membrane
      const lobes = 6;
      ctx.beginPath();
      const steps = 220;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const wob =
          Math.sin(a * lobes + t * 1.1) * 0.06 +
          Math.sin(a * 3 - t * 0.7) * 0.05 +
          Math.sin(a * 11 + t * 1.9) * 0.018 +
          Math.sin(a * 17 - t * 2.4) * 0.01;
        const r = baseR * (1 + wob) * breath;
        // pointer pull
        const pull = 0.04 * p.intensity;
        const x = cx + Math.cos(a) * r + px * pull;
        const y = cy + Math.sin(a) * r + py * pull;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const membrane = ctx.createRadialGradient(
        cx - baseR * 0.3,
        cy - baseR * 0.3,
        baseR * 0.05,
        cx,
        cy,
        baseR * 1.25
      );
      membrane.addColorStop(0, "rgba(255, 235, 255, 0.98)");
      membrane.addColorStop(0.18, "rgba(220, 160, 255, 0.7)");
      membrane.addColorStop(0.45, "rgba(150, 120, 255, 0.35)");
      membrane.addColorStop(0.75, "rgba(80, 100, 220, 0.12)");
      membrane.addColorStop(1, "rgba(40, 30, 90, 0)");
      ctx.fillStyle = membrane;
      ctx.fill();

      // Iridescent filaments
      ctx.lineWidth = 0.9;
      for (let f = 0; f < 6; f++) {
        ctx.beginPath();
        const phase = t * (0.35 + f * 0.13) + f * 1.3;
        for (let i = 0; i <= 260; i++) {
          const u = i / 260;
          const a = u * Math.PI * 7 + phase;
          const rr =
            baseR *
            (0.22 + u * 0.72) *
            (1 + Math.sin(a * 1.7 + t) * 0.09) *
            breath;
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr * 0.92;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const hueShift = (t * 8 + f * 50) % 360;
        const hue = [295, 235, 320, 200, 280, 255][f] + Math.sin(t + f) * 10 + hueShift * 0.02;
        ctx.strokeStyle = `hsla(${hue}, 95%, 78%, ${0.2 + 0.1 * Math.sin(t + f)})`;
        ctx.stroke();
      }

      // Bright pulsing core with subsurface scattering
      const coreR = baseR * (0.34 + heartbeat * 0.1) * breath;
      // Outer halo of core
      const coreHalo = ctx.createRadialGradient(cx, cy, coreR * 0.4, cx, cy, coreR * 1.8);
      coreHalo.addColorStop(0, "rgba(255, 220, 255, 0.6)");
      coreHalo.addColorStop(1, "rgba(255, 220, 255, 0)");
      ctx.fillStyle = coreHalo;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 1.8, 0, Math.PI * 2);
      ctx.fill();
      // Hot core
      const core = ctx.createRadialGradient(
        cx - coreR * 0.2,
        cy - coreR * 0.2,
        0,
        cx,
        cy,
        coreR
      );
      core.addColorStop(0, "rgba(255, 255, 255, 1)");
      core.addColorStop(0.25, "rgba(245, 200, 255, 0.98)");
      core.addColorStop(0.6, "rgba(170, 130, 255, 0.55)");
      core.addColorStop(1, "rgba(60, 40, 160, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting particles with motion trails
      for (const pt of particles) {
        pt.a += pt.s * (1 + p.intensity * 0.4);
        pt.life += 0.005;
        const wobble = Math.sin(t * 1.3 + pt.a * 3) * 0.04;
        const r = baseR * (pt.r + wobble) * breath;
        const x = cx + Math.cos(pt.a) * r;
        const y = cy + Math.sin(pt.a) * r * pt.tilt;
        const alpha = 0.35 + 0.5 * Math.sin(pt.life * 6.28);
        // trail
        const tx = cx + Math.cos(pt.a - pt.s * 8) * r;
        const ty = cy + Math.sin(pt.a - pt.s * 8) * r * pt.tilt;
        ctx.strokeStyle = `hsla(${pt.hue}, 95%, 78%, ${alpha * 0.4})`;
        ctx.lineWidth = pt.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        // head
        ctx.fillStyle = `hsla(${pt.hue}, 95%, 82%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1 / 60;
        s.x += s.vx / 60;
        s.y += s.vy / 60;
        s.vx *= 0.97;
        s.vy *= 0.97;
        const k = 1 - s.life / s.max;
        if (k <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `hsla(${s.hue}, 95%, 82%, ${k})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6 * k + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursor-following specular sheen
      const sheenA = t * 0.25;
      const targetSx = p.inside ? px * 0.4 : Math.cos(sheenA) * baseR * 0.35;
      const targetSy = p.inside ? py * 0.4 : Math.sin(sheenA) * baseR * 0.35;
      const sx = cx + targetSx;
      const sy = cy + targetSy;
      const sheen = ctx.createRadialGradient(sx, sy, 0, sx, sy, baseR * 0.95);
      sheen.addColorStop(0, `rgba(255, 240, 255, ${0.35 + p.intensity * 0.2})`);
      sheen.addColorStop(1, "rgba(255, 240, 255, 0)");
      ctx.fillStyle = sheen;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.05 * breath, 0, Math.PI * 2);
      ctx.fill();

      // Subtle film grain
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.05;
      ctx.drawImage(noiseCanvas, 0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
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
