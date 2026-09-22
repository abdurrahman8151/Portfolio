"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Expand } from "lucide-react";
import { useMotionDisabled, motionEase } from "@/components/portfolio/motion-system";

const portraitSource = "/images/abdalrahman-alzoubi.png";
const fragments = Array.from({ length: 11 }, (_, index) => ({
  left: (index / 11) * 100,
  right: ((index + 1) / 11) * 100 + 0.04,
  x: (index - 5) * 24,
  y: Math.sin(index * 2.4) * 105,
  rotation: (index % 2 ? 1 : -1) * (18 + index * 2),
}));

export function IdentityArt({ replay }: { replay: number }) {
  const ref = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const disabled = useMotionDisabled();
  const inView = useInView(ref, { margin: "100px" });
  const [ready, setReady] = useState(false);
  const [assembling, setAssembling] = useState(false);
  const [sequence, setSequence] = useState(0);
  const pointerX = useSpring(0, { stiffness: 105, damping: 24, mass: 0.8 });
  const pointerY = useSpring(0, { stiffness: 105, damping: 24, mass: 0.8 });
  const rotateX = useTransform(pointerY, (value) => value * -0.22);
  const rotateY = useTransform(pointerX, (value) => value * 0.22);
  const orbitalX = useTransform(pointerX, (value) => value * -1.6);
  const orbitalY = useTransform(pointerY, (value) => value * -1.6);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-24, 65]);

  useEffect(() => {
    if (photoRef.current?.complete && photoRef.current.naturalWidth > 0) setReady(true);
  }, []);

  useEffect(() => {
    if (disabled || !ready) {
      setAssembling(false);
      return;
    }
    setSequence((value) => value + 1);
    setAssembling(true);
    // A timeout also restores the original if a tab suspends an animation callback.
    const timer = window.setTimeout(() => setAssembling(false), 2100);
    return () => window.clearTimeout(timer);
  }, [ready, replay, disabled]);

  useEffect(() => {
    if (!disabled) return;
    pointerX.jump(0);
    pointerY.jump(0);
  }, [disabled, pointerX, pointerY]);

  function move(event: PointerEvent<HTMLElement>) {
    if (disabled || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 22);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 16);
  }

  return (
    <figure
      ref={ref}
      className="hero-portrait"
      data-running={!disabled}
      data-assembling={assembling && !disabled}
      onPointerMove={move}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
    >
      <div className="portrait-topline">
        <span><span className="status-dot" aria-hidden="true" /> AVAILABLE FOR WORK</span>
        <span className="portrait-edition">EST. IN CURIOSITY</span>
      </div>
      <div className="portrait-stage">
        <motion.div
          className="portrait-orbital-system"
          aria-hidden="true"
          style={{ x: disabled ? 0 : orbitalX, y: disabled ? 0 : orbitalY, rotate: disabled ? -24 : orbitRotate }}
        >
          <div className="portrait-orbital-ring"><i /></div>
          <div className="portrait-orbital-ring orbit-offset"><i /></div>
          <span className="portrait-orbit-cross">+</span>
        </motion.div>
        <motion.div className="portrait-scroll-layer" style={{ y: disabled ? 0 : y }}>
          <motion.div
            className="portrait-depth"
            style={{ rotateX: disabled ? 0 : rotateX, rotateY: disabled ? 0 : rotateY }}
          >
            <div className="portrait-original">
              <Image
                ref={photoRef}
                src={portraitSource}
                alt="Abdalrahman Alzoubi, wearing a black suit with his arms crossed, photographed against a dark background"
                fill
                preload
                unoptimized
                sizes="(max-width: 600px) 100vw, (max-width: 1100px) 48vw, 620px"
                className="portrait-photo"
                draggable={false}
                onLoad={() => setReady(true)}
              />
            </div>
            {assembling && !disabled && (
              <div className="portrait-fragments" aria-hidden="true" key={sequence}>
                {fragments.map((fragment, index) => (
                  <motion.div
                    key={index}
                    className="portrait-fragment"
                    style={{
                      backgroundImage: `url("${portraitSource}")`,
                      clipPath: `polygon(${fragment.left}% 0, ${fragment.right}% 0, ${fragment.right}% 100%, ${fragment.left}% 100%)`,
                    }}
                    initial={{ x: fragment.x, y: fragment.y, rotateX: fragment.rotation, rotateY: -fragment.rotation * 1.8, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotateX: 0, rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1.25, delay: index * 0.045, ease: motionEase }}
                    onAnimationComplete={index === fragments.length - 1 ? () => setAssembling(false) : undefined}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
        <div className="portrait-corners" aria-hidden="true"><i /><i /><i /><i /></div>
        <span className="portrait-side-label" aria-hidden="true">THE PERSON BEHIND THE CODE</span>
        <div className="portrait-signature" aria-hidden="true"><span>aa</span><span>.</span></div>
      </div>
      <figcaption className="portrait-caption">
        <div><strong>Abdalrahman Alzoubi</strong><span>BACKEND DEVELOPER & SOFTWARE ENGINEER</span></div>
        <a href={portraitSource} target="_blank" rel="noreferrer" aria-label="View full-resolution original photograph" className="portrait-original-link" title="View original, full-resolution photo"><Expand size={16} /><ArrowUpRight size={16} /></a>
      </figcaption>
    </figure>
  );
}
