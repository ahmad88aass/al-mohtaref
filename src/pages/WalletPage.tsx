import {
  Wallet,
  CreditCard,
  Send,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';

interface Props {
  onGoServices: () => void;
}

const AGENT_USERNAME = 'ahmad88_m';
const AGENT_LINK = 'https://t.me/' + AGENT_USERNAME;

export function WalletPage({ onGoServices }: Props) {
  const { wallet, publicId } = useStore();

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
            <span className="font-mono text-slate-400">{publicId || '—'}</span>
            <span>•</span>
            <span>رصيدك الفعلي المحفوظ في قاعدة البيانات</span>
          </div>
        </div>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center shadow-glow mx-auto">
          <ShieldCheck className="w-7 h-7 text-slate-900" />
        </div>
        <div>
          <h3 className="font-display font-extrabold text-xl text-slate-50">شحن المحفظة</h3>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed max-w-sm mx-auto">
            لشحن رصيدك، تواصل مباشرة مع الوكيل المعتمد عبر تيليجرام. بعد تأكيد الدفع سيتم إضافة
            الرصيد لحسابك يدوياً خلال دقائق.
          </p>
        </div>
        <a
          href={AGENT_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 gold-gradient text-slate-900 font-bold px-6 py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all"
        >
          <Send className="w-4 h-4" />
          تواصل مع الوكيل عبر تيليجرام
        </a>
        <p className="text-xs text-slate-500" dir="ltr">@{AGENT_USERNAME}</p>
      </div>

      <div className="glass rounded-2xl p-5 flex items-start gap-3">
        <Info className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-400 leading-relaxed">
          لا يتم إضافة أي رصيد تلقائياً — الشحن يتم فقط بعد التأكد من استلام الدفعة من الوكيل
          المعتمد. احرص على إرسال معرفك الخاص ({publicId || '—'}) عند التواصل لتسريع العملية.
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
