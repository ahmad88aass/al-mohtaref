import { useMemo, useState, useEffect } from 'react';
import {
  ArrowRight,
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
import { Rating } from '@/components/Rating';
import {
  GeminiIcon,
  ProtonIcon,
  InstagramGrowIcon,
  TelegramPremiumIcon,
  InstagramUnlockIcon,
  InstagramIcon,
  BigoIcon,
  SugoIcon,
  PubgUcIcon,
  YaahlanIcon,
  AhlanIcon,
  KarniLiveIcon,
  TiktokGrowIcon,
  UsdtCoinIcon,
} from '@/components/BrandIcons';
import type { ServiceIconKey, ServiceTier } from '@/types';
import { createShop2TopUpOrder } from '@/services/shop2topup';

interface Props {
  serviceId: string;
  onBack: () => void;
  onGoOrders: () => void;
}

const SERVICE_ICONS: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  gemini: GeminiIcon,
  proton: ProtonIcon,
  instagramGrow: InstagramGrowIcon,
  telegramPremium: TelegramPremiumIcon,
  instagramUnlock: InstagramUnlockIcon,
  instagram: InstagramIcon,
  bigo: BigoIcon,
  sugo: SugoIcon,
  pubgUc: PubgUcIcon,
  yaahlan: YaahlanIcon,
  ahlan: AhlanIcon,
  karnilive: KarniLiveIcon,
  tiktokGrow: TiktokGrowIcon,
  usdtCoin: UsdtCoinIcon,
};

const SERVICES_BOT_TOKEN = "8479837870:AAE400wttToGSOPLzK45cfffzbQj6NjXKGM";
const SERVICES_CHAT_ID = "6729808723";

const PROVIDER_SUB_CATEGORIES: Record<string, number> = {
  'freefire-110': 28,
  'freefire-583': 30,
  'bloodstrike-gold-100': 184,
  'bloodstrike-gold-500': 186,
};

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

  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null);
  const [target, setTarget] = useState('');
  const [busy, setBusy] = useState(false);

  // تحديث الفئة الافتراضية فور فتح أي منتج
  useEffect(() => {
    if (service && service.tiers && service.tiers.length > 0) {
      setSelectedTier(service.tiers[0]);
    } else {
      setSelectedTier(null);
    }
  }, [service]);

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-400">الخدمة غير موجودة</p>
        <button onClick={onBack} className="mt-4 text-gold-300">العودة</button>
      </div>
    );
  }

  const Icon = SERVICE_ICONS[service.icon] ? SERVICE_ICONS[service.icon] : InstagramGrowIcon;

  // الحساب الحي الفوري للسعر حسب الفئة المضغوطة
  const currentTotal = selectedTier ? Number(selectedTier.price) : Number(service.price);
  const canBuy = target.trim().length > 0 && wallet >= currentTotal && !busy;

  const isContactService = service.id === 'gemini-subscription' || service.id === 'proton-vpn-monthly';
  const currentLabel = isContactService ? 'أدخل رقمك للتواصل معك' : service.inputLabel;
  const currentPlaceholder = isContactService ? 'e.g. +9639xxxxxxxx أو 09xxxxxxxx' : service.inputPlaceholder;

  const notifyServicesBot = async (orderId: string, targetValue: string, providerStatus: string, tierName?: string) => {
    const userLabel = publicId ? publicId : 'unknown';
    const targetField = isContactService ? '\n📱 Phone: ' : '\n🎯 Target: ';
    const tierField = tierName ? ('\n🏷 Tier: ' + tierName) : '';
    const msg =
      "🛒 New Service Order\n🆔 Order: " + orderId +
      "\n👤 User: " + userLabel +
      "\n📦 Service: " + service.name +
      tierField +
      targetField + targetValue +
      "\n💵 Price: $" + currentTotal.toFixed(2) +
      "\n⚡️ Provider Status: " + providerStatus;const url = "https://api.telegram.org/bot" + SERVICES_BOT_TOKEN + "/sendMessage";

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: SERVICES_CHAT_ID, text: msg }),
      });
      const data = await res.json();
      if (!data.ok) {
        console.error('Telegram API rejected the message:', data);
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
    if (wallet < currentTotal) {
      notify('الرصيد غير كافٍ. يرجى شحن المحفظة.', 'error');
      return;
    }
    setBusy(true);

    const orderTitle = selectedTier ? (service.name + ' (' + selectedTier.name + ')') : service.name;

    const result = await purchase({
      type: 'service',
      serviceName: orderTitle,
      target: target.trim(),
      price: currentTotal,
      quantity: 1,
    });

    if (result.ok) {
      const orderIdValue = result.order && result.order.id ? result.order.id : '';
      let providerStatus = 'Manual/No Provider';

      const providerSubId = selectedTier && selectedTier.providerSubId 
        ? selectedTier.providerSubId 
        : PROVIDER_SUB_CATEGORIES[service.id];

      if (providerSubId) {
        const topupRes = await createShop2TopUpOrder(providerSubId, target.trim());
        if (topupRes.ok) {
          providerStatus = 'Executed Automatically (Success)';
        } else {
          providerStatus = 'Provider Failed (Needs Manual Check)';
        }
      }

      await notifyServicesBot(orderIdValue, target.trim(), providerStatus, selectedTier ? selectedTier.name : undefined);
      setBusy(false);
      notify('سيتم معالجة طلبك فوراً', 'success');
      setTarget('');
      onGoOrders();
    } else {
      setBusy(false);
      notify(result.error ? result.error : 'فشل التنفيذ', 'error');
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
                {service.unit ? service.unit : 'لكل طلب'}
              </span>
            </div>
            <div className="mt-3">
              <Rating value={service.rating} reviews={service.reviews} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-3xl p-6 sm:p-8 space-y-5 animate-fade-in">
        {/* اختيار الفئة إن وُجدت */}
        {service.tiers && service.tiers.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2.5">اختر الفئة المطلوبة:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {service.tiers.map((tier) => {
                const isSelected = selectedTier?.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={
                      isSelected
                        ? "p-3 rounded-xl border-2 border-amber-400 bg-amber-400/20 text-right shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all scale-[1.02]"
                        : "p-3 rounded-xl border border-white/10 glass text-right hover:border-purple-400/40 hover:bg-white/5 transition-all"
                    }
                  >
                    <div className={"font-bold text-sm " + (isSelected ? "text-amber-300" : "text-slate-100")}>
                      {tier.name}
                    </div>
                    <div className="text-xs text-gold-400 font-black mt-1">
                      ${Number(tier.price).toFixed(2)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            {currentLabel}
          </label>
          <input
            className="field text-base"
            placeholder={currentPlaceholder}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            dir="rtl"
          />
        </div>

        {/* خانة السعر الإجمالي المباشر بدون تعليق العداد */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <span className="text-sm text-slate-300">السعر الإجمالي</span>
          <span key={currentTotal} className="font-display font-black text-2xl gold-text transition-all">
            ${currentTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Wallet className="w-4 h-4 text-gold-400" />
          رصيدك الحالي: <span className="text-slate-200 font-semibold">${wallet.toFixed(2)}</span>
          {wallet < currentTotal && (
            <span className="text-red-400 font-medium">— غير كافٍ</span>
          )}
        </div>

        <button
          onClick={handleBuy}
          disabled={!canBuy}
          className={
            canBuy
              ? 'w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 gold-gradient text-slate-900 shadow-glow hover:shadow-glow-lg hover:scale-[1.01]'
              : 'w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 glass text-slate-500 cursor-not-allowed'
          }
        >
          {busy ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              شراء الآن (${currentTotal.toFixed(2)})
            </>
          )}
        </button>

        <div className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sky-400" />
          سيتم تنفيذ طلبك فور تأكيده وخصم الرصيد تلقائياً من محفظتك.
        </div>
      </div>
    </div>
  );
}
