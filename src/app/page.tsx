import Hero from "@/components/Hero";
import SiteFooter from "@/components/SiteFooter";
import Work from "@/components/Work";
import { profile } from "@/data/projects";

// Only this phrase of the quote is set in the accent color.
const QUOTE_EM = "most critical piece";

export default function Home() {
  const at = profile.quote.indexOf(QUOTE_EM);
  const before = profile.quote.slice(0, at);
  const after = profile.quote.slice(at + QUOTE_EM.length);
  return (
    <main>
      <Hero />
      <Work />
      <blockquote className="quote reveal" suppressHydrationWarning>
        “{before}
        <span className="quote-em">{QUOTE_EM}</span>
        {after}”
      </blockquote>
      <SiteFooter />
    </main>
  );
}
