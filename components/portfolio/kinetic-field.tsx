"use client";

import { useEffect, useRef, type RefObject } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMotionDisabled } from "@/components/portfolio/motion-system";

type Particle = { x: number; y: number; homeX: number; homeY: number; vx: number; vy: number; size: number };

export function KineticField({ target, replay }: { target: RefObject<HTMLElement | null>; replay: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const disabled = useMotionDisabled();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = target.current;
    if (!canvas || !parent || disabled) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000 };
    const ripples: { x: number; y: number; radius: number; life: number }[] = [];
    const accent = getComputedStyle(parent).getPropertyValue("--accent-text").trim();

    function resize() {
      if (!canvas || !parent || !context) return;
      width = parent.clientWidth;
      height = Math.min(parent.clientHeight, 780);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = width < 600 ? 30 : 72;
      particles = Array.from({ length: count }, (_, index) => {
        const homeX = ((Math.sin(index * 127.1 + 3.2) * 43758.5453) % 1 + 1) % 1 * width;
        const homeY = ((Math.sin(index * 311.7 + 7.4) * 12741.214) % 1 + 1) % 1 * height;
        return { homeX, homeY, x: width / 2, y: height / 2, vx: Math.cos(index * 2.4) * 12, vy: Math.sin(index * 2.4) * 12, size: index % 9 === 0 ? 2 : 0.9 };
      });
    }

    function draw(time: number) {
      if (!context || !visible || document.hidden) { frame = 0; return; }
      const step = Math.min((time - lastTime) / 16.67 || 1, 2);
      lastTime = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        const homeX = particle.homeX + Math.sin(time * 0.0003 + index) * 14;
        const homeY = particle.homeY + Math.cos(time * 0.0004 + index) * 14;
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0) {
          const force = (1 - distance / 150) * 1.2;
          particle.vx += (dx / distance) * force * step;
          particle.vy += (dy / distance) * force * step;
        }
        particle.vx += (homeX - particle.x) * 0.006 * step;
        particle.vy += (homeY - particle.y) * 0.006 * step;
        particle.vx *= Math.pow(0.91, step);
        particle.vy *= Math.pow(0.91, step);
        particle.x += particle.vx * step;
        particle.y += particle.vy * step;
        context.globalAlpha = index % 9 === 0 ? 0.65 : 0.3;
        context.fillStyle = accent;
        if (index % 9 === 0) {
          context.fillRect(particle.x - 3, particle.y - 0.5, 6, 1);
          context.fillRect(particle.x - 0.5, particle.y - 3, 1, 6);
        } else {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        }
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const gap = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (gap > 90) continue;
          context.globalAlpha = (1 - gap / 90) * 0.14;
          context.strokeStyle = accent;
          context.lineWidth = 0.65;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      });
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 9 * step;
        ripple.life -= 0.018 * step;
        if (ripple.life <= 0) { ripples.splice(i, 1); continue; }
        context.globalAlpha = ripple.life * 0.4;
        context.strokeStyle = accent;
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, ripple.radius, ripple.radius * 0.65, -0.2, 0, Math.PI * 2);
        context.stroke();
      }
      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    }

    function start() {
      if (visible && !document.hidden && !frame) { lastTime = performance.now(); frame = requestAnimationFrame(draw); }
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !parent) return;
      const bounds = parent.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }
    function leave() { pointer.x = -1000; pointer.y = -1000; }
    function burst(event: PointerEvent) {
      if (!parent || (event.target instanceof Element && event.target.closest("a, button"))) return;
      const bounds = parent.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (ripples.length < 5) ripples.push({ x, y, radius: 0, life: 1 });
      particles.forEach((particle) => {
        const dx = particle.x - x;
        const dy = particle.y - y;
        const distance = Math.max(Math.hypot(dx, dy), 1);
        const force = Math.max(0, 1 - distance / 700) * 22;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      });
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    const resizer = new ResizeObserver(resize);
    resize();
    observer.observe(parent);
    resizer.observe(parent);
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerleave", leave);
    parent.addEventListener("pointerdown", burst, { passive: true });
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
      parent.removeEventListener("pointerdown", burst);
      document.removeEventListener("visibilitychange", start);
      context.clearRect(0, 0, width, height);
    };
  }, [disabled, target, replay]);

  return <canvas ref={canvasRef} className="kinetic-field" aria-hidden="true" />;
}

export function KineticDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const disabled = useMotionDisabled();
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 100, damping: 24 });
  const skewX = useTransform(smoothVelocity, (value) => Math.max(-12, Math.min(12, value * -0.004)));
  const x = useTransform(scrollYProgress, [0, 1], ["12%", "-25%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-70, 100]);
  return (
    <div ref={ref} className="kinetic-divider" aria-hidden="true">
      <div className="kinetic-divider-label"><span>THE MINDSET</span><span>01 — 06</span></div>
      <motion.div className="kinetic-divider-track" style={{ x: disabled ? 0 : x, skewX: disabled ? 0 : skewX }}>
        <span>COMPLEXITY</span><motion.span className="kinetic-divider-arrow" style={{ rotate: disabled ? 0 : rotate }}><ArrowUpRight strokeWidth={1.1} /></motion.span><span>CLARITY.</span>
      </motion.div>
    </div>
  );
}
