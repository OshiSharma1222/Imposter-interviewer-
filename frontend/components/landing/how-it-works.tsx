const steps = [
  {
    n: '01',
    title: 'Tell us the scenario',
    desc: "Say the company, role, and level. We'll handle the rest.",
  },
  {
    n: '02',
    title: 'We search the web live',
    desc: 'Firecrawl digs through real interview threads posted recently.',
  },
  {
    n: '03',
    title: 'Get grilled in voice',
    desc: 'A tough AI interviewer asks you one by one and adapts to your answers.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-8 md:px-16 lg:px-24">
      <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest mb-16">
        How it works
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E1E1E]">
        {steps.map(({ n, title, desc }) => (
          <div key={n} className="md:px-12 py-12 first:pl-0 last:pr-0">
            <span className="text-6xl font-serif text-[#1E1E1E] font-black block mb-6">{n}</span>
            <h3 className="text-[#F0EDE8] font-medium text-lg mb-3">{title}</h3>
            <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
