"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import HeroScene from "./HeroScene";
import { EASE, LocalTime, Magnetic, TiltCard } from "./ui";
import { person, stats } from "../lib/data";
import { Counter } from "./ui";

export default function Hero({ theme, ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const base = ready ? 0.15 : 1.6;

  return (
    <section id="home" className="hero" ref={ref}>
      <HeroScene theme={theme} />
      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-inner shell">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base, duration: 0.7, ease: EASE }}
          >
            <span className="pulse" aria-hidden="true" />
            Available for new work · {person.location}
          </motion.p>

          <h1 className="hero-title">
            {["Engineering", "digital products", "that deliver."].map((line, index) => (
              <span className="line" key={line}>
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: base + 0.12 + index * 0.11, duration: 1, ease: EASE }}
                  className={index === 2 ? "accent" : ""}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.55, duration: 0.8, ease: EASE }}
          >
            I&apos;m {person.name} — a Full Stack Engineer and Technical Consultant building secure enterprise
            applications, FinTech workflows and data platforms that stay fast under real load.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.68, duration: 0.8, ease: EASE }}
          >
            <Magnetic strength={0.3}>
              <a className="btn btn-primary" href="#work" data-cursor="View">
                <span>Selected work</span>
                <i aria-hidden="true">↗</i>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a className="btn btn-ghost" href={`mailto:${person.email}`} data-cursor="Email">
                <span>Start a project</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: base + 0.85, duration: 0.9 }}
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <dt>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="hero-visual"
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: base + 0.2, duration: 1.2, ease: EASE }}
        >
          <TiltCard className="portrait-card" max={11}>
            <div className="portrait-frame">
              <Image src="/john.png" alt={person.name} width={720} height={960} priority className="portrait" />
              <div className="portrait-grid" aria-hidden="true" />
            </div>
            <div className="portrait-meta">
              <span className="portrait-tag">React · Angular · Oracle</span>
              <span className="portrait-time">
                <i aria-hidden="true" /> <LocalTime timezone={person.timezone} /> PKT
              </span>
            </div>
          </TiltCard>

          <motion.div
            className="float-chip chip-one"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <strong>3+ yrs</strong>
            <small>FinTech systems</small>
          </motion.div>
          <motion.div
            className="float-chip chip-two"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <strong>20+</strong>
            <small>Products shipped</small>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        className="scroll-cue"
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1.1, duration: 0.8 }}
        aria-label="Scroll to about"
      >
        <span>SCROLL</span>
        <i aria-hidden="true" />
      </motion.a>
    </section>
  );
}
