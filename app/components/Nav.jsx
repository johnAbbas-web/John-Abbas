"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { EASE, Magnetic } from "./ui";

export const sections = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ theme, onToggleTheme, onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setSolid(value > 60));

  return (
    <>
      <motion.header
        className={`nav ${solid ? "is-solid" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      >
        <a className="brand" href="#home" aria-label="John Abbas — home">
          <span className="brand-logo">
            <Image src="/assets/images/ja-logo.png" alt="John Abbas logo" width={112} height={112} priority />
          </span>
          <span className="brand-text">
            John Abbas<small>Full Stack Engineer</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {sections.slice(0, 5).map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <span>{item.label}</span>
              <span aria-hidden="true">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav-tools">
          <button className="ghost-btn kbd-btn" onClick={onOpenPalette} aria-label="Open command menu">
            <span className="kbd-icon">⌘</span>
            <span className="kbd-text">K</span>
          </button>
          <button
            className="ghost-btn theme-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <motion.span key={theme} initial={{ rotate: -60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
              {theme === "dark" ? "☾" : "☀"}
            </motion.span>
          </button>
          <Magnetic strength={0.25} className="nav-cta-wrap">
            <a className="nav-cta" href="#contact" data-cursor="Say hi">
              Let&apos;s talk
            </a>
          </Magnetic>
          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul>
              {sections.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.06, ease: EASE, duration: 0.6 }}
                >
                  <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                    <small>0{index + 1}</small>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
