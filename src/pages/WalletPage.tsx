import { useState } from 'react';
import {
  Wallet,
  Plus,
  CheckCircle2,
  CreditCard,
  Send,
  MessageCircle,
  Info,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useToast } from '@/store/ToastContext';
import { RECHARGE_OPTIONS } from '@/data/catalog';
import { TG } from '@/lib/telegram';

interface Props {
  onGoServices: () => void;
}

export function WalletPage({ onGoServices }: Props) {
  const { wallet, userId, addRecharge } = useStore();
  const { notify } = useToast();
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState<'telegram' | 'whatsapp'>('telegram');
  const [pending, setPending] = useState<number | null>(null);

  const handleRecharge = (amount: number) => {
    if (amount <= 0) {
      notify('أدخل مبلغاً صحيحاً', 'error');
      return;
    }
    addRecharge(amount, method === 'telegram' ? 'Telegram' : 'WhatsApp');
    notify(`تمت إضافة $${amount} لمحفظتك`, 'success');
    setPending(amount);
    window.setTimeout(() => setPending(null), 2500);
    setCustom('');
  };

  const handleCustom = () => {
    const n = Number(custom);
    if (!Number.isFinite(n) || n <= 0) {
      notify('أدخل مبلغاً صحيحاً', 'error');
      return;
    }
    handleRecharge(Math.round(n * 100) / 100);
  };

  const customN = Number(custom);
  const customValid = Number.isFinite(customN) && customN > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shadow-glow">
          <Wallet className="w-5 h-5 text-slate-900" />
        </div>
        <div>
          <h1 className="font-display font-black text-2xl text-slate-50">محفظة ذكية</h1>
          <p className="text-sm text-slate-400">إدارة الرصيد وشحن المحفظة</p>
        </div>
      </div>

      {/* Balance card */}
      <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-8">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Wallet className="w-4 h-4 text-gold-400" />
            رصيدك الحالي
          </div>
          <div className="mt-2 font-display font-black text-4xl sm:text-5xl gold-text tabular-nums">
            ${wallet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono text-slate-400">{userId}</span>
            <span>•</span>
            <span>رصيد تجريبي</span>
          </div>
        </div>
      </div>

      {/* Recharge method */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-bold text-slate-100 mb-3">طريقة الشحن</h3>
        <div className="grid grid-cols-2 gap-3">
          <MethodBtn
            active={method === 'telegram'}
            onClick={() => setMethod('telegram')}
            icon={<Send className="w-4 h-4" />}
            label="تيليجرام"
            handle={TG.agent}
          />
          <MethodBtn
            active={method === 'whatsapp'}
            onClick={() => setMethod('whatsapp')}
            icon={<MessageCircle className="w-4 h-4" />}
            label="واتساب"
            handle={TG.whatsapp}
          />
        </div>
      </div>

      {/* Recharge options */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-bold text-slate-100 mb-4">اختر مبلغ الشحن</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {RECHARGE_OPTIONS.map((opt) => (
            <button
              key={opt.amount}
              onClick={() => handleRecharge(opt.amount)}
              className={`relative rounded-xl py-4 font-display font-black text-lg transition-all hover:scale-105 ${
                pending === opt.amount
                  ? 'gold-gradient text-slate-900 shadow-glow-lg'
                  : 'glass text-slate-100 hover:border-gold-500/40'
              }`}
            >
              {opt.popular && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] px-2 py-0.5 rounded-full gold-gradient text-slate-900 font-bold whitespace-nowrap">
                  الأكثر طلباً
                </span>
              )}
              {opt.label}
              {pending === opt.amount && (
                <CheckCircle2 className="w-3.5 h-3.5 absolute top-1.5 right-1.5 text-slate-900" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <label className="block text-sm font-semibold text-slate-200 mb-2">مبلغ مخصص</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-400 font-bold">$</span>
              <input
                type="number"
                className="field pr-9"
                placeholder="0.00"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                dir="ltr"
              />
            </div>
            <button
              onClick={handleCustom}
              disabled={!customValid}
              className={`px-5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                customValid
                  ? 'gold-gradient text-slate-900 shadow-glow hover:scale-105'
                  : 'glass text-slate-500 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              شحن
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="glass rounded-2xl p-5 flex items-start gap-3">
        <Info className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-400 leading-relaxed">
          رصيدك الحالي تجريبي لغرض العرض. للشحن الفعلي تواصل مع الوكيل عبر{' '}
          <a
            href={method === 'telegram' ? `https://t.me/${TG.agent.replace('@', '')}` : `https://wa.me/${TG.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noreferrer"
            className="text-gold-300 hover:underline"
          >
            {method === 'telegram' ? 'تيليجرام' : 'واتساب'}
          </a>
          {' '}وتم تأكيد الدفعة سيُضاف الرصيد فوراً.
        </p>
      </div>

      <button
        onClick={onGoServices}
        className="w-full glass rounded-2xl py-4 font-bold text-slate-100 hover:border-gold-500/40 transition-colors flex items-center justify-center gap-2"
      >
        <CreditCard className="w-4 h-4 text-gold-400" />
        ابدأ الشراء الآن
      </button>
    </div>
  );
}

function MethodBtn({
  active,
  onClick,
  icon,
  label,
  handle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  handle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl p-3.5 transition-all ${
        active ? 'gold-gradient text-slate-900 shadow-glow' : 'glass text-slate-200 hover:border-gold-500/40'
      }`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? 'bg-slate-900/20' : 'glass-strong'}`}>
        {icon}
      </div>
      <div className="text-right">
        <div className="text-sm font-bold">{label}</div>
        <div className={`text-[10px] ${active ? 'text-slate-800' : 'text-slate-500'}`} dir="ltr">{handle}</div>
      </div>
    </button>
  );
}
