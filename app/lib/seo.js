import { person, projects, services, siteUrl, skillGroups } from "./data";

/*
 * JSON-LD graph. One @graph keeps every node cross-referenced by @id, which is
 * what search engines use to tie the person, the site and the work together.
 */
export function buildJsonLd() {
  const personId = `${siteUrl}/#person`;
  const siteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        givenName: "John",
        familyName: "Abbas",
        jobTitle: person.jobTitle,
        description:
          "Full Stack Software Engineer and Technical Consultant specialising in FinTech platforms, secure enterprise web applications, dashboards and data-driven systems.",
        email: `mailto:${person.email}`,
        url: siteUrl,
        image: `${siteUrl}/john.png`,
        sameAs: [person.github, person.linkedin],
        knowsAbout: person.knowsAbout,
        worksFor: {
          "@type": "Organization",
          name: person.company,
          address: { "@type": "PostalAddress", addressCountry: person.country },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: person.locality,
          addressCountry: person.country,
        },
        knowsLanguage: ["English", "Urdu"],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: siteUrl,
        name: `${person.name} — ${person.role}`,
        description:
          "Portfolio of John Abbas, a Full Stack Engineer and Technical Consultant building FinTech platforms and secure enterprise applications.",
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: `${person.name} — ${person.role}`,
        isPartOf: { "@id": siteId },
        about: { "@id": personId },
        primaryImageOfPage: `${siteUrl}/john.png`,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: `${person.name} — Software Engineering & FinTech Consulting`,
        description:
          "Enterprise web applications, FinTech and secure banking workflows, plus data and API integration work, delivered remotely from Pakistan.",
        url: siteUrl,
        image: `${siteUrl}/john.png`,
        provider: { "@id": personId },
        areaServed: ["Worldwide", "Pakistan"],
        availableLanguage: ["English", "Urdu"],
        address: {
          "@type": "PostalAddress",
          addressLocality: person.locality,
          addressCountry: person.country,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.body,
            },
          })),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#work`,
        name: "Selected work",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${siteUrl}/#project-${project.id}`,
            name: project.name,
            headline: `${project.name} — ${project.type}`,
            description: project.summary,
            image: `${siteUrl}${project.image}`,
            dateCreated: project.year,
            keywords: project.tags.join(", "),
            creator: { "@id": personId },
            inLanguage: "en",
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#skills`,
        name: "Technical skills",
        itemListElement: skillGroups
          .flatMap((group) => group.items)
          .map((skill, index) => ({ "@type": "ListItem", position: index + 1, name: skill })),
      },
    ],
  };
}
