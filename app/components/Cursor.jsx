"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Two-part cursor: a small dot that tracks exactly, and a ring that lags behind.
 * The ring swells and picks up a label when it is over anything interactive.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const el = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      const interactive =
        el || (event.target instanceof Element ? event.target.closest("a, button, input, textarea, [role='button']") : null);
      setLabel(el?.getAttribute("data-cursor") || (interactive ? " " : ""));
    };

    const onDown = () => ringRef.current?.classList.add("is-down");
    const onUp = () => ringRef.current?.classList.remove("is-down");
    const onLeave = () => ringRef.current?.classList.add("is-hidden");
    const onEnter = () => ringRef.current?.classList.remove("is-hidden");

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`cursor-ring ${label ? "is-active" : ""} ${label.trim() ? "is-labelled" : ""}`}
        aria-hidden="true"
      >
        <span>{label.trim()}</span>
      </div>
    </>
  );
}
