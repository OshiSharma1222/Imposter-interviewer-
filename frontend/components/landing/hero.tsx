import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative px-8 md:px-16 lg:px-24 pt-20">
      {/* vertical accent line */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 hidden md:flex">
        <div className="w-px h-32 bg-[#1E1E1E]" />
        <span
          className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
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

      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest">
        Scroll ↓
      </div>
    </section>
  );
}
