import { useEffect, useState } from 'react';
import {
  Users,
  CheckCircle2,
  Phone,
  Wallet,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Star,
  TrendingUp,
  Crown,
} from 'lucide-react';
import { CountUp } from '@/components/CountUp';
import { Rating } from '@/components/Rating';
import { Marquee } from '@/components/Marquee';
import { PHONE_COUNTRIES } from '@/data/phoneNumbers';
import { SERVICES } from '@/data/catalog';
import { useStore } from '@/store/StoreContext';
import {
  InstagramGrowIcon,
  TelegramPremiumIcon,
  InstagramUnlockIcon,
  InstagramIcon,
  YahlaIcon,
  PubgUcIcon,
  YoHoIcon,
  YaahlanIcon,
  HalaMiIcon,
  AhlanIcon,
  KarniLiveIcon,
  YoyoLiveIcon,
  HiyyaLiveIcon,
} from '@/components/BrandIcons';
import type { ServiceIconKey } from '@/types';

interface HomeProps {
  onNav: (page: string) => void;
  onOpenService: (id: string) => void;
  onBuyPhone: (countryId: string) => void;
}

const SERVICE_ICONS: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  instagramGrow: InstagramGrowIcon,
  telegramPremium: TelegramPremiumIcon,
  instagramUnlock: InstagramUnlockIcon,
  instagram: InstagramIcon,
  yahla: YahlaIcon,
  pubgUc: PubgUcIcon,
  yoho: YoHoIcon,
  yaahlan: YaahlanIcon,
  halami: HalaMiIcon,
  ahlan: AhlanIcon,
  karnilive: KarniLiveIcon,
  yoyolive: YoyoLiveIcon,
  hiyjalive: HiyyaLiveIcon,
};

const HERO_IMAGES = ['/banner/slide1.jpg', '/banner/slide2.jpg'];

function HeroBanner({ onNav }: { onNav: (page: string) => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl glass-strong stagger">
      {/* Rotating background images — no text overlay, the images already contain the branding */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[21/8]">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="فانتوم الرقمي"
            className={
              'absolute inset-0 w-full h-full object-contain bg-slate-950 transition-opacity duration-1000 ' +
              (i === index ? 'opacity-100' : 'opacity-0')
            }
          />
        ))}
      </div>

      {/* Action buttons below the image */}
      <div className="relative p-4 sm:p-5 flex flex-wrap gap-3 justify-center bg-slate-950/40">
        <button
          onClick={() => onNav('services')}
          className="gold-gradient text-slate-900 font-bold px-5 py-3 rounded-xl shadow-glow hover:shadow-glow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          تصفح الخدمات
        </button>
        <button
          onClick={() => onNav('wallet')}
          className="glass text-slate-100 font-semibold px-5 py-3 rounded-xl hover:border-gold-500/40 transition-all flex items-center gap-2"
        >
          <Wallet className="w-4 h-4 text-gold-400" />
          شحن المحفظة
        </button>
      </div>

      {/* Single embedded marquee at the very bottom of the banner */}
      <div className="relative border-t border-white/10">
        <Marquee />
      </div>
    </section>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  onAll,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onAll: () => void;
}) {
  return (
    <div className="flex items-end justify-between mb-4 sm:mb-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gold-400">
          {icon}
        </div>
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-50">{title}</h2><p className="text-xs sm:text-sm text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <button
        onClick={onAll}
        className="text-xs text-gold-300 hover:text-gold-200 font-medium flex items-center gap-1 transition-colors"
      >
        عرض الكل
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  accent: string;
}) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5 hover:-translate-y-0.5 transition-transform duration-300">
      <div className={"w-9 h-9 rounded-lg glass flex items-center justify-center mb-3 " + accent}>
        {icon}
      </div>
      <div className="font-display font-black text-2xl sm:text-3xl text-slate-50 tabular-nums">
        <CountUp value={value} suffix={suffix} />
      </div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

export function HomePage({ onNav, onOpenService, onBuyPhone }: HomeProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Hero: rotating banner images + buttons + single embedded marquee */}
      <HeroBanner onNav={onNav} />

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="عملاء نشطون"
          value={5000}
          suffix="+"
          accent="text-sky-400"
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="طلب مكتمل"
          value={12000}
          suffix="+"
          accent="text-emerald-400"
        />
        <StatCard
          icon={<Zap className="w-5 h-5" />}
          label="تنفيذ فوري"
          value={99}
          suffix="%"
          accent="text-gold-400"
        />
        <StatCard
          icon={<ShieldCheck className="w-5 h-5" />}
          label="أمان موثوق"
          value={24}
          suffix="/7"
          accent="text-fuchsia-400"
        />
      </section>

      {/* Phone numbers */}
      <section>
        <SectionHeader
          icon={<Phone className="w-5 h-5" />}
          title="أرقام وهمية"
          subtitle="أرقام فعّالة لتفعيل التطبيقات والخدمات"
          onAll={() => onNav('services')}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 stagger">
          {PHONE_COUNTRIES.slice(0, 8).map((c) => (
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
        </div>
      </section>{/* Digital services */}
      <section>
        <SectionHeader
          icon={<TrendingUp className="w-5 h-5" />}
          title="الخدمات الرقمية"
          subtitle="شحن شدات ببجي، خدمات الدردشة، وتربية انستغرام وتيليجرام"
          onAll={() => onNav('services')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 stagger">
          {SERVICES.map((s) => {
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
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center p-1.5">
                    <Icon className="w-full h-full" />
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-gold-300 group-hover:-translate-x-1 transition-all" />
                </div>
                <h3 className="mt-4 font-bold text-slate-50 text-base">{s.name}</h3>
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
        </div>
      </section>

      {/* Wallet CTA */}
      <section className="rounded-3xl glass-strong p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center shadow-glow shrink-0">
            <Wallet className="w-7 h-7 text-slate-900" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-slate-50">محفظة ذكية</h3>
            <p className="text-sm text-slate-400 mt-0.5">اشحن رصيدك وابدأ التنفيذ الفوري</p>
          </div>
        </div>
        <button
          onClick={() => onNav('wallet')}
          className="gold-gradient text-slate-900 font-bold px-6 py-3 rounded-xl shadow-glow hover:shadow-glow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
        >
          إدارة المحفظة
          <ArrowLeft className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
