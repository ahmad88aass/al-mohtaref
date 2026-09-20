import React, { useState } from 'react';
import { Wallet, UserCircle2, Home, Sparkles, ClipboardList, LogIn, LogOut, Menu } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { useAuth } from '../store/AuthContext';
import { SidebarMenu } from './SidebarMenu';

interface HeaderProps {
  active: string;
  onNav: (page: string) => void;
  onOpenAuth?: () => void;
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

export function Header({ active, onNav, onOpenAuth }: HeaderProps) {
  const { wallet, publicId } = useStore();
  const { isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* زر الثلاث شخطات لفتح القائمة الجانبية */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-amber-500/40 text-slate-200 transition-colors"
              aria-label="القائمة"
            >
              <Menu className="w-5 h-5 text-amber-400" />
            </button>

            <button
              onClick={() => onNav('home')}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <img 
                src="/logo.jpg" 
                alt="Phantom" 
                className="w-10 h-10 rounded-xl object-cover border border-purple-500/30 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './logo.jpg';
                }}
              />
              <div className="text-right leading-tight">
                <div className="font-display font-black text-lg bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent tracking-wide">
                  Phantom
                </div>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onNav(item.key)}
                  className={isActive ? "px-4 py-2 rounded-xl text-sm font-medium transition-all text-amber-300 bg-amber-500/10" : "px-4 py-2 rounded-xl text-sm font-medium transition-all text-slate-400 hover:text-slate-100 hover:bg-slate-800"}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNav('wallet')}
              className="flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700 px-3 py-2 hover:border-amber-500/40 transition-colors"
            >
              <Wallet className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-slate-100 tabular-nums">
                ${wallet.toFixed(2)}
              </span>
            </button>

            {isAuthenticated && publicId && (
              <div className="hidden sm:flex items-center gap-1.5 rounded-xl bg-slate-800/80 border border-slate-700 px-3 py-2">
                <UserCircle2 className="w-4 h-4 text-slate-400" /><span className="text-xs font-mono text-slate-300">{publicId}</span>
              </div>
            )}
            {!isAuthenticated && onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">دخول</span>
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-xl text-xs font-bold transition"
                title="تسجيل خروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* المكون الفرعي للقائمة الجانبية */}
      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onGoWallet={() => onNav('wallet')}
      />
    </>
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNav(item.key)}
              className={isActive ? "flex flex-col items-center gap-1 py-2.5 transition-colors text-amber-300" : "flex flex-col items-center gap-1 py-2.5 transition-colors text-slate-500"}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
