import "./globals.css";

export const metadata = {
  title: "John Abbas | Full Stack Engineer",
  description: "Portfolio of John Abbas, a Full Stack Software Engineer and Technical Consultant.",
  icons: { icon: "/assets/images/ja-logo.png", apple: "/assets/images/ja-logo.png" },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
