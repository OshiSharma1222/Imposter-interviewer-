interface SessionInfoProps {
  status?: 'ready' | 'active' | 'ended';
}

export default function SessionInfo({ status = 'ready' }: SessionInfoProps) {
  const statusLabel = status === 'active' ? 'Live' : status === 'ended' ? 'Ended' : 'Ready';
  const statusColor =
    status === 'active'
      ? 'text-[#DC2626]'
      : status === 'ended'
      ? 'text-[#6B6B6B]'
      : 'text-[#22C55E]';
  const dotColor =
    status === 'active' ? 'bg-[#DC2626]' : status === 'ended' ? 'bg-[#6B6B6B]' : 'bg-[#22C55E]';

  return (
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
          <span className={`text-xs font-mono flex items-center gap-1 ${statusColor}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
