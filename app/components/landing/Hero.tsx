import { BowArrow } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <div className="relative h-[calc(100dvh-64px] rounded-b-[40px]">
      <div className="pt-14 relative flex flex-col items-center h-[calc(100vh-64px)] p-4 text-center transition-transform ease-in-out duration-1000">
        <div className="bg-radial-custom w-full max-w-200 rounded-full min-h-56 absolute left-1/2 -translate-x-1/2 top-12 -z-1" />
        <h1 className="mt-8 text-5xl md:text-8xl max-w-3xl font-medium leading-tight tracking-tight">
          <span className="font-custom-cursive">Together</span>, We Ship What
          Matters.
        </h1>
        <p className="mt-10 text-muted-foreground max-w-lg">
          Cut the clutter, get custom software designed to be fast, flexible,
          and made to fit your business perfectly.
        </p>
        <div className="flex flex-wrap-reverse items-center mt-12 gap-4 w-full max-w-xl font-custom-mono">
          <div className="h-[1px] w-full flex-1 bg-muted" />
          <button className="group px-6 py-3 flex items-center gap-1 text-primary border border-primary text-base font-medium hover:shadow-md transition hover:scale-110">
            Why HoneyJar?
          </button>
          <Link
            to="/contact"
            className="group px-6 py-3 flex items-center gap-1 text-primary-foreground bg-primary text-base font-medium hover:shadow-md transition hover:scale-110"
          >
            Let’s Build&nbsp;
            <BowArrow className="text-primary-foreground/60 group-hover:text-primary-foreground stroke-[1.5] transition" />
          </Link>
          <div className="h-[1px] w-full flex-1 bg-muted" />
        </div>
      </div>

      <div className="absolute inset-0 top-0 pointer-events-none z-[-2] h-96">
        <HexGrid rows={5} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>
    </div>
  );
}

function HexGrid({ rows = 2 }) {
  const hexWidth = 90;
  const hexHeight = 90; // approx height of your hex
  const vertSpacing = hexHeight * 0.75; // vertical spacing between rows (3/4 height)

  const cols = 44;

  // Path for one hexagon (adjust if you want)
  const hexPath = `
      M45,0
      L90,22.5
      L90,67.5
      L45,90
      L0,67.5
      L0,22.5
      Z
    `;

  return (
    <svg
      width="100%"
      height={rows * vertSpacing}
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(rows)].map((_, row) => {
        const y = row * vertSpacing;
        const isEvenRow = row % 2 === 1;
        return (
          <g
            key={row}
            transform={`translate(${isEvenRow ? hexWidth / 2 : 0}, ${y})`}
          >
            {[...Array(cols)].map((_, col) => {
              const x = col * hexWidth;
              return (
                <path
                  key={col}
                  d={hexPath}
                  fill="none"
                  stroke="#8b8b8b60"
                  strokeWidth="1"
                  transform={`translate(${x}, 0)`}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
