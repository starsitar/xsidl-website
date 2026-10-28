import { Emblem } from "./Emblem.jsx";

const LINKS = [
  ["Software factory", "/software-factory.html"],
  ["AI in finance", "/services.html"],
  ["Grid", "/ot.html"],
];

export default function Nav({ current }) {
  return (
    <header className="relative z-20">
      <nav aria-label="Main" className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-5">
        <a href="/" className="flex items-center gap-3 text-cream no-underline">
          <Emblem size={34} />
          <span className="text-[17px] font-semibold tracking-[0.16em]">STATION ZERO</span>
        </a>
        <div className="flex items-center gap-7">
          <ul className="flex gap-7 max-md:hidden">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={current === href ? "page" : undefined}
                  className={`text-[15px] no-underline transition-colors ${
                    current === href ? "text-gold" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="border border-gold px-4 py-2 text-[14px] font-semibold tracking-[0.08em] text-cream no-underline transition-colors hover:bg-gold hover:text-navy"
          >
            Book a briefing
          </a>
        </div>
      </nav>
    </header>
  );
}
