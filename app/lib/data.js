// Set NEXT_PUBLIC_SITE_URL to the live domain before deploying — canonical URLs,
// the sitemap, robots.txt and every structured-data @id are built from it.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://john-abbas.vercel.app").replace(/\/$/, "");

export const person = {
  name: "John Abbas",
  role: "Full Stack Engineer & Technical Consultant",
  jobTitle: "Full Stack Software Engineer and Technical Consultant",
  email: "john.irfan.am.2023@gmail.com",
  location: "Pakistan",
  locality: "Lahore",
  country: "PK",
  timezone: "Asia/Karachi",
  company: "Douzetech",
  github: "https://github.com/johnAbbas-web",
  linkedin: "https://www.linkedin.com/in/john-abbas-a234862a5",
  knowsAbout: [
    "Full Stack Development",
    "FinTech Software Development",
    "React",
    "Angular",
    "Next.js",
    "JavaScript",
    "Oracle Database",
    "SQL",
    "Firebase",
    "REST APIs",
    "Enterprise Web Applications",
    "Dashboard Development",
    "UI/UX Development",
    "Core Banking Systems",
    "Finastra",
  ],
};

export const stats = [
  { value: 3, suffix: "+", label: "Years engineering" },
  { value: 20, suffix: "+", label: "Products shipped" },
  { value: 3, suffix: "+", label: "Years in FinTech" },
  { value: 100, suffix: "%", label: "Intentional delivery" },
];

export const projects = [
  {
    id: "coolshift",
    name: "CoolShift",
    type: "Cooling optimisation dashboard",
    year: "2025",
    image: "/assets/images/coolshift-dashboard.png",
    sideImage: "/assets/images/coolshift-login.png",
    detail: "Live room data, energy imports and cost-impact insights for facilities teams.",
    summary:
      "A control room for building cooling. Facilities teams import meter data, watch every room in real time and see exactly what each degree costs them.",
    tags: ["Angular", "SQL", "XLSX imports"],
    highlights: [
      "Bulk XLSX ingestion with validation and rollback",
      "Room-level telemetry rendered without jank",
      "Cost modelling that turns kWh into rupees",
    ],
    accent: "#4d94ff",
  },
  {
    id: "core-banking",
    name: "Core Banking",
    type: "Secure FinTech platform",
    year: "2024",
    image: "/assets/images/banking.png",
    detail: "Corporate banking flows, transaction monitoring and financial data integrations.",
    summary:
      "Corporate banking workflows built on Finastra and Oracle — where a mis-keyed field is not a bug, it is money.",
    tags: ["Finastra", "Oracle SQL", "Security"],
    highlights: [
      "Maker–checker approval chains end to end",
      "Transaction monitoring with audit trails",
      "Hardened auth and role isolation",
    ],
    accent: "#1e4fa3",
  },
  {
    id: "crime-management",
    name: "Crime Management",
    type: "Role-based case system",
    year: "2024",
    image: "/assets/images/crime-dashboard.png",
    sideImage: "/assets/images/crime-login.png",
    detail: "Clear complaint, FIR and case tracking with search, audit trails and reporting.",
    summary:
      "Complaints, FIRs and case files in one searchable spine, with permissions that actually match how a station works.",
    tags: ["React", "Firebase", "SQL"],
    highlights: [
      "Granular role-based access control",
      "Full-text search across case history",
      "Printable reports for court submission",
    ],
    accent: "#6fa8ff",
  },
  {
    id: "building-os",
    name: "Building OS",
    type: "IoT command centre",
    year: "2025",
    image: "/assets/images/building.png",
    detail: "Real-time facility monitoring, device management and scheduled analytics.",
    summary:
      "One screen for every sensor in the building — device health, live readings and scheduled analytics that run while you sleep.",
    tags: ["React", "REST APIs", "IoT"],
    highlights: [
      "Streaming device state over REST polling",
      "Scheduled analytics jobs with retries",
      "Fleet management for hundreds of devices",
    ],
    accent: "#2f6fd0",
  },
  {
    id: "retail-pos",
    name: "Retail POS",
    type: "Checkout & inventory",
    year: "2023",
    image: "/assets/images/pos.png",
    detail: "Fast retail checkout, discounts, inventory and digital receipts in one flow.",
    summary:
      "A till that keeps up with a queue. Keyboard-first checkout, live stock, discounts and digital receipts.",
    tags: ["Angular", "Firebase Auth", "Reports"],
    highlights: [
      "Keyboard-driven checkout under 3 seconds",
      "Inventory that reconciles as you sell",
      "Digital receipts and daily close reports",
    ],
    accent: "#8fc4ff",
  },
  {
    id: "courier-flow",
    name: "Courier Flow",
    type: "Logistics management",
    year: "2023",
    image: "/assets/images/courier.png",
    detail: "Delivery routes, driver assignments, shipping progress and reporting.",
    summary:
      "Routes, drivers and parcels tracked from pickup to doorstep, with the reporting dispatch actually asks for.",
    tags: ["React", "Oracle DB", "Maps"],
    highlights: [
      "Driver assignment with load balancing",
      "Shipment lifecycle tracking",
      "Operational reporting for dispatch",
    ],
    accent: "#a8bcd6",
  },
];

export const services = [
  {
    n: "01",
    title: "Enterprise web apps",
    body: "Dashboards, admin panels and internal tools that stay fast when the data gets ugly.",
    items: ["React", "Angular", "Next.js"],
  },
  {
    n: "02",
    title: "FinTech & secure systems",
    body: "Banking workflows, approval chains and auth models built to survive an audit.",
    items: ["Finastra", "Oracle", "RBAC"],
  },
  {
    n: "03",
    title: "Data & integrations",
    body: "APIs, imports and reporting layers that connect systems which were never meant to talk.",
    items: ["REST APIs", "SQL", "Firebase"],
  },
];

export const experience = [
  {
    period: "2024 — Present",
    role: "Technical Consultant",
    company: "Douzetech · Pakistan",
    body: "Developing FinTech modules, secure client banking workflows, dashboards and Oracle-powered enterprise products.",
    points: ["Finastra & Finexcore", "Oracle & Firebase", "Enterprise UX"],
    featured: true,
  },
  {
    period: "2023 — 2024",
    role: "Customer Operations Executive",
    company: "MARS BPO",
    body: "Owned client communication and escalation paths — the habit of writing clearly started here.",
    points: ["Client comms", "Escalations"],
  },
  {
    period: "2022 — 2023",
    role: "Sales Associate",
    company: "DNX Sales Company",
    body: "Learned to read what a customer actually needs versus what they first ask for.",
    points: ["Discovery", "Negotiation"],
  },
];

export const skillGroups = [
  { title: "Frontend", items: ["React", "Angular", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend & data", items: ["Oracle Database", "SQL", "Firebase", "REST APIs", "Auth systems"] },
  { title: "Craft", items: ["UI/UX", "Dashboards", "Data analytics", "FinTech systems", "Performance"] },
];

export const orbitTech = ["React", "Angular", "Next.js", "Oracle", "Firebase", "SQL", "REST", "Tailwind"];

export const processSteps = [
  { n: "01", title: "Understand", body: "Sit with the actual workflow before writing a line. Most requirements are a guess until you watch someone work." },
  { n: "02", title: "Shape", body: "Turn the mess into a model — screens, states and data that hold together under real load." },
  { n: "03", title: "Build", body: "Ship in slices. Something usable early, hardened as it goes, never a six-month reveal." },
  { n: "04", title: "Hand over", body: "Documented, monitored and handed to a team that can run it without me in the room." },
];

export const tickerItems = ["REACT", "ANGULAR", "FINTECH", "ORACLE SQL", "PRODUCT DESIGN", "NEXT.JS", "DASHBOARDS"];
