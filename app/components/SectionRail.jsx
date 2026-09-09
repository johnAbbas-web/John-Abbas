"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { sections } from "./Nav";

const ids = ["home", ...sections.map((s) => s.id)];
const labels = { home: "Top", ...Object.fromEntries(sections.map((s) => [s.id, s.label])) };

/* Fixed rail that tracks which section is on screen and scrolls you there. */
export default function SectionRail() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Section navigation">
      {ids.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`rail-dot ${active === id ? "is-active" : ""}`}
          aria-label={labels[id]}
          aria-current={active === id ? "true" : undefined}
        >
          <span className="rail-label">{labels[id]}</span>
          <span className="rail-mark" aria-hidden="true">
            {active === id && <motion.span layoutId="rail-active" className="rail-fill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
          </span>
        </a>
      ))}
    </nav>
  );
}
