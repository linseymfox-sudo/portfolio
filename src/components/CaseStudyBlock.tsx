import type { Block, ListItem } from "@/data/case-studies";
import Carousel from "./Carousel";
import LaptopScroll from "./LaptopScroll";
import ZoomImage from "./ZoomImage";

const Item = ({ item }: { item: ListItem }) =>
  typeof item === "string" ? (
    <>{item}</>
  ) : (
    <>
      <strong>{item.lead}</strong> {item.text}
    </>
  );

// Inline links: "[label](https://…)" in text becomes a link that opens in a new tab.
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)\s]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        return m ? (
          <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer">
            {m[1]}
          </a>
        ) : (
          part
        );
      })}
    </>
  );
}

// Renders one content block of a case study. Media blocks without a `src`
// show a labelled placeholder until the original images are added.
export default function CaseStudyBlock({ block }: { block: Block }) {
  switch (block.t) {
    case "statement":
      return <h3 className="cs-statement">{block.text}</h3>;
    case "h3":
      return <h4 className="cs-h3">{block.text}</h4>;
    case "p":
      return (
        <p className="cs-p">
          <Rich text={block.text} />
        </p>
      );
    case "leadp":
      return (
        <p className="cs-p">
          <strong>{block.lead}</strong> {block.text}
        </p>
      );
    case "note":
      return <p className="cs-note">{block.text}</p>;
    case "list":
      return (
        <ul className="cs-list">
          {block.items.map((it, i) => (
            <li key={i}>
              <Item item={it} />
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol className="cs-numbered">
          {block.items.map((it) => (
            <li key={it.n}>
              <span className="num">{it.n}</span>
              <div>
                <h5>{it.title}</h5>
                <p>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "stats":
      return (
        <dl className="cs-stats">
          {block.items.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      );
    case "callout":
      return (
        <aside className="cs-callout">
          <span>{block.label}</span>
          <h4>{block.title}</h4>
          <p>{block.text}</p>
        </aside>
      );
    case "media": {
      if (block.carousel && block.src) {
        return (
          <Carousel
            caption={block.caption}
            captions={block.captions}
            scroll={block.scroll}
            zoom={block.zoom}
            images={Array.from(
              { length: Math.max(block.src.length, block.count ?? 0) },
              (_, i) => ({
                src: block.src?.[i] ?? null,
                alt: block.alts?.[i] ?? `${block.caption} ${i + 1}`,
                label: block.labels?.[i],
              }),
            )}
          />
        );
      }
      const count = block.src?.length ?? block.count ?? 1;
      return (
        <figure
          className={`cs-media n${Math.min(count, 3)}${block.narrow ? " narrow" : ""}`}
        >
          <div className="grid">
            {block.src
              ? block.src.map((s, i) =>
                  block.zoom ? (
                    <ZoomImage
                      key={s}
                      src={s}
                      alt={block.alts?.[i] ?? `${block.caption} ${i + 1}`}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={s}
                      src={s}
                      alt={block.alts?.[i] ?? `${block.caption} ${i + 1}`}
                      loading="lazy"
                    />
                  ),
                )
              : Array.from({ length: count }, (_, i) => (
                  <div className="ph" key={i}>
                    <span>Image coming soon</span>
                    {block.labels?.[i] ??
                      (count > 1 ? `${i + 1} of ${count}` : null)}
                  </div>
                ))}
          </div>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    }
    case "laptop":
      return (
        <LaptopScroll src={block.src} alt={block.alt} caption={block.caption} />
      );
    case "video":
      return (
        <figure className="cs-embed">
          <div
            className="frame"
            style={{ "--r": block.ratio ?? 16 / 9 } as React.CSSProperties}
          >
            <iframe
              src={`https://player.vimeo.com/video/${block.vimeoId}?dnt=1`}
              title={block.caption}
              loading="lazy"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "figma":
      return (
        <figure className="cs-embed">
          <div className="frame figma">
            <iframe
              src={block.src}
              title={block.caption}
              loading="lazy"
              allowFullScreen
            />
          </div>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
  }
}
