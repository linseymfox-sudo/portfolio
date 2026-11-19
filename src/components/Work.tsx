import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

// Case studies as a visible card grid (no hover needed to see the work).
export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work-head">
        <h2 className="eyebrow">Selected specimens</h2>
        <span className="eyebrow">Case studies · 2014 — 2026</span>
      </div>
      <ul className="cards">
        {projects.map((p) => (
          <li key={p.slug}>
            <ProjectCard p={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
