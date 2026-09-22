"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, MapPin, RotateCcw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IdentityArt } from "@/components/portfolio/identity-art";
import { KineticField, KineticDivider } from "@/components/portfolio/kinetic-field";
import { Magnetic, useMotionDisabled } from "@/components/portfolio/motion-system";

const headline = ["Backend systems.", "Built for speed.", "Designed to scale."];

function HeadlineLine({ line, index, progress }: { line: string; index: number; progress: MotionValue<number> }) {
  const disabled = useMotionDisabled();
  const x = useTransform(progress, [0, 0.15, 1], [0, 0, index === 1 ? 140 : -100 - index * 30]);
  const rotate = useTransform(progress, [0, 0.15, 1], [0, 0, index === 1 ? 4 : -4]);
  return (
    <motion.span className="hero-line" aria-hidden="true" style={{ x: disabled ? 0 : x, rotate: disabled ? 0 : rotate }}>
      <span className={cn("hero-line-content", index === 1 && "headline-accent")} style={{ "--line-index": index } as CSSProperties}>
        {Array.from(line).map((character, characterIndex) => (
          <span
            className={cn("hero-character", index === 2 && character === "." && "accent-dot")}
            style={{
              "--character-index": characterIndex,
              "--scatter-x": `${((characterIndex * 37 + index * 19) % 140) - 70}px`,
              "--scatter-y": `${characterIndex % 2 ? -110 : 115}%`,
              "--scatter-rotate": `${characterIndex % 2 ? 32 : -32}deg`,
            } as CSSProperties}
            key={characterIndex}
          ><span className="hero-glyph">{character === " " ? "\u00a0" : character}</span></span>
        ))}
      </span>
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [replay, setReplay] = useState(0);
  const disabled = useMotionDisabled();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  function moveLetters(event: PointerEvent<HTMLHeadingElement>) {
    if (disabled || event.pointerType !== "mouse") return;
    const letters = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(".hero-character"));
    const positions = letters.map((letter) => {
      const bounds = letter.getBoundingClientRect();
      const distance = Math.hypot(event.clientX - bounds.left - bounds.width / 2, event.clientY - bounds.top - bounds.height / 2);
      return { letter, lift: Math.max(0, 1 - distance / 130) * -16 };
    });
    positions.forEach(({ letter, lift }) => letter.style.setProperty("--letter-lift", `${lift}px`));
  }

  function resetLetters() {
    headlineRef.current?.querySelectorAll<HTMLElement>(".hero-character").forEach((letter) => letter.style.setProperty("--letter-lift", "0px"));
  }

  return (
    <section ref={ref} id="home" className="hero">
      <KineticField target={ref} replay={replay} />
      <div className="hero-main">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow hero-enter"><span className="tiny-cross" aria-hidden="true">+</span> COMPLEX LOGIC. CLEAN SOLUTIONS.</div>
          <h1 ref={headlineRef} aria-label={headline.join(" ")} onPointerMove={moveLetters} onPointerLeave={resetLetters} key={replay}>
            {headline.map((line, index) => <HeadlineLine key={line} line={line} index={index} progress={scrollYProgress} />)}
          </h1>
          <p className="hero-intro hero-enter">Hi, I&apos;m <strong>Abdalrahman Alzoubi.</strong> A backend developer turning complex ideas into reliable APIs, real-time platforms, and software that holds up under load.</p>
          <div className="hero-actions hero-enter">
            <Magnetic><a href="#projects" className={cn(buttonVariants({ size: "lg" }), "action-link action-primary")}>Explore my work <ArrowUpRight data-icon="inline-end" /></a></Magnetic>
            <Magnetic><a href="/abdalrahman-alzoubi-cv.pdf" download className={cn(buttonVariants({ variant: "outline", size: "lg" }), "action-link")}>Download resume <Download data-icon="inline-end" /></a></Magnetic>
          </div>
          <p className="hero-technologies hero-enter">PHP <span>/</span> LARAVEL <span>/</span> MYSQL <span>/</span> REDIS <span>/</span> DOCKER</p>
          <div className="hero-proof hero-enter"><span className="hero-proof-line" aria-hidden="true" /><span><strong>9,300+</strong> concurrent users.</span><span>Load-tested with k6.</span></div>
        </div>
        <div className="hero-art-enter"><IdentityArt replay={replay} /></div>
      </div>
      <div className="hero-footer hero-enter">
        <span><MapPin size={13} /> Damascus, Syria <span className="location-divider">/</span> Open to remote opportunities</span>
        <div className="hero-replay"><Button variant="ghost" size="sm" disabled={disabled} onClick={() => setReplay((value) => value + 1)} aria-label="Replay intro animation"><RotateCcw data-icon="inline-start" /> Replay intro</Button></div>
        <a href="#about"><span className="scroll-indicator"><ArrowDown size={14} /></span> SCROLL TO EXPLORE</a>
      </div>
      <KineticDivider />
    </section>
  );
}
