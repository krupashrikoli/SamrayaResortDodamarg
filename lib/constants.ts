export const GHD_CORPORATE_SITE = "https://www.ghdhotels.in";

export const NIVAARA_LOGO = "/logos/nivaara-by-ghd-hotels-logo.webp";
export const CELESTRA_LOGO = "/logos/celestra-by-ghd-hotels-logo.webp";
/** Compact brand mark (footer / brand row). */
export const SAMRAYA_LOGO = "/logos/samraya-by-ghd-hotels-logo.webp";
/** Primary Samrāya lockup for the title menu bar. */
export const SAMRAYA_HOTEL_LOGO = "/logos/samraya-hotel-logo.png";
/** Centered hero wordmark (no emblem). */
export const SAMRAYA_WORDMARK = "/logos/samraya-wordmark.png";
/** Centered hero — Opening Soon lockup. */
export const SAMRAYA_OPENING_SOON = "/logos/samraya-opening-soon.png";
export const GHD_LOGO = "/logos/ghd-hotels-main-logo.webp";

export const SAMRAYA_HERO_IMAGE = "/images/samraya/hero-infinity-pool.png";
export const SAMRAYA_HERO_IMAGE_ALT =
  "Infinity pool at sunset overlooking misty mountain valleys at Samrāya";

/** Samrāya contact — shared GHD channels until property-specific details are set. */
export const SAMRAYA_CONTACT = {
  property: "Samrāya",
  tagline: "Lifestyle and Wellness Resort",
  location: "Dodamarg, Maharashtra, India",
  reservation: {
    label: "Reservations",
    phone: "+91 838 000 8687",
    phoneHref: "tel:+918380008687",
    email: "reservation@ghdhotels.in",
    emailHref: "mailto:reservation@ghdhotels.in",
  },
  info: {
    label: "General enquiries",
    email: "info@ghdhotels.in",
    emailHref: "mailto:info@ghdhotels.in",
  },
  office: {
    label: "Head office",
    lines: [
      "GHD Hotels LLP",
      "325, Gera Imperium Star",
      "Patto, Panjim",
      "Goa – 403001, India",
    ],
  },
} as const;

/** Copied from ghd-hotels-new — used by Header property-mode nav. */
export const NAV_ITEMS = [
  { label: "HOME", href: "/nivaara" },
  { label: "ROOMS", href: "/nivaara/rooms" },
  { label: "CITY ATTRACTIONS", href: "/nivaara/city-attractions" },
  { label: "GALLERY", href: "/nivaara/gallery" },
  { label: "FAQs", href: "/nivaara/faqs" },
  { label: "CONTACT", href: "/#contact" },
] as const;

/** Copied from ghd-hotels-new — used by Header property-mode contact strip. */
export const SITE = {
  name: "GHD Hotels",
  tagline: "Luxury Hospitality in Goa, Thoughtfully Crafted",
  property: "Nivaãra — Nerul, North Goa",
  propertyDisplay: "Nivaãra - Nerul, North Goa",
  phone: "+91 838 002 0407",
  phoneHref: "tel:+918380020407",
  phoneSecondary: "+91 839 002 0408",
  phoneSecondaryHref: "tel:+918390020408",
  email: "info@ghdhotels.in",
  emailHref: "mailto:info@ghdhotels.in",
} as const;

export const FOOTER_NAV = [
  { label: "Who We Are", href: `${GHD_CORPORATE_SITE}/about` },
  { label: "Our Brands", href: `${GHD_CORPORATE_SITE}/brands` },
  { label: "Our Culture", href: `${GHD_CORPORATE_SITE}/culture` },
  { label: "Careers", href: `${GHD_CORPORATE_SITE}/careers` },
  { label: "Contact Us", href: `${GHD_CORPORATE_SITE}/contact` },
] as const;

export const FOOTER_SOCIAL = [
  {
    label: "Instagram",
    icon: "instagram" as const,
    href: "https://www.instagram.com/ghdhotels/",
  },
  {
    label: "Facebook",
    icon: "facebook" as const,
    href: "https://www.facebook.com/profile.php?id=61590444132512",
  },
  {
    label: "X",
    icon: "x" as const,
    href: "https://x.com/ghdhotels",
  },
  {
    label: "LinkedIn",
    icon: "linkedin" as const,
    href: "https://www.linkedin.com/company/ghd-hotels/",
  },
  {
    label: "YouTube",
    icon: "youtube" as const,
    href: "https://www.youtube.com/@ghdhotels",
  },
] as const;
