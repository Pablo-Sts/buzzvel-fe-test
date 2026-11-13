import Image from "next/image";
import type { CollageColumn } from "@/types/content";
import { cn } from "@/lib/cn";

interface PhotoCollageProps {
  columns: CollageColumn[];
}

/** Design-pixel value scaled by --s (0.68 on mobile, 1 on desktop) so the collage keeps its proportions. */
const px = (value: number) => `calc(var(--s) * ${value}px)`;

/**
 * Staggered columns of photos over a soft circle. Sizes and offsets come from
 * the Figma frame and are scaled as one unit with the `--s` custom property.
 */
export function PhotoCollage({ columns }: PhotoCollageProps) {
  return (
    <div className="relative [--s:0.68] sm:[--s:0.85] lg:[--s:1]">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft"
        style={{ width: px(500) }}
      />
      <div className="relative flex items-center" style={{ gap: px(16) }}>
        {columns.map((column, columnIndex) => (
          <ul
            key={columnIndex}
            className={cn("flex flex-col", column.align === "end" ? "items-end" : "items-start")}
            style={{ gap: px(12.84), paddingTop: px(column.offsetTop) }}
          >
            {column.photos.map((photo) => (
              <li
                key={photo.src}
                className="relative overflow-hidden rounded-[4px] bg-brand-soft shadow-photo"
                style={{ width: px(photo.displayWidth), height: px(photo.displayHeight) }}
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
