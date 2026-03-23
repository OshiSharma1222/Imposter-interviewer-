'use client';

import Script from 'next/script';

interface AgentWidgetProps {
  agentId: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'agent-id': string },
        HTMLElement
      >;
    }
  }
}

export default function AgentWidget({ agentId }: AgentWidgetProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 -m-8 rounded-full border border-[#1E1E1E] opacity-30" />
        <div className="absolute inset-0 -m-16 rounded-full border border-[#1E1E1E] opacity-15" />
        <elevenlabs-convai agent-id={agentId} />
      </div>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
