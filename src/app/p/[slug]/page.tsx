import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Botanical from "@/components/Botanical";
import CaseStudyBlock from "@/components/CaseStudyBlock";
import JumpNav from "@/components/JumpNav";
import ProjectCard from "@/components/ProjectCard";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { projects } from "@/data/projects";

// Unknown slugs fall through to notFound() below.
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.title} — Linsey Fox`;
  const image = `/og/${cs.slug}.jpg`;
  return {
    title,
    description: cs.dek,
    alternates: { canonical: `/p/${cs.slug}` },
    openGraph: {
      type: "article",
      siteName: "Linsey Fox",
      url: `/p/${cs.slug}`,
      title,
      description: cs.dek,
      images: [{ url: image, width: 1200, height: 630, alt: cs.heroCaption }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cs.dek,
      images: [image],
    },
  };
}

// The route params are read inside a Suspense boundary, as this version of
// Next.js expects. All slugs are known up front (generateStaticParams).
export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  // "Read more": the next three case studies, wrapping around
  const i = caseStudies.findIndex((c) => c.slug === cs.slug);
  const more = [1, 2, 3].map((k) => projects[(i + k) % projects.length]);

  return (
    <main className="cs">
      <div className="cs-top">
        <div className="page-top">
          <SiteNav />
        </div>

        <header className="cs-head">
          <Link href="/#work" className="cs-back">
            ← All specimens
          </Link>
          <p className="cs-kicker">
            {cs.plate} · {cs.kicker}
          </p>
          <h1>{cs.title}</h1>
          <p className="cs-dek">{cs.dek}</p>
          <dl className="cs-meta">
            {cs.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* decorative mimosa line drawing, drawn in on load */}
        <Botanical plant="mimosa" className="sprig" />
      </div>

      <figure className="cs-hero">
        {cs.hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cs.hero} alt={cs.heroCaption} />
        ) : (
          <div className="ph">
            <span>Hero image coming soon</span>
            {cs.heroCaption}
          </div>
        )}
      </figure>

      <JumpNav sections={cs.sections} />

      {cs.sections.map((s, n) => (
        <section key={s.id} id={s.id} className="cs-section">
          <p className="cs-eyebrow">
            {String(n + 1).padStart(2, "0")} — {s.heading}
          </p>
          <div className="cs-body">
            {s.blocks.map((b, k) => (
              <CaseStudyBlock key={k} block={b} />
            ))}
          </div>
        </section>
      ))}

      <section className="cs-more">
        <h2 className="eyebrow">Read more specimens</h2>
        <ul className="cards three">
          {more.map((p) => (
            <li key={p.slug}>
              <ProjectCard p={p} />
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}
