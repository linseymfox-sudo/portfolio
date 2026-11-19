import Hero from "@/components/Hero";
import SiteFooter from "@/components/SiteFooter";
import Work from "@/components/Work";
import { profile } from "@/data/projects";

export default function Home() {
  // The second sentence of the quote is set in the accent color.
  const [first, ...others] = profile.quote.split(/(?<=\.)\s+/);
  const rest = others.join(" ");
  return (
    <main>
      <Hero />
      <Work />
      <blockquote className="quote">
        “{first} <span className="quote-em">{rest}</span>”
      </blockquote>
      <SiteFooter />
    </main>
  );
}
