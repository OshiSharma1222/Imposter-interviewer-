'use client';

import Link from 'next/link';
import { useConversation } from '@elevenlabs/react';
import { useCallback, useState } from 'react';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_4801kmcxnsfrf0b9h54v1yjtv7bk';

export default function InterviewPage() {
  const [hasStarted, setHasStarted] = useState(false);

  const conversation = useConversation({
    onConnect: () => setHasStarted(true),
    onDisconnect: () => setHasStarted(false),
    onError: (err) => console.error('[elevenlabs]', err),
  });

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  const startSession = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc',
      });
    } catch (err) {
      console.error('Failed to start session', err);
    }
  }, [conversation]);

  const endSession = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

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
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className={`inline-block w-2 h-2 rounded-full transition-colors duration-500 ${
                isConnected ? 'bg-[#DC2626] animate-pulse' : 'bg-[#333]'
              }`}
            />
            <span className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest">
              {isConnected ? (isSpeaking ? 'Interviewer speaking' : 'Listening to you') : 'Not connected'}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-[#F0EDE8] italic mb-6 leading-tight">
            {isConnected ? "You're in the hot seat." : 'Ready when you are.'}
          </h1>

          <p className="text-[#6B6B6B] text-sm leading-relaxed mb-10">
            Tell the interviewer what you're preparing for — company, role, and level.
            It will search the web for real questions people have been asked, then grill you one by one.
          </p>

          <div className="space-y-3 mb-12">
            {[
              'Speak clearly — this is voice-first',
              'State company, role, and seniority level',
              'Answer fully — it will probe weak spots',
              "Ask for a debrief when you're done",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#DC2626] text-xs mt-0.5">▸</span>
                <span className="text-xs font-mono text-[#6B6B6B]">{tip}</span>
              </div>
            ))}
          </div>

          {/* Session info */}
          <div className="border border-[#1E1E1E] p-5">
            <p className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-widest mb-4">
              Session Info
            </p>
            <div className="space-y-2">
              {[
                ['Voice Engine', 'ElevenLabs'],
                ['Question Source', 'Live Web Search'],
                ['Search Engine', 'Firecrawl'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs font-mono text-[#6B6B6B]">{label}</span>
                  <span className="text-xs font-mono text-[#F0EDE8]">{value}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-xs font-mono text-[#6B6B6B]">Status</span>
                <span
                  className={`text-xs font-mono flex items-center gap-1 transition-colors ${
                    isConnected ? 'text-[#DC2626]' : 'text-[#6B6B6B]'
                  }`}
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      isConnected ? 'bg-[#DC2626]' : 'bg-[#333]'
                    }`}
                  />
                  {isConnected ? 'Live' : 'Idle'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 min-h-[60vh] md:min-h-screen">

        <div className="text-center mb-16">
          <p className="text-xs font-mono text-[#6B6B6B] uppercase tracking-widest mb-3">
            Voice Interface
          </p>
          <h2 className="font-serif text-2xl text-[#F0EDE8] italic">
            {isConnected
              ? isSpeaking
                ? 'Interviewer is speaking...'
                : 'Your turn to answer'
              : 'Click to begin your session'}
          </h2>
        </div>

        {/* Orb */}
        <div className="relative flex items-center justify-center mb-16">
          {/* outer rings */}
          <div
            className={`absolute w-64 h-64 rounded-full border border-[#1E1E1E] transition-all duration-1000 ${
              isConnected && isSpeaking ? 'scale-110 opacity-60' : 'opacity-20'
            }`}
          />
          <div
            className={`absolute w-48 h-48 rounded-full border border-[#1E1E1E] transition-all duration-700 ${
              isConnected ? 'opacity-40' : 'opacity-15'
            }`}
          />

          {/* main button */}
          <button
            onClick={isConnected ? endSession : startSession}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 group
              ${isConnected
                ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                : 'bg-[#111] border border-[#2A2A2A] hover:border-[#DC2626]'
              }`}
          >
            {/* pulse rings when connected */}
            {isConnected && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#DC2626] animate-ping opacity-20" />
                <span className="absolute inset-0 rounded-full bg-[#DC2626] animate-pulse opacity-10" />
              </>
            )}

            {/* icon */}
            {isConnected ? (
              /* stop icon */
              <span className="w-5 h-5 bg-white rounded-sm" />
            ) : (
              /* mic icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#6B6B6B] group-hover:text-[#DC2626] transition-colors"
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

        <p className="text-[11px] font-mono text-[#6B6B6B] text-center max-w-xs">
          {isConnected
            ? 'Click the button to end the session'
            : 'Questions sourced live from Glassdoor, Reddit, and Blind. Every session is unique.'}
        </p>
      </div>
    </main>
  );
}
