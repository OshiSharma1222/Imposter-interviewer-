'use client';

import Link from 'next/link';

const PLATFORMS = [
  'GLASSDOOR', 'REDDIT', 'BLIND', 'QUORA', 'LEVELS.FYI',
  'HACKER NEWS', 'TEAMBLIND', 'LINKEDIN', 'INDEED', 'CAREERCUP', 'X / TWITTER',
];

const STATS = [
  { value: '10+',   label: 'Source Platforms' },
  { value: '< 5s',  label: 'Search Time'      },
  { value: '100%',  label: 'Real Questions'   },
];

const STEPS = [
  {
    n: '01',
    title: 'State your target',
    desc: 'Tell the AI your company, role, and seniority. Be specific — the more context, the harder the grilling.',
  },
  {
    n: '02',
    title: 'We search live',
    desc: 'Firecrawl pulls real interview threads from 10+ platforms in seconds. No static question banks.',
  },
  {
    n: '03',
    title: 'Get grilled in voice',
    desc: 'One question at a time. It reads your answers, probes weak spots, and pushes back. No hand-holding.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E] bg-[#080808]/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-[#DC2626]" />
          <span className="font-serif text-lg tracking-tight text-[#F0EDE8]">IMPOSTER</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:block text-[10px] font-mono text-[#333] uppercase tracking-[0.18em]">
            Real Questions · Real Pressure
          </span>
          <Link
            href="/interview"
            className="text-[11px] font-mono uppercase tracking-widest text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors px-4 py-2 inline-flex items-center gap-1.5 group"
          >
            Start
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-center relative px-8 md:px-16 lg:px-24 pt-20 overflow-hidden">

        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-[700px] h-[450px] bg-red-950/20 rounded-full blur-[130px]" />
        </div>

        {/* Vertical left accent */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 hidden lg:flex" aria-hidden="true">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#222]" />
          <span
            className="text-[9px] font-mono text-[#2A2A2A] uppercase tracking-[0.2em]"
            style={{ writingMode: 'vertical-rl' }}
          >
            Real-Time Web Search
          </span>
          <div className="w-px h-24 bg-gradient-to-t from-transparent to-[#222]" />
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px bg-[#DC2626]" />
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-[0.2em]">
              AI Interview Preparation · Voice-First
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-serif leading-none mb-8">
            <span className="block text-[clamp(3rem,9vw,7.5rem)] italic text-[#F0EDE8] font-normal">
              The interview
            </span>
            <span className="block text-[clamp(3rem,9vw,7.5rem)] text-[#DC2626] font-black">
              that breaks you.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-[#6B6B6B] text-base md:text-lg max-w-xl mb-12 leading-relaxed font-light">
            We search Glassdoor, Reddit, and Blind for questions that made real candidates
            sweat — then ask them to you, live, in voice.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mb-12 pb-12 border-b border-[#1E1E1E]">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="font-serif text-3xl text-[#F0EDE8] italic mb-1">{value}</div>
                <div className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-[0.15em]">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              href="/interview"
              className="inline-flex items-center gap-3 bg-[#DC2626] text-white text-xs font-mono uppercase tracking-widest px-8 py-4 hover:bg-[#B91C1C] transition-all duration-200 group"
            >
              Begin the Session
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
            <span className="text-[11px] font-mono text-[#2E2E2E] uppercase tracking-wider">
              No fluff. No easy questions. No mercy.
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-gradient-to-t from-[#222] to-transparent" />
          <span className="text-[9px] font-mono text-[#2A2A2A] uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-[#1E1E1E] py-3.5 overflow-hidden bg-[#0A0A0A] relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="marquee-inner text-[10px] font-mono text-[#282828] uppercase tracking-[0.22em] whitespace-nowrap select-none">
          {Array(4).fill(PLATFORMS.join('  ·  ') + '  ·  ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-6 h-px bg-[#DC2626]" />
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-[0.2em]">How it works</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E1E1E]">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="md:px-12 py-12 first:pl-0 last:pr-0 group">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[11px] font-mono text-[#DC2626]">{n}</span>
                  <div className="flex-1 h-px bg-[#1E1E1E] group-hover:bg-[#2A2A2A] transition-colors" />
                </div>
                <h3 className="text-[#F0EDE8] font-medium text-lg mb-4 group-hover:text-white transition-colors">
                  {title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="py-28 px-8 md:px-16 border-y border-[#1E1E1E] bg-[#0A0A0A] relative overflow-hidden">
        <div
          className="absolute -top-4 left-10 text-[#161616] font-serif text-[9rem] leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          "
        </div>
        <blockquote className="max-w-3xl mx-auto text-center relative z-10">
          <p className="font-serif italic text-[clamp(1.3rem,3.2vw,2.1rem)] text-[#F0EDE8] leading-snug mb-8">
            "The question that ended my Google interview was one I'd never seen in any prep guide."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-px bg-[#222]" />
            <cite className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-[0.2em] not-italic">
              Anonymous · Glassdoor Review
            </cite>
            <div className="w-10 h-px bg-[#222]" />
          </div>
        </blockquote>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-40 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-950/15 rounded-full blur-[110px]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-8 h-px bg-[#DC2626]/50" />
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-[0.2em]">
              Ready to be humbled?
            </p>
            <div className="w-8 h-px bg-[#DC2626]/50" />
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] text-[#F0EDE8] italic mb-12 leading-none">
            Are you ready?
          </h2>
          <Link
            href="/interview"
            className="inline-flex items-center gap-3 bg-[#DC2626] text-white text-xs font-mono uppercase tracking-widest px-12 py-5 hover:bg-[#B91C1C] transition-all duration-200 group mb-10"
          >
            Start Now
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
          <p className="text-[10px] font-mono text-[#2A2A2A] block uppercase tracking-widest">
            Powered by ElevenLabs Voice AI · Firecrawl Web Search
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1E1E1E] px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-[#DC2626]" />
            <span className="text-[10px] font-mono text-[#2E2E2E] uppercase tracking-widest">
              © 2025 Imposter Interviewer
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#2E2E2E] uppercase tracking-widest">
            Built for ElevenHacks
          </span>
        </div>
      </footer>
    </main>
  );
}
