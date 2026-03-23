'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E] bg-[#080808]/90 backdrop-blur-sm">
        <span className="font-serif text-xl tracking-tight text-[#F0EDE8]">IMPOSTER</span>
        <Link
          href="/interview"
          className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B] hover:text-[#F0EDE8] transition-colors"
        >
          Start Session →
        </Link>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center relative px-8 md:px-16 lg:px-24 pt-20">
        {/* vertical accent line */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 hidden md:flex">
          <div className="w-px h-32 bg-[#1E1E1E]" />
          <span className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
            Real-Time Web Search
          </span>
          <div className="w-px h-32 bg-[#1E1E1E]" />
        </div>

        <div className="max-w-5xl ml-auto mr-auto md:ml-16">
          <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest mb-8">
            Interview Preparation / AI-Powered
          </p>
          <h1 className="font-serif leading-none mb-6">
            <span className="block text-[clamp(3rem,10vw,8rem)] italic text-[#F0EDE8] font-normal">
              The interview
            </span>
            <span className="block text-[clamp(3rem,10vw,8rem)] text-[#DC2626] font-black">
              that breaks you.
            </span>
          </h1>
          <p className="text-[#6B6B6B] text-lg max-w-xl mb-12 leading-relaxed">
            We search Glassdoor, Reddit, and Blind for questions that made real candidates
            sweat — then ask them to you, live, in voice.
          </p>
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/interview"
              className="inline-block bg-[#DC2626] text-white text-xs font-mono uppercase tracking-widest px-8 py-4 hover:bg-[#B91C1C] transition-colors"
            >
              Begin the Session →
            </Link>
            <span className="text-[11px] font-mono text-[#6B6B6B] uppercase tracking-wider">
              No fluff. No easy questions. No mercy.
            </span>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 right-8 text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest">
          Scroll ↓
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-[#1E1E1E] py-4 overflow-hidden bg-[#0D0D0D]">
        <div className="marquee-inner text-[11px] font-mono text-[#2A2A2A] uppercase tracking-widest whitespace-nowrap">
          {Array(4).fill('GLASSDOOR · REDDIT · BLIND · QUORA · LEETCODE · HACKERNEWS · TEAMBLIND · LEVELS.FYI · ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-32 px-8 md:px-16 lg:px-24">
        <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest mb-16">
          How it works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E1E1E]">
          {[
            { n: '01', title: 'Tell us the scenario', desc: 'Say the company, role, and level. We\'ll handle the rest.' },
            { n: '02', title: 'We search the web live', desc: 'Firecrawl digs through real interview threads posted recently.' },
            { n: '03', title: 'Get grilled in voice', desc: 'A tough AI interviewer asks you one by one and adapts to your answers.' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="md:px-12 py-12 first:pl-0 last:pr-0">
              <span className="text-6xl font-serif text-[#1E1E1E] font-black block mb-6">{n}</span>
              <h3 className="text-[#F0EDE8] font-medium text-lg mb-3">{title}</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 px-8 md:px-16 lg:px-24 border-y border-[#1E1E1E] bg-[#0D0D0D]">
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="font-serif italic text-[clamp(1.5rem,4vw,2.5rem)] text-[#F0EDE8] leading-snug mb-6">
            "The question that ended my Google interview was one I'd never seen in any prep guide."
          </p>
          <cite className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest not-italic">
            — Anonymous · Glassdoor Review
          </cite>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="py-40 px-8 text-center">
        <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest mb-8">
          Ready to be humbled?
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,8vw,6rem)] text-[#F0EDE8] italic mb-12 leading-none">
          Are you ready?
        </h2>
        <Link
          href="/interview"
          className="inline-block bg-[#DC2626] text-white text-xs font-mono uppercase tracking-widest px-10 py-5 hover:bg-[#B91C1C] transition-colors mb-8"
        >
          Start Now →
        </Link>
        <p className="text-xs font-mono text-[#6B6B6B] block">
          Powered by ElevenLabs voice AI + Firecrawl web search
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1E1E1E] px-8 py-6 flex justify-between items-center">
        <span className="text-xs font-mono text-[#6B6B6B]">© 2025 Imposter Interviewer</span>
        <span className="text-xs font-mono text-[#6B6B6B]">Built for ElevenHacks</span>
      </footer>
    </main>
  );
}
