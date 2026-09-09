import { ImageResponse } from "next/og";

export const alt = "John Abbas — Full Stack Engineer & FinTech Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time, so social cards stay in sync with the site's palette.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #060a14 0%, #0a1120 45%, #14315e 100%)",
          color: "#eef3fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#4d94ff",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#8694ab", display: "flex" }}>
            AVAILABLE FOR NEW WORK · PAKISTAN
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, display: "flex" }}>
            John Abbas
          </div>
          <div style={{ fontSize: 40, color: "#8fc4ff", letterSpacing: -1, display: "flex" }}>
            Full Stack Engineer &amp; Technical Consultant
          </div>
          <div style={{ fontSize: 28, color: "#8694ab", maxWidth: 900, display: "flex" }}>
            FinTech platforms, secure enterprise applications and data-driven dashboards.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["React", "Angular", "Next.js", "Oracle SQL", "Firebase", "FinTech"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(150,185,255,0.28)",
                color: "#c9d4e3",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
