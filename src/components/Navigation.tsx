import { Wallet, UserCircle2, Home, Sparkles, ClipboardList } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { PentagonLogo } from '@/components/PentagonLogo';

interface HeaderProps {
  active: string;
  onNav: (page: string) => void;
}

const NAV_ITEMS = [
  { key: 'home', label: 'الرئيسية' },
  { key: 'services', label: 'الخدمات' },
  { key: 'orders', label: 'طلباتي' },
  { key: 'wallet', label: 'المحفظة' },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Sparkles,
  ClipboardList,
  Wallet,
};

export function Header({ active, onNav }: HeaderProps) {
  const { wallet, userId } = useStore();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => onNav('home')}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <PentagonLogo className="w-9 h-9 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all" />
          <div className="text-right leading-tight">
            <div className="font-display font-extrabold text-base text-slate-50">المحترف</div>
            <div className="text-[10px] text-gold-400/80 font-medium">Al-Mohtaref</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNav(item.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === item.key
                  ? 'text-gold-300 bg-gold-500/10'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNav('wallet')}
            className="flex items-center gap-2 rounded-xl glass px-3 py-2 hover:border-gold-500/40 transition-colors"
          >
            <Wallet className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-slate-100 tabular-nums">
              ${wallet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl glass px-3 py-2">
            <UserCircle2 className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono text-slate-300">{userId}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function BottomNav({ active, onNav }: HeaderProps) {
  const items = [
    { key: 'home', label: 'الرئيسية', icon: 'Home' },
    { key: 'services', label: 'الخدمات', icon: 'Sparkles' },
    { key: 'orders', label: 'طلباتي', icon: 'ClipboardList' },
    { key: 'wallet', label: 'المحفظة', icon: 'Wallet' },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNav(item.key)}
              className={`flex flex-col items-center gap-1 py-2.5 transition-colors ${
                isActive ? 'text-gold-300' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
