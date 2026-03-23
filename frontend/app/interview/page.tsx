'use client';

import Link from 'next/link';
import { useConversation } from '@elevenlabs/react';
import { useCallback, useState } from 'react';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_4801kmcxnsfrf0b9h54v1yjtv7bk';

type Language = 'en' | 'hi';

const LANG_CONFIG: Record<Language, {
  label: string;
  flag: string;
  firstMessage: string;
  prompt: string;
  tips: string[];
  statusSpeaking: string;
  statusListening: string;
  statusIdle: string;
  heading: string;
  headingConnected: string;
  subtext: string;
  orbLabel: string;
  orbConnected: string;
  footer: string;
}> = {
  en: {
    label: 'English',
    flag: '🇬🇧',
    firstMessage: "Hey! I'm your interview prep partner, and fair warning — I don't go easy. Tell me what you're preparing for. Give me the company, role, and anything specific.",
    prompt: `You are "Imposter Interviewer" — a tough, realistic mock interviewer. Conduct the entire interview in English. Be direct, professional, and intense. Ask one question at a time. Give brief feedback after each answer. Never make up questions — only use questions from the search tool results.`,
    tips: [
      'Speak clearly — this is voice-first',
      'State company, role, and seniority level',
      'Answer fully — it will probe weak spots',
      "Ask for a debrief when you're done",
    ],
    statusSpeaking: 'Interviewer speaking',
    statusListening: 'Listening to you',
    statusIdle: 'Not connected',
    heading: 'Ready when you are.',
    headingConnected: "You're in the hot seat.",
    subtext: "Tell the interviewer what you're preparing for — company, role, and level. It will search the web for real questions, then grill you one by one.",
    orbLabel: 'Voice Interface',
    orbConnected: 'Interviewer is speaking...',
    footer: 'Questions sourced live from Glassdoor, Reddit, and Blind. Every session is unique.',
  },
  hi: {
    label: 'हिन्दी',
    flag: '🇮🇳',
    firstMessage: "नमस्ते! मैं आपका इंटरव्यू प्रेप पार्टनर हूं — और चेतावनी दे दूं, मैं आसान नहीं जाता। बताइए आप किस इंटरव्यू की तैयारी कर रहे हैं। कंपनी, रोल, और कोई खास बात बताइए।",
    prompt: `आप "Imposter Interviewer" हैं — एक कठोर, यथार्थवादी mock interviewer। पूरा इंटरव्यू हिंदी में करें। सीधे और professional रहें। एक समय में एक सवाल पूछें। हर जवाब के बाद संक्षिप्त feedback दें। कभी भी सवाल न बनाएं — केवल search tool के results से सवाल उपयोग करें।`,
    tips: [
      'साफ बोलें — यह voice-first है',
      'कंपनी, रोल और सीनियरिटी लेवल बताएं',
      'पूरा जवाब दें — कमज़ोर जगहों पर और सवाल होंगे',
      'खत्म होने पर debrief माँगें',
    ],
    statusSpeaking: 'इंटरव्यूअर बोल रहा है',
    statusListening: 'आपको सुन रहा है',
    statusIdle: 'कनेक्ट नहीं है',
    heading: 'जब तैयार हों, शुरू करें।',
    headingConnected: 'आप hot seat पर हैं।',
    subtext: 'इंटरव्यूअर को बताएं आप किसकी तैयारी कर रहे हैं — कंपनी, रोल और लेवल। यह web से असली सवाल खोजेगा और एक-एक करके पूछेगा।',
    orbLabel: 'Voice Interface',
    orbConnected: 'इंटरव्यूअर बोल रहा है...',
    footer: 'सवाल Glassdoor, Reddit और Blind से live खोजे जाते हैं। हर session अलग होता है।',
  },
};

// Fixed heights + durations to avoid hydration mismatch
const BARS: { h: number; d: number }[] = [
  { h: 0.40, d: 0.55 }, { h: 0.75, d: 0.62 }, { h: 0.50, d: 0.48 },
  { h: 1.00, d: 0.70 }, { h: 0.65, d: 0.58 }, { h: 0.85, d: 0.65 },
  { h: 0.45, d: 0.52 }, { h: 0.80, d: 0.68 }, { h: 0.55, d: 0.45 },
  { h: 0.70, d: 0.60 }, { h: 0.40, d: 0.72 }, { h: 0.90, d: 0.50 },
  { h: 0.60, d: 0.63 },
];

export default function InterviewPage() {
  const [language, setLanguage] = useState<Language>('en');

  const conversation = useConversation({
    onConnect: () => {},
    onDisconnect: () => {},
    onError: (err) => console.error('[elevenlabs]', err),
  });

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;
  const lang = LANG_CONFIG[language];

  const startSession = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc',
        overrides: {
          agent: {
            language,
            prompt: { prompt: lang.prompt },
            firstMessage: lang.firstMessage,
          },
        },
      });
    } catch (err) {
      console.error('Failed to start session', err);
    }
  }, [conversation, language, lang]);

  const endSession = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <main className="min-h-screen bg-[#080808] flex flex-col md:flex-row">

      {/* ── LEFT PANEL ── */}
      <div className="md:w-1/2 flex flex-col p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#1E1E1E]">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-mono text-[#2E2E2E] uppercase tracking-widest hover:text-[#F0EDE8] transition-colors mb-12 group self-start"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
          Back
        </Link>

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
              {isConnected ? (isSpeaking ? lang.statusSpeaking : lang.statusListening) : lang.statusIdle}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl text-[#F0EDE8] italic mb-5 leading-tight">
            {isConnected ? lang.headingConnected : lang.heading}
          </h1>

          <p className="text-[#6B6B6B] text-sm leading-relaxed mb-10 max-w-sm font-light">
            {lang.subtext}
          </p>

          {/* Tips */}
          <div className="space-y-3 mb-12">
            {lang.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-[#DC2626] mt-0.5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-[#6B6B6B] leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>

          {/* Session info card */}
          <div
            className={`border p-5 transition-all duration-500 ${
              isConnected ? 'border-[#DC2626]/20' : 'border-[#1E1E1E]'
            }`}
            style={isConnected ? { backgroundColor: 'rgba(220,38,38,0.03)' } : {}}
          >
            <p className="text-[9px] font-mono text-[#6B6B6B] uppercase tracking-[0.22em] mb-5">
              Session Info
            </p>
            <div className="space-y-3">
              {[
                ['Voice Engine',    'ElevenLabs'],
                ['Question Source', 'Live Web Search'],
                ['Search Engine',   'Firecrawl'],
                ['Language',        `${lang.flag} ${lang.label}`],
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

        {/* Language toggle (pre-session) */}
        {!isConnected && (
          <div className="mb-16 flex flex-col items-center gap-3">
            <p className="text-[9px] font-mono text-[#2E2E2E] uppercase tracking-[0.22em]">
              Session Language
            </p>
            <div className="flex border border-[#1E1E1E] overflow-hidden">
              {(['en', 'hi'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-6 py-2.5 text-[11px] font-mono uppercase tracking-widest transition-all duration-200 ${
                    language === l
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-transparent text-[#6B6B6B] hover:text-[#F0EDE8] hover:bg-[#111]'
                  }`}
                >
                  {LANG_CONFIG[l].flag} {LANG_CONFIG[l].label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active language label (in-session) */}
        {isConnected && (
          <div className="mb-16">
            <span className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest">
              {lang.flag} Session in {lang.label}
            </span>
          </div>
        )}

        {/* Voice label / audio bars */}
        <div className="text-center mb-12 h-10 flex flex-col items-center justify-center">
          <p className="text-[9px] font-mono text-[#2A2A2A] uppercase tracking-[0.22em] mb-3">
            {lang.orbLabel}
          </p>
          {isConnected && isSpeaking ? (
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
              {isConnected ? lang.statusListening : 'Tap to begin'}
            </h2>
          )}
        </div>

        {/* ── ORB ── */}
        <div className="relative flex items-center justify-center mb-16">

          {/* Outermost ring — slow breathe */}
          <div
            className={`absolute w-72 h-72 rounded-full border transition-all duration-[2000ms] ping-slow ${
              isConnected && isSpeaking
                ? 'border-[#DC2626]/15 opacity-100'
                : 'border-[#1E1E1E]/40 opacity-60'
            }`}
          />

          {/* Expanding ring — only while speaking */}
          {isConnected && isSpeaking && (
            <div className="absolute w-56 h-56 rounded-full border border-[#DC2626]/20 ring-expand" />
          )}

          {/* Middle ring */}
          <div className={`absolute w-52 h-52 rounded-full border transition-all duration-700 ${
            isConnected ? 'border-[#DC2626]/25 opacity-100' : 'border-[#1E1E1E] opacity-25'
          }`} />

          {/* Inner ring */}
          <div className={`absolute w-40 h-40 rounded-full border transition-all duration-500 ${
            isConnected ? 'border-[#DC2626]/40 opacity-80' : 'border-[#1E1E1E] opacity-20'
          }`} />

          {/* Main button */}
          <button
            onClick={isConnected ? endSession : startSession}
            style={isConnected ? {
              boxShadow: isSpeaking
                ? '0 0 55px rgba(220,38,38,0.55), 0 0 110px rgba(220,38,38,0.2), 0 0 4px rgba(220,38,38,0.9)'
                : '0 0 30px rgba(220,38,38,0.3), 0 0 70px rgba(220,38,38,0.12)',
            } : {}}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 group cursor-pointer ${
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
          {isConnected ? 'Click to end the session' : lang.footer}
        </p>
      </div>
    </main>
  );
}
