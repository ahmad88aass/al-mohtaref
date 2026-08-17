import type { SVGProps } from 'react';

/** Authentic Telegram paper-plane brand mark. */
export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.94 4.6 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.19c-.25.25-.46.46-.94.46l.33-4.79 8.73-7.89c.38-.34-.08-.53-.59-.19L7.3 13.09 2.67 11.64c-1-.31-1.02-1 .21-1.48l17.86-6.88c.83-.31 1.56.19 1.2 1.32z" />
    </svg>
  );
}

/** Telegram with a premium star sparkle. */
export function TelegramPremiumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M21.94 4.6 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.19c-.25.25-.46.46-.94.46l.33-4.79 8.73-7.89c.38-.34-.08-.53-.59-.19L7.3 13.09 2.67 11.64c-1-.31-1.02-1 .21-1.48l17.86-6.88c.83-.31 1.56.19 1.2 1.32z"
        fill="currentColor"
      />
      <path
        d="M18.5 13.2l-.5 2.4 1.8 1.6-2.4.5-1 2.2-1-2.2-2.4-.5 1.8-1.6-.5-2.4 2.1 1z"
        fill="#fbbf24"
        stroke="#0f172a"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Instagram gradient camera brand mark. */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} {...rest}>
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="30%" stopColor="#fa7e1e" />
          <stop offset="55%" stopColor="#d62976" />
          <stop offset="80%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="url(#ig-grad)" />
    </svg>
  );
}

/** Instagram with a small growth arrow for "تربية" service. */
export function InstagramGrowIcon(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} {...rest}>
      <defs>
        <linearGradient id="ig-grad2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="30%" stopColor="#fa7e1e" />
          <stop offset="55%" stopColor="#d62976" />
          <stop offset="80%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="url(#ig-grad2)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" stroke="url(#ig-grad2)" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="url(#ig-grad2)" />
      <path
        d="M15 9l3-3m0 0h-2.2M18 6v2.2"
        stroke="#34d399"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Instagram with a lock-open badge for unlock service. */
export function InstagramUnlockIcon(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} {...rest}>
      <defs>
        <linearGradient id="ig-grad3" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="30%" stopColor="#fa7e1e" />
          <stop offset="55%" stopColor="#d62976" />
          <stop offset="80%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="url(#ig-grad3)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" stroke="url(#ig-grad3)" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="url(#ig-grad3)" />
      <path
        d="M9.5 15.5h5M12 15.5v2.2"
        stroke="#fbbf24"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** PUBG-style gaming controller with UC coin. */
export function PubgUcIcon(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} {...rest}>
      <defs>
        <linearGradient id="uc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M6 9h2v6H6a3 3 0 010-6zm12 0h-2v6h2a3 3 0 000-6z"
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="1.2"
      />
      <path d="M8 9h8v6H8z" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.2" fill="url(#uc-grad)" stroke="#92400e" strokeWidth="0.6" />
      <text
        x="12"
        y="13.8"
        textAnchor="middle"
        fontSize="3.4"
        fontWeight="900"
        fill="#7c2d12"
        fontFamily="system-ui"
      >
        UC
      </text>
    </svg>
  );
}
