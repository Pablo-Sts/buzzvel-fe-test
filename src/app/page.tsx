import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { People } from "@/components/sections/People";
import { Testimonial } from "@/components/sections/Testimonial";
import {
  SECTION_IDS,
  categories,
  categoriesSection,
  contactChannels,
  contactSection,
  featuredCourse,
  finalCta,
  footer,
  headerActions,
  hero,
  howItWorksSection,
  peopleCollage,
  peopleSection,
  primaryNav,
  stats,
  steps,
  testimonial,
} from "@/data/content";

/** Landing page: composes the sections and injects their content. No logic here. */
export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-brand px-4 py-2 text-body font-bold text-on-dark focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header links={primaryNav} login={headerActions.login} cta={headerActions.cta} />
      <main id="main">
        <Hero {...hero} />
        <Categories id={SECTION_IDS.categories} {...categoriesSection} categories={categories} />
        <FeaturedCourse id={SECTION_IDS.featured} course={featuredCourse} />
        <HowItWorks id={SECTION_IDS.howItWorks} {...howItWorksSection} steps={steps} />
        <Testimonial testimonial={testimonial} stats={stats} />
        <People id={SECTION_IDS.people} {...peopleSection} collage={peopleCollage} />
        <Contact id={SECTION_IDS.contact} {...contactSection} channels={contactChannels} />
        <FinalCta {...finalCta} />
      </main>
      <Footer {...footer} />
    </>
  );
}
