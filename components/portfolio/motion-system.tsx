"use client";

import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  animate,
  inView,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Lenis from "lenis";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const MotionContext = createContext(false);
export const useMotionDisabled = () => useContext(MotionContext);
export const motionEase = [0.22, 1, 0.36, 1] as const;

export function MotionExperience({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  // Keep the visual experience consistent across localhost and LAN devices.
  // The manual motion control below remains the explicit way to pause animation.
  const disabled = paused;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });

  useEffect(() => {
    document.documentElement.dataset.motion = disabled ? "off" : "on";
    document.documentElement.classList.toggle("motion-paused", disabled);
    if (disabled) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -110 },
    });
    return () => lenis.destroy();
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;
    const selectors = [
      ".expertise-item",
      ".about-copy",
      ".stats-strip > div",
      ".stack-item",
      ".projects-intro",
      ".project-item",
      ".journey-column",
      ".journey-resume",
      ".collaboration-banner",
      ".contact-email",
      ".contact-links",
      ".site-footer",
    ];
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(",")),
    );
    const running = new Set<Animation>();
    // Enhance after hydration so all content remains visible when JavaScript is unavailable.
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.94) {
        element.dataset.reveal = "pending";
      }
    });
    const stop = inView(
      elements,
      (element) => {
        if (
          !(element instanceof HTMLElement) ||
          element.dataset.reveal !== "pending"
        )
          return;
        element.dataset.reveal = "visible";
        const isCard = element.matches(".stack-item, .expertise-item");
        const isProject = element.matches(".project-item");
        const index = element.matches(
          ".stack-item, .expertise-item, .project-item, .journey-column, .stats-strip > div",
        )
          ? Array.from(element.parentElement!.children).indexOf(element)
          : 0;
        const direction = index % 2 === 0 ? -1 : 1;
        // Keep the reveal choreography consistent across viewport sizes.
        // Layout sizing remains responsive, but the animation itself does not change.
        const distance = 110;
        let from = `translate3d(0, ${distance}px, 0) scale(0.94)`;
        let clipPath = "inset(0 0 0 0)";

        if (isCard) {
          from = `perspective(1400px) translate3d(${direction * 55}px, ${distance}px, -80px) rotateX(32deg) rotateY(${direction * 22}deg) rotateZ(${direction * 3}deg) scale(0.85)`;
          clipPath = "inset(0 0 50% 0)";
        } else if (isProject) {
          from = `perspective(1200px) translate3d(100px, 30px, 0) rotateY(-12deg)`;
          clipPath = "inset(0 65% 0 0)";
        } else if (element.matches(".about-copy, .journey-column")) {
          from = `perspective(1200px) translate3d(${direction * 85}px, ${distance / 2}px, 0) rotateY(${direction * 9}deg)`;
        } else if (element.matches(".collaboration-banner")) {
          from = `perspective(1200px) translate3d(0, ${distance}px, -160px) rotateX(24deg) scale(0.82)`;
          clipPath = "inset(15% 12% 15% 12%)";
        }

        const animation = element.animate(
          [{ opacity: 0, transform: from, clipPath }, { opacity: 1, transform: "none", clipPath: "inset(0 0 0 0)" }],
          {
            duration: 1250,
            delay: Math.min(index, 3) * 95,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );
        running.add(animation);
        animation.finished.then(
          () => {
            animation.cancel();
            running.delete(animation);
          },
          () => running.delete(animation),
        );
      },
      { margin: "0px 0px -6% 0px" },
    );
    return () => {
      stop();
      running.forEach((animation) => animation.cancel());
      elements.forEach((element) => {
        delete element.dataset.reveal;
      });
    };
  }, [disabled]);

  useEffect(() => {
    if (disabled || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let active: HTMLElement | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    function reset() {
      active?.style.setProperty("--tilt-x", "0deg");
      active?.style.setProperty("--tilt-y", "0deg");
      active = null;
    }
    function move(event: globalThis.PointerEvent) {
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>(".expertise-item, .stack-item, .architecture-panel") : null;
      if (active !== card) { reset(); active = card; }
      if (!active) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!active) return;
        const bounds = active.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (pointerX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (pointerY - bounds.top) / bounds.height));
        active.style.setProperty("--pointer-x", `${x * 100}%`);
        active.style.setProperty("--pointer-y", `${y * 100}%`);
        active.style.setProperty("--tilt-x", `${(0.5 - y) * 13}deg`);
        active.style.setProperty("--tilt-y", `${(x - 0.5) * 13}deg`);
      });
    }
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      reset();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
    };
  }, [disabled]);

  return (
    <MotionContext.Provider value={disabled}>
      <MotionConfig
        reducedMotion={disabled ? "always" : "never"}
        transition={{ ease: motionEase }}
      >
        <motion.div
          className="reading-progress"
          aria-hidden="true"
          style={{ scaleX: disabled ? scrollYProgress : progress }}
        />
        {children}
        <div className="motion-control">
          <span className="motion-control-label" aria-hidden="true">
            {disabled ? "A LITTLE STILLNESS" : "DESIGNED TO MOVE"}
          </span>
          <Button
            variant="outline"
            size="icon"
            aria-label={disabled ? "Enable animations" : "Pause animations"}
            aria-pressed={!disabled}
            disabled={false}
            title={disabled ? "Enable animations" : "Pause animations"}
            onClick={() => setPaused(!paused)}
          >
            {disabled ? <Play /> : <Pause />}
          </Button>
        </div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

function HeadingWord({ word, index, progress }: { word: string; index: number; progress: MotionValue<number> }) {
  const disabled = useMotionDisabled();
  const direction = index % 2 ? -1 : 1;
  const y = useTransform(progress, [0, 0.34, 0.76, 1], [80, 0, 0, -45]);
  const x = useTransform(progress, [0, 0.34, 0.76, 1], [direction * 36, 0, 0, direction * 45]);
  const rotateX = useTransform(progress, [0, 0.34, 0.76, 1], [-80, 0, 0, 50]);
  const rotate = useTransform(progress, [0, 0.34, 0.76, 1], [direction * 12, 0, 0, direction * -8]);
  return (
    <span className="section-title-word" aria-hidden="true"><motion.span style={{ x: disabled ? 0 : x, y: disabled ? 0 : y, rotateX: disabled ? 0 : rotateX, rotate: disabled ? 0 : rotate }}>{word}</motion.span></span>
  );
}

export function ParallaxHeading({
  ghost,
  label,
  title,
}: {
  ghost: string;
  label: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const disabled = useMotionDisabled();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const x = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1.15]);
  return (
    <div ref={ref} className="section-heading">
      <motion.span
        className="ghost-heading"
        aria-hidden="true"
        style={{ x: disabled ? 0 : x, y: disabled ? 0 : y, scale: disabled ? 1 : scale }}
      >
        {ghost}
      </motion.span>
      <div className="section-heading-front">
        <span className="eyebrow section-label">{label}</span>
        <h2 aria-label={title}>
          {title.split(" ").map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              {index > 0 ? " " : null}
              <HeadingWord word={word} index={index} progress={scrollYProgress} />
            </Fragment>
          ))}
        </h2>
      </div>
    </div>
  );
}

export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const disabled = useMotionDisabled();
  const x = useSpring(0, { stiffness: 190, damping: 15, mass: 0.6 });
  const y = useSpring(0, { stiffness: 190, damping: 15, mass: 0.6 });
  function move(event: MouseEvent<HTMLDivElement>) {
    if (
      disabled ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(Math.max(-18, Math.min(18, (event.clientX - bounds.left - bounds.width / 2) * 0.3)));
    y.set(Math.max(-12, Math.min(12, (event.clientY - bounds.top - bounds.height / 2) * 0.4)));
  }
  return (
    <motion.div
      className={className ?? "magnetic-wrap"}
      tabIndex={-1}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: disabled ? 0 : x, y: disabled ? 0 : y }}
      whileHover={disabled ? undefined : { scale: 1.055 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewport = useInView(ref, {
    once: true,
    margin: "0px 0px -40px 0px",
  });
  const disabled = useMotionDisabled();
  const numeric = Number(value.replace(/[^0-9]/g, ""));
  const count = useMotionValue(numeric);

  useEffect(() => {
    if (!inViewport || disabled) {
      if (ref.current) ref.current.textContent = value;
      return;
    }
    const stop = count.on("change", (latest) => {
      if (!ref.current) return;
      const rounded = Math.round(latest);
      const formatted = value.startsWith("0")
        ? String(rounded).padStart(value.length, "0")
        : rounded.toLocaleString("en-US");
      ref.current.textContent = `${formatted}${value.includes("+") ? "+" : ""}`;
    });
    count.set(0);
    const controls = animate(count, numeric, {
      duration: 1.8,
      ease: motionEase,
    });
    return () => {
      controls.stop();
      stop();
    };
  }, [inViewport, disabled, count, numeric, value]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} className="animated-number" aria-hidden="true">
        {value}
      </span>
    </>
  );
}
