/**
 * Mock content for the landing page. Swapping this module for a CMS/API call
 * does not affect the presentational components, which only receive props.
 */
import type {
  Category,
  CollageColumn,
  ContactChannel,
  Course,
  FooterColumn,
  ImageAsset,
  NavLink,
  Stat,
  Step,
  Testimonial,
} from "@/types/content";

export const SECTION_IDS = {
  categories: "courses",
  featured: "featured-course",
  howItWorks: "how-it-works",
  people: "community",
  contact: "contact",
} as const;

const anchor = (id: string) => `#${id}`;

export const primaryNav: NavLink[] = [
  { label: "Courses", href: anchor(SECTION_IDS.categories) },
  { label: "For Teams", href: anchor(SECTION_IDS.contact) },
  { label: "Community", href: anchor(SECTION_IDS.people) },
  { label: "About", href: anchor(SECTION_IDS.howItWorks) },
];

export const headerActions = {
  login: { label: "Log in", href: anchor(SECTION_IDS.contact) },
  cta: { label: "Start learning", href: anchor(SECTION_IDS.categories) },
} satisfies Record<string, NavLink>;

const learnerAvatars: ImageAsset[] = [
  { src: "/images/avatar-1.jpg", alt: "", width: 80, height: 80 },
  { src: "/images/avatar-2.jpg", alt: "", width: 80, height: 80 },
  { src: "/images/avatar-3.jpg", alt: "", width: 80, height: 80 },
  { src: "/images/avatar-4.jpg", alt: "", width: 80, height: 80 },
];

export const hero = {
  eyebrow: "Learn at your own pace",
  title: "Build skills that actually move you forward.",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
  primaryAction: { label: "Explore courses", href: anchor(SECTION_IDS.categories) },
  secondaryAction: { label: "See how it works", href: anchor(SECTION_IDS.howItWorks) },
  socialProof: { highlight: "Trusted by 24,000+", text: "learners", avatars: learnerAvatars.slice(0, 3) },
  image: {
    src: "/images/hero-learner.jpg",
    alt: "Smiling learner with glasses taking notes in front of a laptop",
    width: 900,
    height: 1100,
  },
  badges: {
    courses: { value: "120+", label: "expert-led courses" },
    rating: { value: 4.9, label: "4.9 avg rating" },
  },
};

export const categoriesSection = {
  eyebrow: "Find your next skill",
  title: "Learn something worth knowing.",
  description: "Short, practical courses designed around skills you can put to work immediately.",
};

export const categories: Category[] = [
  {
    id: "product-design",
    title: "Product Design",
    description: "Turn complex problems into clear, useful experiences.",
    href: anchor(SECTION_IDS.featured),
  },
  {
    id: "technology",
    title: "Technology",
    description: "Build a stronger understanding of the tools shaping digital products.",
    href: anchor(SECTION_IDS.featured),
  },
  {
    id: "business",
    title: "Business",
    description: "Develop practical skills for better decisions and stronger teams.",
    href: anchor(SECTION_IDS.featured),
  },
  {
    id: "creative",
    title: "Creative",
    description: "Explore new ways to communicate, create and tell stories.",
    href: anchor(SECTION_IDS.featured),
  },
];

export const featuredCourse: Course = {
  eyebrow: "Most popular this month",
  title: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: "with Maya Chen · Senior Product Designer",
  tags: ["8 lessons", "2h 40min", "Intermediate"],
  image: {
    src: "/images/featured-course.jpg",
    alt: "Product design student arranging material samples and prototypes on a worktable",
    width: 700,
    height: 500,
  },
  primaryAction: { label: "View course", href: anchor(SECTION_IDS.contact) },
  secondaryAction: { label: "Browse all courses", href: anchor(SECTION_IDS.categories) },
};

export const howItWorksSection = {
  eyebrow: "How Luma works",
  title: "Less browsing. More learning.",
};

export const steps: Step[] = [
  {
    title: "Choose your focus",
    description: "Find courses based on the skill you want to build, not endless content categories.",
    icon: "square",
  },
  {
    title: "Learn from experience",
    description: "Follow concise lessons created by professionals who use these skills.",
    icon: "tilted",
  },
  {
    title: "Put it into practice",
    description: "Every course includes practical exercises designed to turn knowledge into action.",
    icon: "dot",
  },
];

export const testimonial: Testimonial = {
  quote:
    "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
  author: "Alex Morgan",
  role: "Product Manager",
  avatar: { src: "/images/alex-morgan.jpg", alt: "Portrait of Alex Morgan", width: 200, height: 200 },
};

export const stats: Stat[] = [
  { value: "24K+", label: "active learners" },
  { value: "120+", label: "expert-led courses" },
  { value: "92%", label: "complete their first course" },
];

export const peopleSection = {
  eyebrow: "The people",
  title: "Meet international students & teachers",
  description:
    "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
  action: { label: "Explore teachers and students", href: anchor(SECTION_IDS.contact) },
};

const photo = (
  file: string,
  alt: string,
  size: [number, number],
  display: [number, number],
) => ({
  src: `/images/${file}`,
  alt,
  width: size[0],
  height: size[1],
  displayWidth: display[0],
  displayHeight: display[1],
});

/** Collage layout copied from the Figma frame (column offsets and photo sizes in px). */
export const peopleCollage: CollageColumn[] = [
  {
    offsetTop: 64.2,
    align: "end",
    photos: [
      photo("people-01.jpg", "Girl raising her hand during an online class", [1880, 1255], [102.72, 154.08]),
      photo("people-02.jpg", "Students working together around a laptop", [1880, 1253], [138.03, 207.05]),
    ],
  },
  {
    offsetTop: 25.68,
    align: "start",
    photos: [
      photo("people-03.jpg", "Student in a hoodie reading a book in a library", [1880, 1253], [102.72, 170.13]),
      photo("people-04.jpg", "Two students rehearsing with a microphone by a window", [868, 1300], [102.72, 172.54]),
      photo("people-05.jpg", "Student reading notes next to a tablet", [975, 1300], [102.72, 128.4]),
    ],
  },
  {
    offsetTop: 0,
    align: "start",
    photos: [
      photo("people-06.jpg", "Graduate in cap and gown holding a diploma", [859, 1300], [102.72, 137.23]),
      photo("people-07.jpg", "Student working on a laptop at a home desk", [1880, 1253], [102.72, 138.03]),
      photo("people-08.jpg", "Learner joining a video lesson with a teacher", [1880, 1255], [102.72, 154.08]),
    ],
  },
  {
    offsetTop: 0,
    align: "start",
    photos: [
      photo("people-09.jpg", "Student with curly hair holding notebooks in front of a university", [1880, 1253], [128.4, 204.64]),
      photo("people-10.jpg", "Student in a headscarf holding a coffee and books", [1043, 1300], [102.72, 132.42]),
    ],
  },
];

export const contactSection = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
  formTitle: "Contact us",
  formDescription: "Fill out the fields and we will get in touch.",
};

export const contactChannels: ContactChannel[] = [
  { icon: "chat", label: "Email", value: "contact@luma.com", href: "mailto:contact@luma.com" },
  { icon: "clock", label: "Response Time", value: "Up to 24 hours on business days" },
];

export const finalCta = {
  title: "What will you learn next?",
  description: "Start with one course. Build from there.",
  avatars: learnerAvatars,
  primaryAction: { label: "Explore all courses", href: anchor(SECTION_IDS.categories) },
  secondaryAction: { label: "Join Luma", href: anchor(SECTION_IDS.contact) },
};

export const footer = {
  tagline: "Practical learning for curious people.",
  copyright: "© 2026 Luma Learning",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Courses", href: anchor(SECTION_IDS.categories) },
        { label: "Categories", href: anchor(SECTION_IDS.categories) },
        { label: "Instructors", href: anchor(SECTION_IDS.people) },
        { label: "For Teams", href: anchor(SECTION_IDS.contact) },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: anchor(SECTION_IDS.howItWorks) },
        { label: "Careers", href: anchor(SECTION_IDS.contact) },
        { label: "Journal", href: anchor(SECTION_IDS.featured) },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: anchor(SECTION_IDS.contact) },
        { label: "Contact", href: anchor(SECTION_IDS.contact) },
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
      ],
    },
  ] satisfies FooterColumn[],
};
