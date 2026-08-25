import { useState } from 'react';
import { Phone, Search, Flag, Star, Crown } from 'lucide-react';
import { PHONE_COUNTRIES } from '@/data/phoneNumbers';
import { SERVICES } from '@/data/catalog';
import { Rating } from '@/components/Rating';
import {
  InstagramGrowIcon,
  TelegramPremiumIcon,
  InstagramUnlockIcon,
  InstagramIcon,
  YahlaIcon,
} from '@/components/BrandIcons';
import type { ServiceIconKey } from '@/types';

interface ServicesProps {
  onOpenService: (id: string) => void;
  onBuyPhone: (countryId: string) => void;
}

const SERVICE_ICONS: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  instagramGrow: InstagramGrowIcon,
  telegramPremium: TelegramPremiumIcon,
  instagramUnlock: InstagramUnlockIcon,
  instagram: InstagramIcon,
  yahla: YahlaIcon,
};

export function ServicesPage({ onOpenService, onBuyPhone }: ServicesProps) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'services' | 'phones'>('services');

  const filteredPhones = PHONE_COUNTRIES.filter((c) =>
    c.country.toLowerCase().includes(query.toLowerCase())
  );
  const filteredServices = SERVICES.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shadow-glow">
          <Star className="w-5 h-5 text-slate-900" />
        </div>
        <div>
          <h1 className="font-display font-black text-2xl text-slate-50">كل الخدمات</h1>
          <p className="text-sm text-slate-400">تصفح الأرقام الوهمية والخدمات الرقمية</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 glass rounded-2xl w-full sm:w-fit">
        <TabBtn active={tab === 'services'} onClick={() => setTab('services')} icon={<Star className="w-4 h-4" />}>
          الخدمات الرقمية
        </TabBtn>
        <TabBtn active={tab === 'phones'} onClick={() => setTab('phones')} icon={<Phone className="w-4 h-4" />}>
          الأرقام الوهمية
        </TabBtn>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
        <input
          className="field pr-11"
          placeholder={tab === 'services' ? 'ابحث عن خدمة...' : 'ابحث عن دولة...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {tab === 'services' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 stagger">
          {filteredServices.map((s) => {
            const Icon = SERVICE_ICONS[s.icon] ?? InstagramGrowIcon;
            return (
              <button
                key={s.id}
                onClick={() => onOpenService(s.id)}
                className={"glass rounded-2xl p-5 text-right hover:border-gold-500/40 transition-all group hover:-translate-y-1 duration-300 bg-gradient-to-br " + s.accent + " relative overflow-hidden"}
              >
                {s.tag && (
                  <span className="absolute top-4 left-4 text-[10px] px-2 py-1 rounded-full gold-gradient text-slate-900 font-bold flex items-center gap-1">
                    {s.tag === 'الأكثر مبيعاً' || s.tag === 'الأكثر طلباً' ? (
                      <Crown className="w-3 h-3" />
                    ) : (
                      <Star className="w-3 h-3" />
                    )}
                    {s.tag}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center p-1.5">
                  <Icon className="w-full h-full" />
                </div><h3 className="mt-4 font-bold text-slate-50">{s.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.description}</p>
                <div className="mt-3">
                  <Rating value={s.rating} reviews={s.reviews} size="xs" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="gold-text font-display font-black text-lg">
                    {s.hasQuantity ? 'من $' + s.unitPrice : '$' + s.price}
                  </span>
                  <span className="text-[11px] text-slate-400">{s.unit ?? 'لكل طلب'}</span>
                </div>
              </button>
            );
          })}
          {filteredServices.length === 0 && <EmptyState text="لا توجد خدمات مطابقة" />}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 stagger">
          {filteredPhones.map((c) => (
            <div
              key={c.id}
              className="glass rounded-2xl p-4 hover:border-gold-500/30 transition-all group hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{c.flag}</span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                  {c.available} متاح
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-1.5">{c.country}</h3>
              <Rating value={c.rating} reviews={c.reviews} size="xs" />
              <div className="flex items-center justify-between mt-3">
                <span className="gold-text font-display font-black text-lg">
                  ${c.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onBuyPhone(c.id)}
                  className="gold-gradient text-slate-900 text-xs font-bold px-3 py-2 rounded-lg shadow-glow hover:scale-105 transition-transform"
                >
                  شراء فوري
                </button>
              </div>
            </div>
          ))}
          {filteredPhones.length === 0 && <EmptyState text="لا توجد دول مطابقة" />}
        </div>
      )}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? 'flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all gold-gradient text-slate-900 shadow-glow'
          : 'flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-400 hover:text-slate-100'
      }
    >
      {icon}
      {children}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="col-span-full glass rounded-2xl p-10 text-center">
      <Flag className="w-8 h-8 text-slate-600 mx-auto mb-2" />
      <p className="text-slate-400">{text}</p>
    </div>
  );
}
