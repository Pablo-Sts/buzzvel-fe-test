import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

interface AvatarStackProps {
  avatars: ImageAsset[];
  /** Avatar diameter in px. */
  size?: 32 | 40;
  /** Ring colour, matches the background the stack sits on. */
  ringClassName?: string;
  className?: string;
}

/** Overlapping circular avatars. Purely decorative unless the images carry alt text. */
export function AvatarStack({ avatars, size = 32, ringClassName = "border-surface-warm", className }: AvatarStackProps) {
  return (
    <ul className={cn("flex", className)} aria-hidden={avatars.every((a) => !a.alt) || undefined}>
      {avatars.map((avatar, index) => (
        // Each avatar overlaps the previous one by 8px, as in the design.
        <li key={avatar.src} className={cn(index > 0 && "-ml-2")}>
          <Image
            src={avatar.src}
            alt={avatar.alt}
            width={size}
            height={size}
            className={cn("rounded-full border-2 bg-brand-soft object-cover", ringClassName)}
            style={{ width: size, height: size }}
          />
        </li>
      ))}
    </ul>
  );
}
