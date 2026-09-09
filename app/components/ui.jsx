"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export const EASE = [0.16, 1, 0.3, 1];

/* Fade + rise on entry. The workhorse. */
export function Reveal({ children, delay = 0, y = 30, className = "", as = "div", amount = 0.2 }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* Headline that reveals word by word from behind a mask. */
export function SplitText({ text, className = "", delay = 0, stagger = 0.045, tag = "span" }) {
  const Tag = tag;
  const words = String(text).split(" ");
  return (
    <Tag className={`split ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span className="split-line" key={`${word}-${index}`} aria-hidden="true">
          <motion.span
            className="split-word"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: delay + index * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* Button/element that leans toward the cursor. */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* Real perspective tilt driven by pointer position over the card. */
export function TiltCard({ children, className = "", max = 9, glare = true, style }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const config = { stiffness: 160, damping: 20, mass: 0.5 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), config);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), config);
  const glareBg = useTransform(
    [px, py],
    ([a, b]) => `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,.14), transparent 60%)`
  );

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, ...style }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
      {glare && (
        <motion.span className="tilt-glare" aria-hidden="true" style={{ background: glareBg }} />
      )}
    </motion.div>
  );
}

/*
 * Counts up once the block scrolls into view. It renders the real number on the
 * server and only drops to zero after mounting, so crawlers and no-JS readers
 * never see "0+"; a timeout also snaps it home if rAF is throttled.
 */
export function Counter({ value, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);
  const started = useRef(0);
  const done = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done.current = true;
      return undefined;
    }
    setDisplay(0);
    setArmed(true);
    const safety = window.setTimeout(() => {
      if (!done.current) {
        done.current = true;
        setDisplay(value);
      }
    }, duration * 1000 + 2500);
    return () => window.clearTimeout(safety);
  }, [value, duration]);

  useAnimationFrame((t) => {
    if (!armed || !inView || done.current) return;
    if (!started.current) started.current = t;
    const progress = Math.min(1, (t - started.current) / (duration * 1000));
    const eased = 1 - Math.pow(1 - progress, 3);
    setDisplay(Math.round(value * eased));
    if (progress === 1) done.current = true;
  });

  return (
    <span ref={ref}>
      {String(display).padStart(String(value).length, "0")}
      {suffix}
    </span>
  );
}

/* Live clock for a given IANA zone. */
export function LocalTime({ timezone }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: timezone,
          }).format(new Date())
        );
      } catch (error) {
        setTime("");
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timezone]);
  return <span suppressHydrationWarning>{time || "--:--:--"}</span>;
}

/* Infinite horizontal marquee that never resets visibly. */
export function Marquee({ children, speed = 40, reverse = false, className = "" }) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/*
 * Marquee whose speed and skew answer to how hard you are scrolling — it drifts
 * on its own, then surges and leans in the direction of travel.
 */
export function ScrollMarquee({ children, baseVelocity = 3, className = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((t, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`marquee ${className}`}>
      <motion.div className="marquee-track is-scroll" style={{ x, skewX: skew }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* Image that drifts against the scroll for a sense of depth. */
export function ParallaxBox({ children, className = "", distance = 40, tag = "div" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const Outer = tag;
  const Inner = motion[tag] || motion.div;
  return (
    <Outer ref={ref} className={className}>
      <Inner style={{ y }} className="parallax-inner">
        {children}
      </Inner>
    </Outer>
  );
}

/* Sets --mx/--my on the element so CSS can paint a spotlight under the cursor. */
export function Spotlight({ children, className = "", as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const onMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };
  return (
    <Tag ref={ref} className={`spotlight ${className}`} onPointerMove={onMove} {...rest}>
      {children}
    </Tag>
  );
}
