import { Sparkles, Zap, Star, ShieldCheck, Flame } from 'lucide-react';

const WELCOME_TEXT = 'أهلاً وسهلاً بكم في عالمنا الرقمي';

const ITEMS = [
  { icon: Flame, text: WELCOME_TEXT },
  { icon: Zap, text: 'تنفيذ فوري لكل الطلبات' },
  { icon: Star, text: WELCOME_TEXT },
  { icon: ShieldCheck, text: 'خدمات آمنة وموثوقة' },
  { icon: Sparkles, text: WELCOME_TEXT },
  { icon: Zap, text: 'أرقام وهمية — تربية — شدات ببجي' },
];

export function Marquee() {
  // Duplicate the list so the scroll loops seamlessly (translateX -50%).
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden gold-gradient border-b border-gold-700/30">
      {/* shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/15 to-transparent w-1/3 animate-marquee" />
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {loop.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-6 text-sm font-bold text-slate-900 shrink-0"
            >
              <Icon className="w-3.5 h-3.5" />
              {item.text}
              <span className="text-slate-900/40 mx-2">•</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
