import Image from "next/image";
import type { CollageColumn } from "@/types/content";
import { cn } from "@/lib/cn";

interface PhotoCollageProps {
  columns: CollageColumn[];
}

/**
 * Design-pixel values scaled by CSS custom properties, so the whole collage
 * resizes as one unit. The mobile frame shrinks photos more vertically
 * (~0.6) than horizontally (~0.69), hence two factors.
 */
const x = (value: number) => `calc(var(--sx) * ${value}px)`;
const y = (value: number) => `calc(var(--sy) * ${value}px)`;

/**
 * Staggered columns of photos over a soft circle. Sizes and offsets come from
 * the desktop Figma frame (1x) and are scaled down for smaller screens.
 */
export function PhotoCollage({ columns }: PhotoCollageProps) {
  return (
    <div className="relative w-full [--circle:330px] [--sx:0.69] [--sy:0.6] sm:[--circle:420px] sm:[--sx:0.85] sm:[--sy:0.85] lg:[--circle:500px] lg:[--sx:1] lg:[--sy:1]">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 aspect-square w-(--circle) -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft"
      />
      {/* Circle is centred on the column; photos start at the column's left edge on desktop. */}
      <div className="relative flex items-center justify-center lg:justify-start" style={{ columnGap: x(16) }}>
        {columns.map((column, columnIndex) => (
          <ul
            key={columnIndex}
            className={cn("flex flex-col", column.align === "end" ? "items-end" : "items-start")}
            style={{ rowGap: y(12.84), paddingTop: y(column.offsetTop) }}
          >
            {column.photos.map((photo) => (
              <li
                key={photo.src}
                className="relative overflow-hidden rounded-[4px] bg-brand-soft shadow-photo"
                style={{ width: x(photo.displayWidth), height: y(photo.displayHeight) }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 140px, 100px"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
