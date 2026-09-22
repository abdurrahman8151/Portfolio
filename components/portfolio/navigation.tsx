"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Magnetic,
  useMotionDisabled,
} from "@/components/portfolio/motion-system";
import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Tech stack" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const disabled = useMotionDisabled();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 60));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn("site-header", scrolled && "is-scrolled")}
    >
      <a href="#home" className="brand" aria-label="Abdalrahman Alzoubi, home">
        <span className="brand-mark">
          a<span>a</span>
          <span className="brand-period">.</span>
        </span>
        <span className="brand-name">
          ABDALRAHMAN
          <br />
          ALZOUBI
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={cn("nav-link", active === link.id && "is-active")}
            aria-current={active === link.id ? "location" : undefined}
          >
            {link.label}
            {active === link.id && (
              <motion.span
                className="nav-active-line"
                layoutId="navigation-indicator"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                  duration: disabled ? 0 : undefined,
                }}
              />
            )}
          </a>
        ))}
      </nav>
      <Magnetic className="header-resume-wrap">
        <a
          className={cn(buttonVariants(), "header-resume")}
          href="/abdalrahman-alzoubi-cv.pdf"
          download
        >
          Get my resume <Download data-icon="inline-end" />
        </a>
      </Magnetic>
      <Button
        ref={toggleRef}
        variant="outline"
        size="icon"
        className="mobile-menu-button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: disabled ? 0 : 0.25 }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: disabled ? 0 : 0.3,
                  delay: disabled ? 0 : index * 0.035,
                }}
                aria-current={active === link.id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={16} />
              </motion.a>
            ))}
            <a
              href="/abdalrahman-alzoubi-cv.pdf"
              download
              onClick={() => setOpen(false)}
            >
              Download resume
              <Download size={16} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
