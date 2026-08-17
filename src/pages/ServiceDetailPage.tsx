import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Wallet,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { SERVICES } from '@/data/catalog';
import { useStore } from '@/store/StoreContext';
import { useToast } from '@/store/ToastContext';
import { CountUp } from '@/components/CountUp';
import { Rating } from '@/components/Rating';
import {
  InstagramGrowIcon,
  TelegramPremiumIcon,
  InstagramUnlockIcon,
  PubgUcIcon,
} from '@/components/BrandIcons';
import type { ServiceIconKey } from '@/types';

interface Props {
  serviceId: string;
  onBack: () => void;
  onGoOrders: () => void;
}

const SERVICE_ICONS: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  instagramGrow: InstagramGrowIcon,
  telegramPremium: TelegramPremiumIcon,
  instagramUnlock: InstagramUnlockIcon,
  pubgUc: PubgUcIcon,
};

export function ServiceDetailPage({ serviceId, onBack, onGoOrders }: Props) {
  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId), [serviceId]);
  const { wallet, purchase } = useStore();
  const { notify } = useToast();

  const [target, setTarget] = useState('');
  const [qty, setQty] = useState(1);

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-400">الخدمة غير موجودة</p>
        <button onClick={onBack} className="mt-4 text-gold-300">العودة</button>
      </div>
    );
  }

  const Icon = SERVICE_ICONS[service.icon] ?? InstagramGrowIcon;
  const unitPrice = service.unitPrice ?? service.price;
  const total = Math.round(unitPrice * qty * 100) / 100;
  const totalUc = service.unitAmount ? service.unitAmount * qty : undefined;
  const canBuy = target.trim().length > 0 && wallet >= total;

  const handleBuy = () => {
    if (target.trim().length === 0) {
      notify('يرجى إدخل المطلوب', 'error');
      return;
    }
    if (wallet < total) {
      notify('الرصيد غير كافٍ. يرجى شحن المحفظة.', 'error');
      return;
    }
    const result = purchase({
      type: 'service',
      serviceName: service.name,
      target: target.trim(),
      price: total,
      quantity: service.hasQuantity ? qty : undefined,
    });
    if (result.ok) {
      notify('سيتم معالجة طلبك خلال دقائق', 'success');
      setTarget('');
      setQty(1);
      onGoOrders();
    } else {
      notify(result.error ?? 'فشل التنفيذ', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-6 text-sm"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للخدمات
      </button>

      <div className={`glass-strong rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${service.accent} animate-slide-up`}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl glass-strong flex items-center justify-center shrink-0 p-2">
            <Icon className="w-full h-full" />
          </div>
          <div className="flex-1">
            <h1 className="font-display font-black text-2xl text-slate-50">{service.name}</h1>
            <p className="text-sm text-slate-300 mt-1">{service.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                تنفيذ فوري
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full glass text-slate-300">
                {service.unit ?? 'لكل طلب'}
              </span>
            </div>
            <div className="mt-3">
              <Rating value={service.rating} reviews={service.reviews} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-3xl p-6 sm:p-8 space-y-5 animate-fade-in">
        {/* Quantity selector for pubg */}
        {service.hasQuantity && (
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              {service.quantityLabel}
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:border-gold-500/40 transition-colors"
                disabled={qty <= 1}
              >
                <Minus className="w-4 h-4 text-slate-200" />
              </button>
              <div className="flex-1 text-center">
                <div className="font-display font-black text-2xl text-slate-50">{qty}</div>
                <div className="text-[11px] text-slate-400">
                  {totalUc ? `${totalUc.toLocaleString('en-US')} شدة` : 'باقة'}
                </div>
              </div>
              <button
                onClick={() => setQty((q) => Math.min(100, q + 1))}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:border-gold-500/40 transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-200" />
              </button>
            </div>
          </div>
        )}

        {/* Target input */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            {service.inputLabel}
          </label>
          <input
            className="field text-base"
            placeholder={service.inputPlaceholder}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            dir={service.id === 'pubg-uc' ? 'ltr' : 'rtl'}
          />
        </div>

        {/* Total */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <span className="text-sm text-slate-300">السعر الإجمالي</span>
          <span className="font-display font-black text-2xl gold-text">
            <CountUp value={total} prefix="$" duration={500} />
          </span>
        </div>

        {/* Wallet balance */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Wallet className="w-4 h-4 text-gold-400" />
          رصيدك الحالي: <span className="text-slate-200 font-semibold">${wallet.toFixed(2)}</span>
          {wallet < total && (
            <span className="text-red-400 font-medium">— غير كافٍ</span>
          )}
        </div>

        {/* Buy button */}
        <button
          onClick={handleBuy}
          disabled={!canBuy}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
            canBuy
              ? 'gold-gradient text-slate-900 shadow-glow hover:shadow-glow-lg hover:scale-[1.01]'
              : 'glass text-slate-500 cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          شراء الآن
        </button>

        <div className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sky-400" />
          سيتم تنفيذ طلبك فور تأكيده وإرسال إشعار للدعم. لا يمكن إلغاء الطلب بعد بدء المعالجة.
        </div>
      </div>
    </div>
  );
}
