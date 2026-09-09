"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { person } from "../lib/data";
import { EASE } from "./ui";
import { sections } from "./Nav";

export default function CommandPalette({ open, onClose, onToggleTheme, theme }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const go = sections.map((item) => ({
      id: `go-${item.id}`,
      group: "Navigate",
      title: item.label,
      hint: `Jump to ${item.label.toLowerCase()}`,
      icon: "→",
      run: () => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }),
    }));
    return [
      ...go,
      {
        id: "theme",
        group: "Actions",
        title: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        hint: "Toggle the theme",
        icon: theme === "dark" ? "☀" : "☾",
        run: onToggleTheme,
      },
      {
        id: "email",
        group: "Actions",
        title: "Email John",
        hint: person.email,
        icon: "✉",
        run: () => {
          window.location.href = `mailto:${person.email}`;
        },
      },
      {
        id: "copy",
        group: "Actions",
        title: "Copy email address",
        hint: person.email,
        icon: "⧉",
        run: () => navigator.clipboard?.writeText(person.email),
      },
      {
        id: "github",
        group: "Elsewhere",
        title: "GitHub",
        hint: "github.com/johnAbbas-web",
        icon: "↗",
        run: () => window.open(person.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        group: "Elsewhere",
        title: "LinkedIn",
        hint: "Professional profile",
        icon: "↗",
        run: () => window.open(person.linkedin, "_blank", "noopener"),
      },
      {
        id: "top",
        group: "Actions",
        title: "Back to top",
        hint: "Return to the hero",
        icon: "↑",
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    ];
  }, [onToggleTheme, theme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.title} ${c.hint} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [open]);

  const runCommand = (command) => {
    onClose();
    window.setTimeout(() => command.run?.(), 120);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % Math.max(1, results.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(1, results.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (results[active]) runCommand(results[active]);
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="palette-input">
              <span aria-hidden="true">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, actions, links…"
                aria-label="Search commands"
              />
              <kbd>esc</kbd>
            </div>
            <div className="palette-list" role="listbox">
              {results.length === 0 && <p className="palette-empty">Nothing matches “{query}”.</p>}
              {results.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                return (
                  <div key={command.id}>
                    {showGroup && <p className="palette-group">{command.group}</p>}
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === active}
                      className={`palette-item ${index === active ? "is-active" : ""}`}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => runCommand(command)}
                    >
                      <i aria-hidden="true">{command.icon}</i>
                      <strong>{command.title}</strong>
                      <small>{command.hint}</small>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="palette-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>⌘</kbd><kbd>K</kbd> toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
