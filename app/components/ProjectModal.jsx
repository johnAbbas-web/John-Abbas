"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { EASE } from "./ui";
import { person } from "../lib/data";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.article
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} case study`}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            style={{ "--accent": project.accent }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close case study">
              ✕
            </button>

            <div className="modal-hero">
              <Image src={project.image} alt={`${project.name} interface`} fill sizes="(max-width: 900px) 96vw, 900px" />
              {project.sideImage && (
                <motion.div
                  className="modal-side"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image src={project.sideImage} alt={`${project.name} secondary screen`} fill sizes="200px" />
                </motion.div>
              )}
            </div>

            <div className="modal-body">
              <div className="modal-title">
                <h3>{project.name}</h3>
                <span>{project.year}</span>
              </div>
              <p className="modal-type">{project.type}</p>
              <p className="modal-summary">{project.summary}</p>

              <div className="modal-cols">
                <div>
                  <span className="mini-label">WHAT IT DOES</span>
                  <ul className="modal-list">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="mini-label">BUILT WITH</span>
                  <div className="chip-row">
                    {project.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <a className="btn btn-primary" href={person.github} target="_blank" rel="noreferrer">
                  <span>Related work on GitHub</span>
                  <i aria-hidden="true">↗</i>
                </a>
                <a className="btn btn-ghost" href={`mailto:${person.email}?subject=About ${project.name}`}>
                  <span>Ask about this project</span>
                </a>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
