import Link from 'next/link';
import Script from 'next/script';

export default function InterviewPage() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'YOUR_AGENT_ID_HERE';

  return (
    <main className="min-h-screen bg-[#080808] flex flex-col md:flex-row">
      {/* LEFT PANEL */}
      <div className="md:w-1/2 flex flex-col p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#1E1E1E]">
        <Link
          href="/"
          className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest hover:text-[#F0EDE8] transition-colors mb-12 self-start"
        >
          ← Back
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md">
          <p className="text-xs font-mono text-[#DC2626] uppercase tracking-widest mb-4">
            ● Session Active
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F0EDE8] italic mb-6 leading-tight">
            You're in the hot seat.
          </h1>
          <p className="text-[#6B6B6B] text-sm leading-relaxed mb-10">
            Tell the interviewer what you're preparing for — company, role, and level.
            It will search the web for real questions people have been asked, then
            grill you one by one.
          </p>

          <div className="space-y-3 mb-12">
            {[
              'Speak clearly — this is voice-first',
              'State company, role, and seniority level',
              'Answer fully — it will probe weak spots',
              'Ask for a debrief when you\'re done',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#DC2626] text-xs mt-0.5">▸</span>
                <span className="text-xs font-mono text-[#6B6B6B]">{tip}</span>
              </div>
            ))}
          </div>

          <div className="border border-[#1E1E1E] p-5">
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest mb-4">
              Session Info
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs font-mono text-[#6B6B6B]">Voice Engine</span>
                <span className="text-xs font-mono text-[#F0EDE8]">ElevenLabs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-mono text-[#6B6B6B]">Question Source</span>
                <span className="text-xs font-mono text-[#F0EDE8]">Live Web Search</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-mono text-[#6B6B6B]">Search Engine</span>
                <span className="text-xs font-mono text-[#F0EDE8]">Firecrawl</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-mono text-[#6B6B6B]">Status</span>
                <span className="text-xs font-mono text-[#22C55E] flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — ElevenLabs Widget */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 min-h-[60vh] md:min-h-screen">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest mb-3">
            Voice Interface
          </p>
          <h2 className="font-serif text-2xl text-[#F0EDE8] italic">
            Click the button to begin
          </h2>
        </div>

        <div className="relative">
          {/* decorative ring */}
          <div className="absolute inset-0 -m-8 rounded-full border border-[#1E1E1E] opacity-30" />
          <div className="absolute inset-0 -m-16 rounded-full border border-[#1E1E1E] opacity-15" />
          <elevenlabs-convai agent-id={agentId} />
        </div>

        <p className="mt-16 text-[11px] font-mono text-[#6B6B6B] text-center max-w-xs">
          Questions are sourced in real-time from Glassdoor, Reddit, Blind, and Quora.
          Every session is unique.
        </p>
      </div>

      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="lazyOnload" />
    </main>
  );
}
