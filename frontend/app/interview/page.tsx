'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

const AGENT_ID = 'agent_2601kmmr9sahe9vvrya2jngw2j32';

const TIPS = [
  'Speak clearly — this is voice-first',
  'State company, role, and seniority level',
  'Answer fully — it will probe weak spots',
  'Ask for a debrief when you\'re done',
];

const BARS: { h: number; d: number }[] = [
  { h: 0.40, d: 0.55 }, { h: 0.75, d: 0.62 }, { h: 0.50, d: 0.48 },
  { h: 1.00, d: 0.70 }, { h: 0.65, d: 0.58 }, { h: 0.85, d: 0.65 },
  { h: 0.45, d: 0.52 }, { h: 0.80, d: 0.68 }, { h: 0.55, d: 0.45 },
  { h: 0.70, d: 0.60 }, { h: 0.40, d: 0.72 }, { h: 0.90, d: 0.50 },
  { h: 0.60, d: 0.63 },
];

const HIDE_CSS = '*, *::before, *::after { opacity: 0 !important; pointer-events: none !important; }';

function injectHideStyle(shadowRoot: ShadowRoot) {
  if (!shadowRoot.getElementById('__hide')) {
    const s = document.createElement('style');
    s.id = '__hide';
    s.textContent = HIDE_CSS;
    shadowRoot.appendChild(s);
  }
}

const WALKTHROUGH_STEPS = [
  {
    title: 'Click the Mic',
    desc: 'Tap the microphone orb to start your voice interview session. Make sure your mic is enabled.',
    target: 'orb',
  },
  {
    title: 'State Your Target',
    desc: 'Tell the AI interviewer the company, role, and seniority level you\'re preparing for. Be specific.',
    target: 'left',
  },
  {
    title: 'Get Grilled',
    desc: 'The agent searches 10+ platforms for real questions, then asks them one by one. Answer fully — it probes weak spots.',
    target: 'left',
  },
  {
    title: 'End Anytime',
    desc: 'Click the red orb to stop. Ask for a debrief before ending to get feedback on your performance.',
    target: 'orb',
  },
];

function Walkthrough({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const current = WALKTHROUGH_STEPS[step];
  const isLast = step === WALKTHROUGH_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onDone} />

      {/* Card */}
      <div className="relative bg-[#111] border border-[#2A2A2A] max-w-sm w-full mx-6 p-8 fade-up">
        {/* Step counter */}
        <div className="flex items-center gap-2 mb-6">
          {WALKTHROUGH_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? 'bg-[#DC2626]' : 'bg-[#2A2A2A]'
              }`}
            />
          ))}
        </div>

        {/* Step number */}
        <span className="text-[10px] font-mono text-[#DC2626] uppercase tracking-[0.2em] mb-4 block">
          Step {String(step + 1).padStart(2, '0')} of {String(WALKTHROUGH_STEPS.length).padStart(2, '0')}
        </span>

        {/* Content */}
        <h3 className="font-serif text-2xl text-[#F0EDE8] italic mb-3">
          {current.title}
        </h3>
        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8">
          {current.desc}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={onDone}
            className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest hover:text-[#F0EDE8] transition-colors"
          >
            Skip
          </button>
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="text-[11px] font-mono text-[#6B6B6B] uppercase tracking-widest hover:text-[#F0EDE8] transition-colors px-4 py-2"
              >
                Back
              </button>
            )}
            <button
              onClick={() => isLast ? onDone() : setStep(step + 1)}
              className="text-[11px] font-mono uppercase tracking-widest bg-[#DC2626] text-white px-6 py-2.5 hover:bg-[#B91C1C] transition-colors inline-flex items-center gap-2 group"
            >
              {isLast ? 'Start Interview' : 'Next'}
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                {isLast ? '' : '\u2192'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterviewPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  useEffect(() => {
    // Show walkthrough only on first visit
    const seen = localStorage.getItem('walkthrough-seen');
    if (!seen) setShowWalkthrough(true);
  }, []);

  const dismissWalkthrough = useCallback(() => {
    setShowWalkthrough(false);
    localStorage.setItem('walkthrough-seen', '1');
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    document.body.appendChild(script);

    const poll = setInterval(() => {
      const widget = document.querySelector('elevenlabs-convai');
      if (!widget?.shadowRoot) return;
      injectHideStyle(widget.shadowRoot);
      clearInterval(poll);

      const observer = new MutationObserver(() => {
        if (widget.shadowRoot) injectHideStyle(widget.shadowRoot);
      });
      observer.observe(widget.shadowRoot, { childList: true });
    }, 200);

    return () => {
      clearInterval(poll);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const handleMicClick = useCallback(() => {
    const widget = document.querySelector('elevenlabs-convai');
    if (!widget?.shadowRoot) return;

    const buttons = Array.from(widget.shadowRoot.querySelectorAll('button'));

    if (isConnected) {
      const endBtn = buttons.find(b =>
        (b.textContent || '').toLowerCase().includes('end')
      );
      if (endBtn) {
        endBtn.click();
        setIsConnected(false);
      }
    } else {
      const startBtn = buttons.find(b => {
        const t = (b.textContent || '').toLowerCase();
        return t.includes('start') || t.includes('call');
      });
      if (startBtn) {
        startBtn.click();
        setIsConnected(true);

        setTimeout(() => {
          if (!widget.shadowRoot) return;
          const btns = Array.from(widget.shadowRoot.querySelectorAll('button'));
          const agreeBtn = btns.find(b =>
            (b.textContent || '').toLowerCase().includes('agree')
          );
          if (agreeBtn) agreeBtn.click();
        }, 400);
      }
    }
  }, [isConnected]);

  return (
    <main className="min-h-screen bg-[#080808] flex flex-col md:flex-row">

      {/* Walkthrough overlay */}
      {showWalkthrough && <Walkthrough onDone={dismissWalkthrough} />}

      {/* ElevenLabs widget — rendered but fully invisible */}
      <div
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="${AGENT_ID}"></elevenlabs-convai>`,
        }}
      />

      {/* ── LEFT PANEL ── */}
      <div className="md:w-1/2 flex flex-col p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#1E1E1E]">

        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-mono text-[#2E2E2E] uppercase tracking-widest hover:text-[#F0EDE8] transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform inline-block">&larr;</span>
            Back
          </Link>
          <button
            onClick={() => setShowWalkthrough(true)}
            className="text-[10px] font-mono text-[#2E2E2E] uppercase tracking-widest hover:text-[#F0EDE8] transition-colors"
          >
            ? Guide
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md">

          {/* Status badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                isConnected ? 'bg-[#DC2626]' : 'bg-[#2A2A2A]'
              }`} />
              {isConnected && (
                <span className="absolute inset-0 rounded-full bg-[#DC2626] animate-ping opacity-40" />
              )}
            </div>
            <span className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-[0.18em]">
              {isConnected ? 'Session Active' : 'Voice Interview Agent'}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-[#F0EDE8] italic mb-5 leading-tight">
            {isConnected ? "You're in the hot seat." : 'Ready when you are.'}
          </h1>

          <p className="text-[#6B6B6B] text-sm leading-relaxed mb-10 max-w-sm font-light">
            {isConnected
              ? 'The interviewer is listening. Answer clearly and completely — it will push back on weak answers.'
              : "Click the mic to start. Tell the interviewer what you're preparing for — company, role, and level. It will search the web for real questions, then grill you one by one."}
          </p>

          {/* Tips */}
          <div className="space-y-3 mb-12">
            {TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-[#DC2626] mt-0.5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-[#6B6B6B] leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>

          {/* Session info card */}
          <div className={`border p-5 transition-all duration-500 ${
            isConnected ? 'border-[#DC2626]/20' : 'border-[#1E1E1E]'
          }`} style={isConnected ? { backgroundColor: 'rgba(220,38,38,0.03)' } : {}}>
            <p className="text-[9px] font-mono text-[#6B6B6B] uppercase tracking-[0.22em] mb-5">
              Session Info
            </p>
            <div className="space-y-3">
              {[
                ['Voice Engine',    'ElevenLabs'],
                ['Question Source', 'Live Web Search'],
                ['Search Engine',   'Firecrawl'],
                ['Platforms',       '10+ Sources'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-[#6B6B6B]">{label}</span>
                  <span className="text-[11px] font-mono text-[#F0EDE8]">{value}</span>
                </div>
              ))}
              <div className="pt-3 mt-1 border-t border-[#1E1E1E] flex justify-between items-center">
                <span className="text-[11px] font-mono text-[#6B6B6B]">Status</span>
                <div className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                    isConnected ? 'bg-[#DC2626] animate-pulse' : 'bg-[#2A2A2A]'
                  }`} />
                  <span className={`text-[11px] font-mono ${
                    isConnected ? 'text-[#DC2626]' : 'text-[#6B6B6B]'
                  }`}>
                    {isConnected ? 'Live' : 'Idle'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 min-h-[60vh] md:min-h-screen">

        {/* Voice label */}
        <div className="text-center mb-12 h-10 flex flex-col items-center justify-center">
          <p className="text-[9px] font-mono text-[#2A2A2A] uppercase tracking-[0.22em] mb-3">
            Voice Interface
          </p>
          {isConnected ? (
            <div className="flex items-end justify-center gap-[3px] h-6">
              {BARS.map(({ h, d }, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-[#DC2626] rounded-sm audio-bar"
                  style={{
                    height: `${h * 22}px`,
                    animationDelay: `${i * 0.065}s`,
                    animationDuration: `${d}s`,
                  }}
                />
              ))}
            </div>
          ) : (
            <h2 className="font-serif text-xl text-[#F0EDE8] italic">
              Tap the mic to begin
            </h2>
          )}
        </div>

        {/* ── ORB ── */}
        <div className="relative flex items-center justify-center mb-16">

          <div className={`absolute w-72 h-72 rounded-full border transition-all duration-[2000ms] ping-slow ${
            isConnected ? 'border-[#DC2626]/15 opacity-100' : 'border-[#1E1E1E]/40 opacity-60'
          }`} />

          {isConnected && (
            <div className="absolute w-56 h-56 rounded-full border border-[#DC2626]/20 ring-expand" />
          )}

          <div className={`absolute w-52 h-52 rounded-full border transition-all duration-700 ${
            isConnected ? 'border-[#DC2626]/25 opacity-100' : 'border-[#1E1E1E] opacity-25'
          }`} />

          <div className={`absolute w-40 h-40 rounded-full border transition-all duration-500 ${
            isConnected ? 'border-[#DC2626]/40 opacity-80' : 'border-[#1E1E1E] opacity-20'
          }`} />

          <button
            onClick={handleMicClick}
            style={isConnected ? {
              boxShadow: '0 0 55px rgba(220,38,38,0.55), 0 0 110px rgba(220,38,38,0.2), 0 0 4px rgba(220,38,38,0.9)',
            } : {}}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer group ${
              isConnected
                ? 'bg-[#DC2626]'
                : 'bg-[#0D0D0D] border border-[#2A2A2A] hover:border-[#DC2626]/50 hover:bg-[#111]'
            }`}
          >
            {isConnected && (
              <span className="absolute inset-0 rounded-full bg-[#DC2626] animate-ping opacity-10" />
            )}
            {isConnected ? (
              <span className="w-4 h-4 bg-white rounded-[3px]" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-[#3A3A3A] group-hover:text-[#DC2626] transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              </svg>
            )}
          </button>
        </div>

        <p className="text-[10px] font-mono text-[#2A2A2A] text-center max-w-xs uppercase tracking-wider leading-relaxed">
          {isConnected
            ? 'Click the orb to end the session'
            : 'Questions sourced live from Glassdoor, Reddit, and Blind. Every session is unique.'}
        </p>
      </div>
    </main>
  );
}
