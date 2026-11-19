import { caseStudies } from "./case-studies";

export type Project = {
  slug: string;
  plate: string; // "Pl. I"
  title: string;
  company: string;
  href: string;
  image: string; // default: the company logo
  hoverImage?: string; // shown on hover / first tap: the design on a device
};

// Card thumbnails live in /public/work (served from /work/...).
const IMAGES: Record<string, { image: string; hoverImage?: string }> = {
  "enterprise-sms": {
    image: "/work/intuit-mailchimp-logo.jpg",
    hoverImage: "/work/intuit-mailchimp-design.jpg",
  },
  "developers-hub": {
    image: "/work/snowflake-developers-logo.jpg",
    hoverImage: "/work/snowflake-developers-design.jpg",
  },
  "self-service-renewal": {
    image: "/work/docusign-self-service-renewal-logo.jpg",
    hoverImage: "/work/docusign-self-service-renewal-design.jpg",
  },
  "pricing-calculator": {
    image: "/work/snowflake-pricing-calculator-logo.jpg",
    hoverImage: "/work/snowflake-pricing-calculator-design.jpg",
  },
  "contact-sales": {
    image: "/work/docusign-contact-sales-logo.jpg",
    hoverImage: "/work/docusign-contact-sales-design.jpg",
  },
};

// Cards follow the case study order (Pl. I to Pl. V).
export const projects: Project[] = caseStudies.map((c) => ({
  slug: c.slug,
  plate: c.plate,
  title: c.title,
  company: c.company,
  href: `/p/${c.slug}`,
  ...IMAGES[c.slug],
}));

export const profile = {
  name: "Linsey Fox",
  role: "Senior Product Designer — Content & AI-assisted design",
  tagline: "Words are the roots. Interfaces are the bloom.",
  intro:
    "Over 12 years spanning web content UX, experimentation, and product design — most recently leading AI-enabled research, self-service monetization, and conversion optimization for Intuit, Snowflake, and Docusign. I make digital experiences clearer, faster, and more human.",
  tags: ["Content design", "AI-assisted UX", "Experimentation", "Monetization"],
  quote:
    "I believe content is the most important part of any digital experience. The words that drive the emotion and action are the most critical piece of good design.",
  linkedin: "https://www.linkedin.com/in/linseyfox/",
  about: {
    photoCaption: "Embracing my plant nerdiness in the jungle",
    heading: "Web content strategist turned product designer",
    paragraphs: [
      "I bring a background in web content strategy to product design, specializing in streamlining content, reimagining information architecture, data-driven experimentation, and usability research.",
      "Currently a senior product designer for growth at Intuit, I lead visual and content design for rapid experimentation on the Mailchimp marketing website. Previously, I was Snowflake’s first UX designer for their marketing site, and before that, the first designer on Docusign’s newly formed PLG design team — where I built and launched their first web experimentation program, driving measurable gains in engagement across web, product, and e-commerce experiences.",
      "I started my career in web content management before training formally in UX design (UC Berkeley, Designlab, General Assembly). I bring humor, humility, and curiosity to my work — and outside of it, you’ll find me with my plants, my cat and dog, on my yoga mat, lifting weights, or traveling.",
    ],
  },
};
