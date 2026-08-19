"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const projects = [
  { name: "CoolShift", type: "Cooling optimisation dashboard", image: "/assets/images/coolshift-dashboard.png", sideImage: "/assets/images/coolshift-login.png", detail: "Live room data, energy imports and cost-impact insights for facilities teams.", tags: ["Angular", "SQL", "XLSX imports"] },
  { name: "Core Banking", type: "Secure FinTech platform", image: "/assets/images/banking.png", detail: "Corporate banking flows, transaction monitoring and financial data integrations.", tags: ["Finastra", "Oracle SQL", "Security"] },
  { name: "Crime Management", type: "Role-based case system", image: "/assets/images/crime-dashboard.png", sideImage: "/assets/images/crime-login.png", detail: "Clear complaint, FIR and case tracking with search, audit trails and reporting.", tags: ["React", "Firebase", "SQL"] },
  { name: "Building OS", type: "IoT command centre", image: "/assets/images/building.png", detail: "Real-time facility monitoring, device management and scheduled analytics.", tags: ["React", "REST APIs", "IoT"] },
  { name: "Retail POS", type: "Checkout & inventory", image: "/assets/images/pos.png", detail: "Fast retail checkout, discounts, inventory and digital receipts in one flow.", tags: ["Angular", "Firebase Auth", "Reports"] },
  { name: "Courier Flow", type: "Logistics management", image: "/assets/images/courier.png", detail: "Delivery routes, driver assignments, shipping progress and reporting.", tags: ["React", "Oracle DB", "Maps"] },
];

const skills = ["React", "Angular", "Next.js", "JavaScript", "Oracle SQL", "Firebase", "REST APIs", "UI/UX", "FinTech", "Dashboards"];
const tickerItems = ["REACT", "ANGULAR", "FINTECH", "ORACLE SQL", "PRODUCT DESIGN"];
const ease = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = "" }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % projects.length), 3000);
    return () => window.clearInterval(timer);
  }, []);
  const sendEnquiry = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nProject details:\n${data.get("message")}`);
    setSubmitted(true);
    window.setTimeout(() => {
      window.location.href = `mailto:john.irfan.am.2023@gmail.com?subject=${subject}&body=${body}`;
    }, 350);
  };

  return <main>
    <motion.div className="progress" style={{ scaleX }} />
    <nav className="nav shell">
      <a className="brand" href="#home" onClick={() => setOpen(false)}><Image src="/assets/images/ja-logo.png" alt="John Abbas logo" width={40} height={40} /></a>
      <button className="menu" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
      <div className={`navlinks ${open ? "show" : ""}`}>
        {["About", "Experience", "Work", "Skills", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
      </div>
    </nav>

    <section id="home" className="hero shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="hero-copy">
        <motion.p className="kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>FULL STACK ENGINEER · PAKISTAN</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .25, ease }}>Engineering digital<br />products that <em>deliver.</em></motion.h1>
        <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>I&apos;m John Abbas, a Full Stack Engineer and Technical Consultant focused on secure enterprise applications, FinTech workflows and high-performing data platforms.</motion.p>
        <motion.div className="actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75 }}>
          <a className="button primary" href="#work">Explore selected work <b>↗</b></a>
          <a className="button quiet" href="mailto:john.irfan.am.2023@gmail.com">Let&apos;s talk</a>
        </motion.div>
      </div>
      <motion.div className="portrait-wrap" initial={{ opacity: 0, scale: .94, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: .25, ease }}>
        <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
        <Image src="/john.png" alt="John Abbas" width={720} height={960} priority className="portrait" />
        <motion.div className="availability" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}><span /> Available for new work</motion.div>
        <motion.div className="portrait-code" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}> <i>⌘</i><div><b>React + Angular</b><small>Build mode: on</small></div></motion.div>
      </motion.div>
      <div className="hero-note">SCROLL TO DISCOVER <span>↓</span></div>
    </section>

    <section className="hero-metrics shell" aria-label="Professional highlights">
      {[['03+', 'Years engineering'], ['20+', 'Products & systems'], ['03+', 'Years in FinTech'], ['100%', 'Intentional delivery']].map(([number, label], index) => <motion.div className="metric" key={label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .09 }}><strong>{number}</strong><span>{label}</span></motion.div>)}
    </section>
    <div className="ticker" aria-hidden="true"><div>{Array.from({ length: 4 }, (_, group) => tickerItems.map((item) => <span key={`${group}-${item}`}>{item} <b>✦</b></span>))}</div></div>

    <section id="about" className="about shell section">
      <Reveal><p className="kicker">01 / ABOUT ME</p><h2>Complex systems,<br /><em>made clear.</em></h2></Reveal>
      <Reveal delay={.12} className="about-copy"><p>I turn ambiguous requirements into secure, scalable web products people enjoy using. My work lives at the intersection of engineering precision and practical design.</p><p>With 2.5+ years in enterprise applications and FinTech, I build responsive frontend experiences backed by reliable data and integrations.</p><div className="focus-card"><span>NOW FOCUSED ON</span><strong>Reliable systems with a sharp human edge.</strong><i>↘</i></div><a className="text-link" href="https://www.linkedin.com/in/john-abbas-a234862a5" target="_blank">More about my journey <b>↗</b></a></Reveal>
    </section>

    <section id="experience" className="experience shell section">
      <Reveal><p className="kicker">02 / EXPERIENCE</p><h2>Trusted with<br /><em>important systems.</em></h2></Reveal>
      <div className="experience-grid">
        <Reveal delay={.08}><motion.article className="experience-card featured" whileHover={{ scale: 1.015 }}><span className="date">2024 — Present</span><h3>Technical Consultant</h3><p className="company">Douzetech · Pakistan</p><p>Developing FinTech modules, secure client banking workflows, dashboards and Oracle-powered enterprise products.</p><div className="experience-points"><span>Finastra & Finexcore</span><span>Oracle & Firebase</span><span>Enterprise UX</span></div></motion.article></Reveal>
        <Reveal delay={.16}><div className="mini-exp"><span>2023 — 2024</span><div><strong>Customer Operations Executive</strong><p>MARS BPO</p></div></div><div className="mini-exp"><span>2022 — 2023</span><div><strong>Sales Associate</strong><p>DNX Sales Company</p></div></div></Reveal>
      </div>
    </section>

    <section id="work" className="work section">
      <div className="shell"><Reveal><p className="kicker">03 / SELECTED WORK</p><div className="section-title"><h2>Products with<br /><em>purpose.</em></h2><p>Enterprise solutions built to make complex work feel simple.</p></div></Reveal>
        <Reveal delay={.12}><div className="project-slider"><div className="slider-top"><span>PROJECT {String(slide + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><div className="slider-controls"><button aria-label="Previous project" onClick={() => setSlide((slide + projects.length - 1) % projects.length)}>←</button><button aria-label="Next project" onClick={() => setSlide((slide + 1) % projects.length)}>→</button></div></div><AnimatePresence mode="wait"><motion.article className="feature-project" key={projects[slide].name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: .45, ease }}><div className="feature-image"><Image src={projects[slide].image} alt={`${projects[slide].name} screenshot`} fill sizes="(max-width: 760px) 92vw, 58vw" />{projects[slide].sideImage && <motion.div className="feature-side-shot" animate={{ y: [0, -10, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}><Image src={projects[slide].sideImage} alt={`${projects[slide].name} secondary screen`} fill sizes="180px" /></motion.div>}</div><div className="feature-copy"><p className="project-number">0{slide + 1}</p><h3>{projects[slide].name}</h3><h4>{projects[slide].type}</h4><p>{projects[slide].detail}</p><div className="tags">{projects[slide].tags.map(tag => <small key={tag}>{tag}</small>)}</div><a className="text-link light" href="https://github.com/johnAbbas-web" target="_blank">View related work <b>↗</b></a></div></motion.article></AnimatePresence><div className="slider-dots">{projects.map((project, index) => <button key={project.name} onClick={() => setSlide(index)} className={index === slide ? "active" : ""} aria-label={`View ${project.name}`} />)}</div></div></Reveal>
      </div>
    </section>

    <section id="skills" className="skills shell section"><Reveal><p className="kicker">04 / TOOLKIT</p><h2>Built for the<br /><em>real world.</em></h2></Reveal><div className="skill-list">{skills.map((skill, index) => <Reveal key={skill} delay={index * .045}><motion.div className="skill" whileHover={{ x: 8 }}><span>0{index + 1}</span><strong>{skill}</strong><b>+</b></motion.div></Reveal>)}</div></section>

    <section id="contact" className="contact"><div className="shell"><Reveal><p className="kicker">05 / GET IN TOUCH</p><div className="contact-grid"><div><h2>Let&apos;s build<br /><em>something useful.</em></h2><p className="contact-intro">Whether you need a reliable internal platform, a customer-facing portal or an expert technical partner, I&apos;d be glad to hear about it.</p><div className="contact-details"><a href="mailto:john.irfan.am.2023@gmail.com">john.irfan.am.2023@gmail.com</a><span>Pakistan · Available remotely</span></div></div><form className="contact-form" onSubmit={sendEnquiry}><label>Your name<input name="name" required placeholder="Jane Smith" /></label><label>Email address<input type="email" name="email" required placeholder="jane@company.com" /></label><label>Tell me about your project<textarea name="message" required rows="4" placeholder="A little context about what you would like to build..." /></label><button className="submit" type="submit">Send enquiry <span>↗</span></button>{submitted && <p className="form-success" role="status">Thank you — your email app is ready with this enquiry.</p>}</form></div></Reveal><div className="footer"><span>© 2026 John Abbas</span><div><a href="https://github.com/johnAbbas-web" target="_blank">GitHub</a><a href="https://www.linkedin.com/in/john-abbas-a234862a5" target="_blank">LinkedIn</a></div></div></div></section>
  </main>;
}
