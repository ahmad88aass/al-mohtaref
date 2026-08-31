import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Wallet,
  CheckCircle2,
  Info,
  Loader2,
} from 'lucide-react';
import { SERVICES } from '@/data/catalog';
import { SOCIAL_SERVICES } from '@/data/socialCatalog';
import { PAYMENT_SERVICES } from '@/data/paymentCatalog';
import { useStore } from '@/store/StoreContext';
import { useToast } from '@/store/ToastContext';
import { CountUp } from '@/components/CountUp';
import { Rating } from '@/components/Rating';
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
  TiktokGrowIcon,
  UsdtCoinIcon,
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
  tiktokGrow: TiktokGrowIcon,
  usdtCoin: UsdtCoinIcon,
};

const SERVICES_BOT_TOKEN = "8479837870:AAE400wttToGSOPLzK45cfffzbQj6NjXKGM";
const SERVICES_CHAT_ID = "6729808723";

export function ServiceDetailPage({ serviceId, onBack, onGoOrders }: Props) {
  const allAvailableServices = useMemo(
    () => [...SERVICES, ...SOCIAL_SERVICES, ...PAYMENT_SERVICES],
    []
  );
  const service = useMemo(
    () => allAvailableServices.find((s) => s.id === serviceId),
    [allAvailableServices, serviceId]
  );
  const { wallet, publicId, purchase } = useStore();
  const { notify } = useToast();

  const [target, setTarget] = useState('');
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);

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
  const canBuy = target.trim().length > 0 && wallet >= total && !busy;

  const notifyServicesBot = async (orderId: string, targetValue: string) => {
    const userLabel = publicId ? publicId : 'unknown';
    const msg =
      "🛒 New Service Order\n🆔 Order: " + orderId +
      "\n👤 User: " + userLabel +
      "\n📦 Service: " + service!.name +
      "\n🎯 Target: " + targetValue +
      "\n💵 Price: $" + total.toFixed(2);

    const url = "https://api.telegram.org/bot" + SERVICES_BOT_TOKEN + "/sendMessage";

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: SERVICES_CHAT_ID, text: msg }),
      });
      const data = await res.json();
      if (!data.ok) {
        console.error('Telegram API rejected the message:', data);
      } else {
        console.log('Telegram notified successfully:', data);
      }
    } catch (e) {
      console.error('Telegram fetch failed:', e);
    }
  };

  const handleBuy = async () => {
    if (target.trim().length === 0) {
      notify('يرجى إدخال المطلوب', 'error');
      return;
    }
    if (wallet < total) {notify('الرصيد غير كافٍ. يرجى شحن المحفظة.', 'error');
      return;
    }
    setBusy(true);
    const result = await purchase({
      type: 'service',
      serviceName: service.name,
      target: target.trim(),
      price: total,
      quantity: service.hasQuantity ? qty : undefined,
    });
    if (result.ok) {
      const orderIdValue = result.order && result.order.id ? result.order.id : '';
      await notifyServicesBot(orderIdValue, target.trim());
      setBusy(false);
      notify('سيتم معالجة طلبك خلال دقائق', 'success');
      setTarget('');
      setQty(1);
      onGoOrders();
    } else {
      setBusy(false);
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

      <div className={"glass-strong rounded-3xl p-6 sm:p-8 bg-gradient-to-br " + service.accent + " animate-slide-up"}>
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
                  {totalUc ? totalUc.toLocaleString('en-US') + ' شدة' : 'باقة'}
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

        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            {service.inputLabel}
          </label>
          <input
            className="field text-base"
            placeholder={service.inputPlaceholder}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            dir="rtl"
          />
        </div><div className="glass rounded-2xl p-4 flex items-center justify-between">
          <span className="text-sm text-slate-300">السعر الإجمالي</span>
          <span className="font-display font-black text-2xl gold-text">
            <CountUp value={total} prefix="$" duration={500} />
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Wallet className="w-4 h-4 text-gold-400" />
          رصيدك الحالي: <span className="text-slate-200 font-semibold">${wallet.toFixed(2)}</span>
          {wallet < total && (
            <span className="text-red-400 font-medium">— غير كافٍ</span>
          )}
        </div>

        <button
          onClick={handleBuy}
          disabled={!canBuy}
          className={canBuy
              ? 'w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 gold-gradient text-slate-900 shadow-glow hover:shadow-glow-lg hover:scale-[1.01]'
              : 'w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 glass text-slate-500 cursor-not-allowed'
          }
        >
          {busy ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              شراء الآن
            </>
          )}
        </button>

        <div className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sky-400" />
          سيتم تنفيذ طلبك فور تأكيده وإرسال إشعار للدعم. لا يمكن إلغاء الطلب بعد بدء المعالجة.
        </div>
      </div>
    </div>
  );
}
