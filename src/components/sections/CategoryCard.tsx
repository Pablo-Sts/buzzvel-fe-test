import type { Category } from "@/types/content";
import { ArrowRightIcon, Heading, VisuallyHidden } from "@/components/ui";

interface CategoryCardProps {
  category: Category;
  index: number;
}

/** Whole card is a single link; the visible "Explore" label is part of its accessible name. */
export function CategoryCard({ category, index }: CategoryCardProps) {
  const number = String(index).padStart(2, "0");

  return (
    <a
      href={category.href}
      className="group flex w-full flex-col justify-between gap-5 rounded-2xl border border-line bg-surface px-6 pt-6 pb-[21px] transition-[border-color,box-shadow,transform] duration-200 hover:border-brand/40 hover:shadow-card motion-safe:hover:-translate-y-1 lg:min-h-[260px] lg:gap-6 lg:p-7"
    >
      <div>
        <span className="inline-flex rounded-md bg-brand-soft px-2 py-1 text-overline text-brand" aria-hidden="true">
          {number}
        </span>
        <Heading as="h3" size="title" className="mt-[22px]">
          {category.title}
        </Heading>
        <p className="mt-3 text-body text-ink-tertiary">{category.description}</p>
      </div>
      {/* Row is 20px tall in the desktop frame (arrow height); the 24px line box overflows evenly. */}
      <span className="flex items-center gap-2 text-body font-bold text-ink lg:h-5">
        Explore
        <VisuallyHidden> {category.title} courses</VisuallyHidden>
        <ArrowRightIcon className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
      </span>
    </a>
  );
}
