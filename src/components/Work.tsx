import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

// Case studies as a visible card grid (no hover needed to see the work).
export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work-head">
        <h2 className="eyebrow">Selected specimens</h2>
      </div>
      <ul className="cards">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            className="reveal"
            suppressHydrationWarning
            style={{ "--rd": `${(i % 3) * 0.12}s` } as React.CSSProperties}
          >
            <ProjectCard p={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
