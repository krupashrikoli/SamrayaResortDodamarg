import Image from "next/image";
import Link from "next/link";
import {
  CELESTRA_LOGO,
  FOOTER_SOCIAL,
  GHD_CORPORATE_SITE,
  GHD_LOGO,
  NIVAARA_LOGO,
  SAMRAYA_HOTEL_LOGO,
} from "@/lib/constants";

type IconProps = {
  className?: string;
};

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 8.5H16V5.5H13.5C11.01 5.5 9 7.51 9 10v2.5H7v3h2V21h3v-5.5h2.6L15 13h-3v-2.5c0-.83.67-1.5 1.5-1.5z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.94 5a2 2 0 1 1 .02 4 2 2 0 0 1-.02-4ZM5 8.75h3.88V20H5V8.75Zm6.13 0H15v1.53h.05c.55-.98 1.9-2.02 3.91-2.02 4.18 0 4.95 2.75 4.95 6.33V20H20v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94V20h-3.89V8.75Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.28 6 12 6 12 6s-6.28 0-7.86.061A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2.14 12a28.6 28.6 0 0 0 .06 3.999 2.75 2.75 0 0 0 1.94 1.94C5.72 18 12 18 12 18s6.28 0 7.86-.061a2.75 2.75 0 0 0 1.94-1.94A28.6 28.6 0 0 0 21.86 12a28.6 28.6 0 0 0-.06-3.999ZM10 15.001V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} as const;

const brandLinkClass =
  "inline-flex h-8 max-w-[9.5rem] shrink items-center justify-center opacity-65 transition-opacity duration-300 touch-manipulation hover:opacity-90 sm:h-9 sm:max-w-[11rem] md:h-10 md:max-w-[12.5rem]";

const brandImageClass = "h-full w-auto max-w-full object-contain object-center";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`site-footer relative overflow-hidden py-12 sm:py-16 md:py-20${className ? ` ${className}` : ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <Image
          src="/images/corporate/footer-mandala.webp"
          alt=""
          width={1082}
          height={1082}
          className="h-[min(100vw,28rem)] w-[min(100vw,28rem)] object-contain opacity-10 sm:h-[min(90vw,40rem)] sm:w-[min(90vw,40rem)] md:h-[48rem] md:w-[48rem]"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 768px"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-10">
        <nav className="w-full" aria-label="Legal">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5">
            <li>
              <a
                href={`${GHD_CORPORATE_SITE}/privacy`}
                className="font-body text-[8px] font-normal uppercase tracking-[0.12em] text-charcoal/85 transition-colors hover:text-charcoal sm:text-[9px]"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li aria-hidden className="select-none text-charcoal/40">
              |
            </li>
            <li>
              <a
                href={`${GHD_CORPORATE_SITE}/terms`}
                className="font-body text-[8px] font-normal uppercase tracking-[0.12em] text-charcoal/85 transition-colors hover:text-charcoal sm:text-[9px]"
                rel="noopener noreferrer"
              >
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </nav>

        <div className="relative mt-6 w-full sm:mt-8 md:mt-10">
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,247,240,0.95)_0%,rgba(250,247,240,0.72)_45%,transparent_72%)] sm:w-[min(100%,36rem)]"
            aria-hidden
          />

          <div className="relative z-10 flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8 md:gap-12 lg:gap-14">
            <a
              href={GHD_CORPORATE_SITE}
              className="w-[min(58vw,10.5rem)] shrink-0 sm:w-[min(36vw,11.5rem)] md:w-[13.5rem]"
              aria-label="GHD Hotels home"
              rel="noopener noreferrer"
            >
              <Image
                src={GHD_LOGO}
                alt="GHD Hotels"
                width={1160}
                height={420}
                className="h-auto w-full object-contain object-center drop-shadow-[0_6px_18px_rgba(84,49,25,0.22)]"
                sizes="(max-width: 640px) 58vw, (max-width: 768px) 36vw, 216px"
                priority
              />
            </a>

            <span
              className="h-px w-12 shrink-0 bg-black/15 sm:hidden"
              aria-hidden
            />
            <span
              className="hidden h-10 w-px shrink-0 bg-black/15 sm:block sm:h-12 md:h-14"
              aria-hidden
            />

            <div
              className="flex w-full max-w-[22rem] flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:w-auto sm:max-w-[28rem] sm:gap-x-5 md:max-w-none md:gap-x-6"
              aria-label="GHD Hotels brands"
            >
              <Link
                href="/"
                className={brandLinkClass}
                aria-label="Samrāya by GHD Hotels"
              >
                <Image
                  src={SAMRAYA_HOTEL_LOGO}
                  alt="Samrāya — A unit of GHD Hotels"
                  width={2171}
                  height={724}
                  className={brandImageClass}
                  sizes="(max-width: 640px) 42vw, 160px"
                />
              </Link>

              <a
                href="https://celestra.ghdhotels.in"
                className={`${brandLinkClass} h-7 sm:h-8 md:h-9`}
                aria-label="Celéstra by GHD Hotels"
                rel="noopener noreferrer"
              >
                <Image
                  src={CELESTRA_LOGO}
                  alt="Celéstra by GHD Hotels"
                  width={932}
                  height={255}
                  className={brandImageClass}
                  sizes="(max-width: 640px) 38vw, 140px"
                />
              </a>

              <a
                href="https://nivaara.ghdhotels.in"
                className={`${brandLinkClass} h-9 sm:h-11 md:h-12`}
                aria-label="Nivaãra by GHD Hotels"
                rel="noopener noreferrer"
              >
                <Image
                  src={NIVAARA_LOGO}
                  alt="Nivaãra by GHD Hotels"
                  width={736}
                  height={510}
                  className={brandImageClass}
                  sizes="(max-width: 640px) 28vw, 72px"
                />
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-6">
          {FOOTER_SOCIAL.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];

            return (
              <li key={social.icon}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center text-charcoal transition-[color,opacity] duration-300 hover:text-[#543119] sm:size-10"
                >
                  <Icon className="size-4 sm:size-[18px]" />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 w-full border-t border-charcoal/15 pt-5 sm:mt-10 sm:pt-7">
          <p className="font-body text-[8px] font-normal tracking-[0.03em] text-charcoal/75 sm:text-[9px]">
            © 2026 GHD Hotels. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
