import {
  MIMOSA,
  MIMOSA_VIEWBOX,
  POPPY,
  POPPY_VIEWBOX,
  type Shape,
} from "@/data/botanicals";

const PLANTS: Record<"poppy" | "mimosa", { shapes: Shape[]; viewBox: string }> = {
  poppy: { shapes: POPPY, viewBox: POPPY_VIEWBOX },
  mimosa: { shapes: MIMOSA, viewBox: MIMOSA_VIEWBOX },
};

// Botanical line drawing that draws itself in.
// - Shapes marked `fill` are painted with the page background so nearer
//   petals/leaves hide the lines behind them.
// - Shapes marked c: "a" use the bloom color (poppy: blossom, mimosa: blush).
// - `caption` adds an optional botanical-plate label under the plant.
export default function Botanical({
  plant,
  className,
  caption,
}: {
  plant: "poppy" | "mimosa";
  className?: string;
  caption?: string;
}) {
  const { shapes, viewBox } = PLANTS[plant];
  const [x, , w] = viewBox.split(" ").map(Number);
  return (
    <svg
      className={["botanical", plant, className].filter(Boolean).join(" ")}
      viewBox={viewBox}
      fill="none"
      role={caption ? "img" : undefined}
      aria-label={caption}
      aria-hidden={caption ? undefined : true}
    >
      {shapes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          strokeWidth={s.w}
          className={[s.fill ? "f" : "", s.c ?? ""].filter(Boolean).join(" ") || undefined}
          style={{ "--d": `${s.delay}s` } as React.CSSProperties}
        />
      ))}
      {caption && (
        <text className="cap" x={x + w / 2} y="486" textAnchor="middle">
          {caption}
        </text>
      )}
    </svg>
  );
}
