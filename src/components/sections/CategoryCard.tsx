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
      className="group flex w-full flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-200 hover:border-brand/40 hover:shadow-card motion-safe:hover:-translate-y-1 lg:min-h-[260px] lg:p-7"
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
      <span className="flex items-center gap-2 text-body font-bold text-ink">
        Explore
        <VisuallyHidden> {category.title} courses</VisuallyHidden>
        <ArrowRightIcon className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
      </span>
    </a>
  );
}
