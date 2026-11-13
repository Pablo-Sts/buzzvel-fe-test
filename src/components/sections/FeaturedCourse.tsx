import Image from "next/image";
import type { Course } from "@/types/content";
import { ArrowRightIcon, Button, Chip, Container, Heading, Overline, Section, Text } from "@/components/ui";

interface FeaturedCourseProps {
  id: string;
  course: Course;
}

export function FeaturedCourse({ id, course }: FeaturedCourseProps) {
  return (
    <Section id={id} tone="brand" aria-labelledby="featured-title">
      {/* The desktop frame uses a 1136px content box here (16px wider than the grid). */}
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[60px] xl:pr-16">
        <div className="relative lg:flex-1">
          <div className="relative aspect-[362/280] overflow-hidden rounded-2xl bg-brand-soft md:aspect-[538/408]">
            <Image
              src={course.image.src}
              alt={course.image.alt}
              fill
              sizes="(min-width: 1024px) 538px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <p className="absolute top-[-12px] left-[-12px] rounded-md bg-highlight px-3 py-1.5 text-overline text-ink">
            Featured course
          </p>
        </div>

        <div className="flex flex-col lg:flex-1">
          <Overline tone="inverse">{course.eyebrow}</Overline>
          <Heading id="featured-title" className="mt-4">
            {course.title}
          </Heading>
          <Text size="body-lg" className="mt-5">
            {course.description}
          </Text>
          <Text size="body-lg" className="mt-6">
            {course.instructor}
          </Text>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Course details">
            {course.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={course.primaryAction.href} variant="highlight" className="w-full sm:w-auto">
              {course.primaryAction.label}
            </Button>
            <Button
              href={course.secondaryAction.href}
              variant="ghost-light"
              className="px-4 max-sm:py-3"
              icon={<ArrowRightIcon />}
            >
              {course.secondaryAction.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
