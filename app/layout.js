import "./globals.css";
import { person, siteUrl } from "./lib/data";
import { buildJsonLd } from "./lib/seo";

const description =
  "John Abbas is a Full Stack Software Engineer and Technical Consultant in Pakistan, building FinTech platforms, secure enterprise web applications, dashboards and Oracle-powered data systems with React, Angular and Next.js.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "John Abbas — Full Stack Engineer & FinTech Developer",
    template: "%s | John Abbas",
  },
  description,
  applicationName: "John Abbas Portfolio",
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  category: "technology",
  keywords: [
    "John Abbas",
    "John Abbas developer",
    "Full Stack Engineer Pakistan",
    "FinTech developer",
    "FinTech software engineer",
    "React developer Pakistan",
    "Angular developer",
    "Next.js developer",
    "Oracle SQL developer",
    "enterprise web application developer",
    "dashboard developer",
    "technical consultant",
    "core banking software developer",
    "Finastra developer",
    "hire full stack developer",
    "freelance software engineer Pakistan",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: "John Abbas — Full Stack Engineer",
    title: "John Abbas — Full Stack Engineer & FinTech Developer",
    description,
    locale: "en_US",
    firstName: "John",
    lastName: "Abbas",
    username: "johnAbbas-web",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Abbas — Full Stack Engineer & FinTech Developer",
    description,
    creator: "@johnabbas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/images/ja-logo.png",
    shortcut: "/assets/images/ja-logo.png",
    apple: "/assets/images/ja-logo.png",
  },
  // Paste the token from Google Search Console here once the domain is verified.
  // verification: { google: "..." },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a14" },
    { media: "(prefers-color-scheme: light)", color: "#f3f6fb" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Applies the stored theme before first paint so there is no flash of the wrong palette.
const themeScript = `(function(){try{var t=localStorage.getItem('ja-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        {/* Without JS the preloader never dismisses and every reveal stays at its
            hidden initial state, so drop the overlay and force everything visible. */}
        <noscript>
          <style>{`.preloader,.cursor-dot,.cursor-ring{display:none!important}
main [style],.split-word,.hero-title .line>span{opacity:1!important;transform:none!important}
body{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
