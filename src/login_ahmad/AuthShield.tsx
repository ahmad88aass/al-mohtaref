export function AuthShield({ className }: { className?: string }) {
  const wrapperClass = 'relative ' + (className ?? '');
  const particleAngles = [0, 60, 120, 180, 240, 300];

  return (
    <div className={wrapperClass} style={{ width: 200, height: 200 }}>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-gold-500/20 blur-3xl animate-shield-glow" />

      <div className="absolute inset-0 animate-spin-slow">
        {particleAngles.map((deg) => (
          <span
            key={deg}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-glow"
            style={{
              transform: 'rotate(' + deg + 'deg) translateY(-90px)',
              transformOrigin: '0 0',
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-4 rounded-full border border-gold-500/20"
        style={{ animation: 'spin-slow 15s linear infinite reverse' }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-shield-pulse">
        <svg viewBox="0 0 120 140" fill="none" className="w-28 h-32 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
          <defs>
            <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="shield-inner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="shield-blur">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>

          <path
            d="M60 5 L110 25 L110 70 Q110 110 60 135 Q10 110 10 70 L10 25 Z"
            fill="url(#shield-grad)"
          />
          <path
            d="M60 15 L100 31 L100 70 Q100 102 60 123 Q20 102 20 70 L20 31 Z"
            fill="url(#shield-inner)"
            opacity="0.9"
          />
          <path
            d="M42 68 L55 82 L82 52"
            stroke="url(#shield-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#shield-blur)"
          />
          <path
            d="M60 15 L100 31 L100 40 L60 24 L20 40 L20 31 Z"
            fill="url(#shield-grad)"
            opacity="0.3"
          />
        </svg>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-gold-500/30 blur-sm"
        style={{ animation: 'shield-pulse 3s ease-in-out infinite' }}
      />
    </div>
  );
}
