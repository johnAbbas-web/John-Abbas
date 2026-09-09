import { person } from "./lib/data";

export default function manifest() {
  return {
    name: `${person.name} — ${person.role}`,
    short_name: "John Abbas",
    description:
      "Portfolio of John Abbas, a Full Stack Engineer and Technical Consultant building FinTech platforms and secure enterprise applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#060a14",
    theme_color: "#060a14",
    icons: [{ src: "/assets/images/ja-logo.png", sizes: "512x512", type: "image/png" }],
  };
}
