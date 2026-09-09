"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import CommandPalette from "./components/CommandPalette";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import ProjectModal from "./components/ProjectModal";
import SectionRail from "./components/SectionRail";
import { About, Contact, Experience, Footer, Process, Services, Skills, Stats, Ticker, Work } from "./components/Sections";
import { person, projects } from "./lib/data";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [ready, setReady] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const stored = window.localStorage.getItem("ja-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(stored || (prefersLight ? "light" : "dark"));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("ja-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const handleReady = useCallback(() => setReady(true), []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sendEnquiry = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nProject details:\n${data.get("message")}`
    );
    setSubmitted(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
    }, 400);
  };

  return (
    <>
      <Preloader onDone={handleReady} />
      <Cursor />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav theme={theme} onToggleTheme={toggleTheme} onOpenPalette={openPalette} />
      <SectionRail />

      <main>
        <Hero theme={theme} ready={ready} />
        <Ticker />
        <Stats />
        <About />
        <Services />
        <Work projects={projects} onOpen={setActiveProject} />
        <Process />
        <Experience />
        <Skills />
        <Contact onSubmit={sendEnquiry} submitted={submitted} />
      </main>

      <Footer />

      <ProjectModal project={activeProject} onClose={closeProject} />
      <CommandPalette
        open={paletteOpen}
        onClose={closePalette}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
    </>
  );
}
