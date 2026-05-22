const items = [
  "Frontend Development",
  "UI / UX Design",
  "Responsive Webdesign",
  "Performance",
  "Clean Code",
  "Animationen",
  "Premium Webdesign",
];

export default function Marquee() {
  const renderItems = (key) =>
    items.map((item, i) => (
      <span
        key={`${key}-${i}`}
        className="flex items-center gap-10 px-6 whitespace-nowrap"
      >
        <span className="font-display text-3xl md:text-5xl tracking-tight">
          {item}
        </span>
        <span className="w-2 h-2 rounded-full bg-[#E6C229]" />
      </span>
    ));

  return (
    <section
      className="relative border-y border-white/5 bg-[#080808] py-8 overflow-hidden"
      data-testid="marquee-section"
    >
      <div className="flex animate-marquee">
        <div className="flex shrink-0">{renderItems("a")}</div>
        <div className="flex shrink-0">{renderItems("b")}</div>
      </div>
    </section>
  );
}
