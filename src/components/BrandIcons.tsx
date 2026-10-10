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

export function ProtonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-purple-500/30"}>
      <img src="/categories/proton-vpn-box.jpg" alt="Proton VPN" className="w-full h-full object-cover" />
    </div>
  );
}

export function NordVpnIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-blue-500/30"}>
      <img src="/categories/nord-vpn.jpg" alt="NordVPN" className="w-full h-full object-cover" />
    </div>
  );
}

export function ExpressVpnIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-rose-500/30"}>
      <img src="/categories/express-vpn.jpg" alt="ExpressVPN" className="w-full h-full object-cover" />
    </div>
  );
}

export function TelegramStarsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-amber-500/30"}>
      <img src="/categories/telegram-stars.jpg" alt="Telegram Stars" className="w-full h-full object-cover" />
    </div>
  );
}

export function TelegramPremiumBoxIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-sky-500/30"}>
      <img src="/categories/telegram-premium-box.jpg" alt="Telegram Premium" className="w-full h-full object-cover" />
    </div>
  );
}

export function InstagramVerifyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-blue-500/30"}>
      <img src="/categories/instagram-verify.jpg" alt="Instagram Verify" className="w-full h-full object-cover" />
    </div>
  );
}

export function BigoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-cyan-500/30"}>
      <img src="/categories/bigo-live.jpg" alt="Bigo Live" className="w-full h-full object-cover" />
    </div>
  );
}

export function SugoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-pink-500/30"}>
      <img src="/categories/sugo.jpg" alt="Sugo" className="w-full h-full object-cover" />
    </div>
  );
}

export function AhlanIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-amber-500/30"}>
      <img src="/categories/ahlan.jpg" alt="Ahlan" className="w-full h-full object-cover" />
    </div>
  );
}export function YaahlanIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-purple-500/30"}>
      <img src="/categories/yaahlan.jpg" alt="Yaahlan" className="w-full h-full object-cover" />
    </div>
  );
}

export function KarniLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-indigo-500/30"}>
      <img src="/categories/karnilive.jpg" alt="KarniLive" className="w-full h-full object-cover" />
    </div>
  );
}

export function SugarLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-pink-500/30"}>
      <img src="/categories/sugar-live.jpg" alt="Sugar Live" className="w-full h-full object-cover" />
    </div>
  );
}

export function TakaLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-blue-500/30"}>
      <img src="/categories/taka-live.jpg" alt="Taka Live" className="w-full h-full object-cover" />
    </div>
  );
}

export function ImoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-sky-500/30"}>
      <img src="/categories/imo.jpg" alt="IMO" className="w-full h-full object-cover" />
    </div>
  );
}

export function YoyoLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-amber-500/30"}>
      <img src="/categories/yoyo-live.jpg" alt="YoYo Live" className="w-full h-full object-cover" />
    </div>
  );
}

export function CrushLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-rose-500/30"}>
      <img src="/categories/crush-live.jpg" alt="Crush Live" className="w-full h-full object-cover" />
    </div>
  );
}

export function MicoLiveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-cyan-500/30"}>
      <img src="/categories/mico-live.jpg" alt="MICO Live" className="w-full h-full object-cover" />
    </div>
  );
}

export function ChametIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-purple-500/30"}>
      <img src="/categories/chamet.jpg" alt="Chamet" className="w-full h-full object-cover" />
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
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-sky-500/30"}>
      <img src="/categories/telegram-premium-box.jpg" alt="Telegram Premium" className="w-full h-full object-cover" />
    </div>
  );
}export function InstagramUnlockIcon({ className = "w-6 h-6" }: { className?: string }) {
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

export function PubgUcIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-md"}>
      UC
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

export function UnlockToolIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-amber-500/30"}>
      <img src="/categories/unlock-tool.jpg" alt="Unlock Tool" className="w-full h-full object-cover" />
    </div>
  );
}

export function OxygenIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-cyan-500/30"}>
      <img src="/categories/oxygen-ai.jpg" alt="Oxygen" className="w-full h-full object-cover" />
    </div>
  );
}

export function SamFwIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-blue-500/30"}>
      <img src="/categories/samfw-tool.jpg" alt="SamFw Tool" className="w-full h-full object-cover" />
    </div>
  );
}

export function WhatsappBoostIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-emerald-500/30"}>
      <img src="/categories/whatsapp-boost.jpg" alt="WhatsApp Boost" className="w-full h-full object-cover" />
    </div>
  );
}

export function InstagramBoostIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-pink-500/30"}>
      <img src="/categories/instagram-boost.jpg" alt="Instagram Boost" className="w-full h-full object-cover" />
    </div>
  );
}

export function TiktokBoostIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className + " rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/40 border border-cyan-500/30"}>
      <img src="/categories/tiktok-boost.jpg" alt="TikTok Boost" className="w-full h-full object-cover" />
    </div>
  );
}
