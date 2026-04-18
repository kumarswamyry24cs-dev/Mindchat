export function MindchatLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role="img"
      aria-label="Mindchat logo"
    >
      <defs>
        <linearGradient id="mindchatLogoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect x="8" y="14" width="8" height="36" rx="4" fill="url(#mindchatLogoGradient)" />
      <rect x="22" y="10" width="8" height="44" rx="4" fill="url(#mindchatLogoGradient)" />
      <rect x="36" y="18" width="8" height="28" rx="4" fill="url(#mindchatLogoGradient)" />
      <rect x="50" y="22" width="8" height="20" rx="4" fill="url(#mindchatLogoGradient)" />
    </svg>
  );
}
