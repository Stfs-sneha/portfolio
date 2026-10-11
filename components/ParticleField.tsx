"use client";

import { useEffect, useRef } from "react";

type Particle = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

/**
 * Interactive generative dot-grid (Canvas2D).
 * Each dot is a damped spring anchored to its home cell; the cursor repels dots,
 * which then settle back organically. Pauses when the tab is hidden and respects
 * prefers-reduced-motion (renders a single static frame).
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 38;
    const RADIUS = 160;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: Particle[] = [];
    let enabled = true;
    const mouse = { x: -9999, y: -9999 };

    const readAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().replace(/\s+/g, ",");
    let accent = readAccent() || "129,140,248";

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = [];
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const offX = (w - (cols - 1) * GAP) / 2;
      const offY = (h - (rows - 1) * GAP) / 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offX + i * GAP;
          const y = offY + j * GAP;
          particles.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!enabled) return;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) ** 2;
          p.vx += (dx / dist) * force * 2.4;
          p.vy += (dy / dist) * force * 2.4;
        }

        // spring back to home, then damp
        p.vx += (p.hx - p.x) * 0.055;
        p.vy += (p.hy - p.y) * 0.055;
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.x += p.vx;
        p.y += p.vy;

        const disp = Math.hypot(p.x - p.hx, p.y - p.hy);
        const t = Math.min(disp / 34, 1);
        const alpha = 0.13 + t * 0.75;
        const r = 0.9 + t * 1.7;

        ctx.fillStyle = `rgba(${accent},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduceMotion) {
        draw();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduceMotion) draw();
      }, 120);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    };
    const onAccent = () => {
      accent = readAccent() || accent;
      if (reduceMotion) draw();
    };
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<{ enabled: boolean }>).detail;
      enabled = detail.enabled;
      canvas.style.opacity = enabled ? "1" : "0";
      if (reduceMotion) draw();
    };

    build();
    start();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("accent-change", onAccent);
    window.addEventListener("toggle-particles", onToggle);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("accent-change", onAccent);
      window.removeEventListener("toggle-particles", onToggle);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 transition-opacity duration-700"
      style={{ willChange: "transform" }}
    />
  );
}
