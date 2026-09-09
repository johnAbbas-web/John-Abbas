"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Counter, EASE, Magnetic, ParallaxBox, Reveal, ScrollMarquee, SplitText, Spotlight, TiltCard } from "./ui";
import { experience, orbitTech, person, processSteps, services, skillGroups, stats, tickerItems } from "../lib/data";

function SectionHead({ index, kicker, title, accent, lede }) {
  return (
    <div className="section-head">
      <Reveal>
        <p className="eyebrow">
          <b>{index}</b> {kicker}
        </p>
      </Reveal>
      <h2 className="section-title">
        <SplitText text={title} />
        {accent && <SplitText text={accent} className="accent" delay={0.12} />}
      </h2>
      {lede && (
        <Reveal delay={0.14}>
          <p className="section-lede">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <ScrollMarquee baseVelocity={2.2}>
        {tickerItems.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item} <b>✦</b>
          </span>
        ))}
      </ScrollMarquee>
    </div>
  );
}

export function Stats() {
  return (
    <section className="stats shell" aria-label="Highlights">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="stat"
          initial={{ opacity: 0, y: 26, rotateX: -22 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
        >
          <strong>
            <Counter value={stat.value} suffix={stat.suffix} />
          </strong>
          <span>{stat.label}</span>
        </motion.div>
      ))}
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section about shell">
      <SectionHead index="01" kicker="ABOUT" title="Complex systems," accent="made clear." />

      <div className="bento">
        <Reveal delay={0.05} className="bento-cell bento-lead">
          <Spotlight className="bento-card">
            <p>
              I turn ambiguous requirements into secure, scalable web products people actually enjoy using. My work sits
              where engineering precision meets practical design.
            </p>
            <p>
              Three years across enterprise applications and FinTech taught me the same lesson repeatedly: the hard part
              is never the framework, it&apos;s the workflow underneath it.
            </p>
            <a className="text-link" href={person.linkedin} target="_blank" rel="noreferrer" data-cursor="Open">
              More about my journey <b aria-hidden="true">↗</b>
            </a>
          </Spotlight>
        </Reveal>

        <Reveal delay={0.12} className="bento-cell bento-focus">
          <Spotlight className="bento-card">
            <span className="mini-label">NOW FOCUSED ON</span>
            <strong>Reliable systems with a sharp human edge.</strong>
            <i aria-hidden="true">↘</i>
          </Spotlight>
        </Reveal>

        <Reveal delay={0.18} className="bento-cell bento-stack">
          <Spotlight className="bento-card">
          <span className="mini-label">DAILY DRIVERS</span>
          <ul>
            {["React", "Angular", "Next.js", "Oracle SQL", "Firebase"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          </Spotlight>
        </Reveal>

        <Reveal delay={0.24} className="bento-cell bento-quote">
          <Spotlight className="bento-card">
          <blockquote>
            “Ship something usable early, then harden it — never a six-month reveal.”
          </blockquote>
          <cite>— how I work</cite>
          </Spotlight>
        </Reveal>

        <Reveal delay={0.3} className="bento-cell bento-loc">
          <Spotlight className="bento-card">
          <span className="mini-label">BASED IN</span>
          <strong>{person.location}</strong>
          <small>Working remotely with teams worldwide</small>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="section services shell">
      <span className="aurora" aria-hidden="true">
        <i />
        <i />
      </span>
      <SectionHead
        index="02"
        kicker="WHAT I DO"
        title="Three ways"
        accent="I help."
        lede="Most engagements start as one of these and grow into the others."
      />
      <div className="service-grid">
        {services.map((service, index) => (
          <Reveal key={service.n} delay={index * 0.1}>
            <TiltCard className="service-card" max={7}>
              <span className="service-n">{service.n}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <div className="chip-row">
                {service.items.map((item) => (
                  <small key={item}>{item}</small>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Work({ projects, onOpen }) {
  return (
    <section id="work" className="section work">
      <span className="aurora" aria-hidden="true">
        <i />
        <i />
      </span>
      <div className="shell">
        <SectionHead
          index="03"
          kicker="SELECTED WORK"
          title="Products with"
          accent="purpose."
          lede="Enterprise systems built to make complicated work feel simple. Open one for the detail."
        />
      </div>

      <div className="shell work-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 0.08} className={index % 3 === 0 ? "wide" : ""}>
            <TiltCard className="project-card" max={6}>
              <button
                type="button"
                className="project-hit"
                onClick={() => onOpen(project)}
                data-cursor="Open case"
                aria-label={`Open ${project.name} case study`}
              >
                <span className="project-shot">
                  <ParallaxBox className="project-shot-inner" distance={18} tag="span">
                  <Image
                    src={project.image}
                    alt={`${project.name} interface`}
                    fill
                    sizes="(max-width: 900px) 92vw, 46vw"
                  />
                  </ParallaxBox>
                  <span className="project-sheen" aria-hidden="true" />
                </span>
                <span className="project-body">
                  <span className="project-row">
                    <span className="project-name">{project.name}</span>
                    <span className="project-year">{project.year}</span>
                  </span>
                  <span className="project-type">{project.type}</span>
                  <span className="chip-row">
                    {project.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </span>
                </span>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </button>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="section process shell">
      <SectionHead index="04" kicker="PROCESS" title="How the work" accent="actually goes." />
      <div className="process-list" ref={ref}>
        <span className="process-rail" aria-hidden="true">
          <motion.i style={{ height }} />
        </span>
        {processSteps.map((step, index) => (
          <Reveal key={step.n} delay={index * 0.06} className="process-step">
            <span className="process-n">{step.n}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section experience shell">
      <SectionHead index="05" kicker="EXPERIENCE" title="Trusted with" accent="important systems." />
      <div className="timeline">
        {experience.map((job, index) => (
          <Reveal key={job.role} delay={index * 0.08}>
            <article className={`job ${job.featured ? "is-featured" : ""}`}>
              <span className="job-period">{job.period}</span>
              <div className="job-main">
                <h3>{job.role}</h3>
                <p className="job-company">{job.company}</p>
                <p className="job-body">{job.body}</p>
                <div className="chip-row">
                  {job.points.map((point) => (
                    <small key={point}>{point}</small>
                  ))}
                </div>
              </div>
              <span className="job-dot" aria-hidden="true" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section skills shell">
      <SectionHead index="06" kicker="TOOLKIT" title="Built for the" accent="real world." />

      <div className="skills-layout">
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08} className="skill-group">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <motion.li key={item} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
                    <span>{item}</span>
                    <b aria-hidden="true">+</b>
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="orbit-wrap">
          <div className="orbit" aria-hidden="true">
            {orbitTech.map((tech, index) => (
              <span
                key={tech}
                className="orbit-item"
                style={{ transform: `rotateY(${(360 / orbitTech.length) * index}deg) translateZ(150px)` }}
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="orbit-caption">The stack I reach for first</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact({ onSubmit, submitted }) {
  return (
    <section id="contact" className="section contact">
      <span className="aurora" aria-hidden="true">
        <i />
        <i />
      </span>
      <div className="shell">
        <div className="contact-grid">
          <div>
            <SectionHead index="07" kicker="GET IN TOUCH" title="Let's build" accent="something useful." />
            <Reveal delay={0.1}>
              <p className="contact-intro">
                Whether it&apos;s a reliable internal platform, a customer-facing portal, or a technical partner who asks
                the awkward questions early — I&apos;d be glad to hear about it.
              </p>
              <div className="contact-details">
                <a href={`mailto:${person.email}`} data-cursor="Email">
                  {person.email}
                </a>
                <span>{person.location} · Available remotely</span>
              </div>
              <div className="contact-socials">
                <Magnetic strength={0.2}>
                  <a href={person.github} target="_blank" rel="noreferrer" data-cursor="Open">
                    GitHub <b aria-hidden="true">↗</b>
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href={person.linkedin} target="_blank" rel="noreferrer" data-cursor="Open">
                    LinkedIn <b aria-hidden="true">↗</b>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                <span>Your name</span>
                <input name="name" required placeholder="Jane Smith" autoComplete="name" />
              </label>
              <label>
                <span>Email address</span>
                <input type="email" name="email" required placeholder="jane@company.com" autoComplete="email" />
              </label>
              <label>
                <span>About the project</span>
                <textarea name="message" required rows="4" placeholder="A little context on what you'd like to build…" />
              </label>
              <button className="btn btn-primary btn-block" type="submit" data-cursor="Send">
                <span>Send enquiry</span>
                <i aria-hidden="true">↗</i>
              </button>
              {submitted && (
                <motion.p
                  className="form-success"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: EASE }}
                >
                  Thank you — your email app is opening with this enquiry.
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <ScrollMarquee baseVelocity={1.6} className="footer-marquee">
        {["JOHN ABBAS", "✦", "FULL STACK ENGINEER", "✦", "LET'S BUILD", "✦"].map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </ScrollMarquee>
      <div className="shell footer-bar">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span className="footer-built">Built with Next.js, Three.js &amp; Motion</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-cursor="Top">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
