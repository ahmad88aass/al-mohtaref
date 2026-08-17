import type { SVGProps } from 'react';

/** Pentagon brand logo for Al-Mohtaref. */
export function PentagonLogo(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} {...rest}>
      <defs>
        <linearGradient id="penta-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="penta-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Pentagon outline */}
      <path
        d="M24 4 L43 17.5 L35.8 41 L12.2 41 L5 17.5 Z"
        fill="url(#penta-gold)"
        filter="url(#penta-glow)"
      />
      {/* Inner pentagon cut */}
      <path
        d="M24 11 L36.5 20 L31.8 33.5 L16.2 33.5 L11.5 20 Z"
        fill="#020617"
        opacity="0.85"
      />
      {/* Arabic "م" mark */}
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="900"
        fill="url(#penta-gold)"
        fontFamily="Cairo, system-ui, sans-serif"
      >
        م
      </text>
    </svg>
  );
}
