import type { Section } from "@/data/case-studies";

// In-page jump links: one anchor per section (#problem, #discovery, ...).
// Smooth scrolling and the scroll offset live in globals.css.
export default function JumpNav({ sections }: { sections: Section[] }) {
  return (
    <nav className="jump" aria-label="On this page">
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              {s.nav}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
