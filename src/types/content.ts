/** Content contracts shared by the data layer and the presentational sections. */

export interface NavLink {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface Course {
  eyebrow: string;
  title: string;
  description: string;
  instructor: string;
  tags: string[];
  image: ImageAsset;
  primaryAction: NavLink;
  secondaryAction: NavLink;
}

export type StepIconVariant = "square" | "tilted" | "dot";

export interface Step {
  title: string;
  description: string;
  icon: StepIconVariant;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: ImageAsset;
}

/** One photo of the "people" collage, sized in design pixels (desktop). */
export interface CollagePhoto extends ImageAsset {
  displayWidth: number;
  displayHeight: number;
}

export interface CollageColumn {
  /** Top offset of the column in design pixels (desktop frame). */
  offsetTop: number;
  /** Top offset of the column in the mobile frame, in px (the mobile layout is not a uniform scale). */
  offsetTopMobile: number;
  align: "start" | "end";
  photos: CollagePhoto[];
}

export interface ContactChannel {
  icon: "chat" | "clock";
  label: string;
  value: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
