// src/components/BrandIcons.tsx

export function GeminiIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md p-1"}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
        <path d="M18.5 16.5L19.2 18.8L21.5 19.5L19.2 20.2L18.5 22.5L17.8 20.2L15.5 19.5L17.8 18.8L18.5 16.5Z" />
      </svg>
    </div>
  );
}

export function InstagramGrowIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function TelegramPremiumIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/>
      <path d="M22 2 11 13"/>
    </svg>
  );
}

export function InstagramUnlockIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
    </svg>
  );
}

export function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function YahlaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-md"}>
      YH
    </div>
  );
}

export function PubgUcIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-md"}>
      UC
    </div>
  );
}

export function YoHoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-[10px] shadow-md overflow-hidden p-1"}>
      YoHo
    </div>
  );
}

export function YaahlanIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-[10px] shadow-md"}>
      Yaah
    </div>
  );
}

export function HalaMiIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-fuchsia-600 flex items-center justify-center text-white font-bold text-[10px] shadow-md"}>
      Hala
    </div>
  );
}

export function AhlanIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-amber-400 flex items-center justify-center text-slate-900 font-bold text-[10px] shadow-md"}>
      Ahlan
    </div>
  );
}export function KarniLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-slate-900 border border-purple-500/50 flex items-center justify-center text-purple-400 font-bold text-[9px] shadow-md"}>
      LIVE
    </div>
  );
}

export function YoyoLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-cyan-400 flex items-center justify-center text-slate-950 font-black text-xs shadow-md"}>
      YO!
    </div>
  );
}

export function HiyyaLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-pink-400 flex items-center justify-center text-white font-bold text-[10px] shadow-md"}>
      Hiyya
    </div>
  );
}

export function TiktokGrowIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-gradient-to-tr from-cyan-400 to-rose-500 flex items-center justify-center text-white font-black text-[10px] shadow-md"}>
      TT
    </div>
  );
}

export function UsdtCoinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-xs shadow-md"}>
      USDT
    </div>
  );
}
