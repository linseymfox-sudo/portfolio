import { profile } from "@/data/projects";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <span>© 2026 Linsey Fox</span>
      <span className="foot-links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href="#">Back to top ↑</a>
      </span>
    </footer>
  );
}
