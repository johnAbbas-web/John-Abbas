"use client";

import { useEffect, useRef, useState } from "react";

const words = ["Systems", "FinTech", "Dashboards", "John Abbas"];

/*
 * Deliberately built on timers + CSS transitions rather than requestAnimationFrame.
 * A tab opened in the background has rAF paused, and a preloader that cannot finish
 * would leave the visitor staring at a blank screen when they come back to it.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);
  const [phase, setPhase] = useState("run"); // run → exit → gone

  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      doneRef.current?.();
      return undefined;
    }

    const start = performance.now();
    const total = 1900;

    const interval = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / total);
      const eased = 1 - Math.pow(1 - p, 2.2);
      setCount(Math.round(eased * 100));
      setWord(Math.min(words.length - 1, Math.floor(eased * words.length)));
      if (p >= 1) window.clearInterval(interval);
    }, 40);

    const exitTimer = window.setTimeout(() => {
      setCount(100);
      setWord(words.length - 1);
      setPhase("exit");
      doneRef.current?.();
    }, total + 340);

    const goneTimer = window.setTimeout(() => setPhase("gone"), total + 340 + 1150);

    document.body.classList.add("is-loading");
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(exitTimer);
      window.clearTimeout(goneTimer);
      document.body.classList.remove("is-loading");
    };
  }, []);

  useEffect(() => {
    if (phase !== "run") document.body.classList.remove("is-loading");
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div className={`preloader ${phase === "exit" ? "is-exiting" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-word">
          <span key={words[word]}>{words[word]}</span>
        </div>
        <div className="preloader-count">{String(count).padStart(3, "0")}</div>
      </div>
      <div className="preloader-bar">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}
