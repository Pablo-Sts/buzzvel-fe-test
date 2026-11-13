import type { Category } from "@/types/content";
import { Container, Section, SectionHeader } from "@/components/ui";
import { CategoryCard } from "./CategoryCard";

interface CategoriesProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  categories: Category[];
}

export function Categories({ id, eyebrow, title, description, categories }: CategoriesProps) {
  return (
    <Section id={id} aria-labelledby="categories-title">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="categories-title"
          description={description}
          className="max-w-[560px]"
        />
        <ul className="mt-12 grid gap-4 lg:mt-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, index) => (
            <li key={category.id} className="flex">
              <CategoryCard category={category} index={index + 1} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
