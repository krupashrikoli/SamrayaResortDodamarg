import { SAMRAYA_CONTACT } from "@/lib/constants";
import { GuestInterestForm } from "@/components/GuestInterestForm";

export function ContactSection() {
  const { reservation, info, office, location } = SAMRAYA_CONTACT;

  return (
    <section id="contact" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-heading text-[2rem] leading-[1.15] text-charcoal sm:text-[2.5rem]">
            Get in touch
          </h2>
          <p className="mt-4 font-body text-base font-light leading-relaxed text-[#6b7280]">
            Reach the Samrāya team for reservations and enquiries, or register
            your interest below.
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-[#E5E5E5] pt-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="font-heading text-xl leading-snug text-charcoal sm:text-2xl">
              {reservation.label}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={reservation.phoneHref}
                  className="font-body text-base text-charcoal transition-colors hover:text-black"
                >
                  {reservation.phone}
                </a>
              </li>
              <li>
                <a
                  href={reservation.emailHref}
                  className="font-body text-base text-charcoal transition-colors hover:text-black"
                >
                  {reservation.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl leading-snug text-charcoal sm:text-2xl">
              {info.label}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={info.emailHref}
                  className="font-body text-base text-charcoal transition-colors hover:text-black"
                >
                  {info.email}
                </a>
              </li>
              <li className="font-body text-base text-charcoal">{location}</li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-xl leading-snug text-charcoal sm:text-2xl">
              {office.label}
            </h3>
            <address className="mt-4 space-y-1 font-body text-base not-italic leading-relaxed text-charcoal">
              {office.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-14 sm:mt-16 lg:mt-20">
          <GuestInterestForm />
        </div>
      </div>
    </section>
  );
}
