import { useMemo, useState } from 'react';
import {
  ClipboardList,
  Phone,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Inbox,
  Search,
  KeyRound,
  RefreshCw,
} from 'lucide-react';
import { useStore } from '@/store/StoreContext';

interface Props {
  onGoServices: () => void;
}

const STATUS_STYLE: Record<string, { color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  'قيد المعالجة': { color: 'text-amber-300', bg: 'bg-amber-500/10', icon: Clock },
  مكتمل: { color: 'text-emerald-300', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
  ملغي: { color: 'text-red-300', bg: 'bg-red-500/10', icon: XCircle },
};

export function OrdersPage({ onGoServices }: Props) {
  const { orders } = useStore();
  const [filter, setFilter] = useState<'all' | 'phone' | 'service'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== 'all' && o.type !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          o.code.toLowerCase().includes(q) ||
          o.serviceName.toLowerCase().includes(q) ||
          o.target.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, filter, query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shadow-glow">
          <ClipboardList className="w-5 h-5 text-slate-900" />
        </div>
        <div>
          <h1 className="font-display font-black text-2xl text-slate-50">طلباتي</h1>
          <p className="text-sm text-slate-400">متابعة طلباتك النشطة والمكتملة</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 p-1 glass rounded-2xl">
          {(['all', 'phone', 'service'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f ? 'gold-gradient text-slate-900 shadow-glow' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {f === 'all' ? 'الكل' : f === 'phone' ? 'أرقام' : 'خدمات'}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
          <input
            className="field pr-11"
            placeholder="ابحث برقم الطلب أو الخدمة..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <div className="w-14 h-14 rounded-2xl glass mx-auto flex items-center justify-center mb-4">
            <Inbox className="w-7 h-7 text-slate-500" />
          </div>
          <h3 className="font-bold text-slate-200">لا توجد طلبات بعد</h3>
          <p className="text-sm text-slate-400 mt-1">ابدأ بشراء خدمة أو رقم وهمي</p>
          <button
            onClick={onGoServices}
            className="mt-5 gold-gradient text-slate-900 font-bold px-5 py-2.5 rounded-xl shadow-glow hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            تصفح الخدمات
          </button>
        </div>
      ) : (
        <div className="space-y-3 stagger">
          {filtered.map((o) => {
            const st = STATUS_STYLE[o.status] ?? STATUS_STYLE['قيد المعالجة'];
            const StatusIcon = st.icon;
            const isPhone = o.type === 'phone';
            return (
              <div key={o.id} className="glass rounded-2xl p-4 sm:p-5 hover:border-white/15 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0 ${
                      isPhone ? 'text-sky-400' : 'text-gold-300'
                    }`}>
                      {isPhone ? <Phone className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-100 truncate">{o.serviceName}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${st.bg} ${st.color} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {o.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 truncate">
                        {isPhone && o.flag ? `${o.flag} ` : ''}{o.target}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span className="font-mono">{o.code}</span>
                        <span>•</span>
                        <span>{timeAgo(o.createdAt)}</span>
                        {o.quantity && <><span>•</span><span>{o.quantity} باقة</span></>}
                      </div>
                    </div>
                  </div>
                  <div className="text-left shrink-0">
                    <div className="gold-text font-display font-black text-lg">${o.price.toFixed(2)}</div>
                  </div>
                </div>

                {/* Phone OTP card */}
                {isPhone && o.status === 'قيد المعالجة' && (
                  <div className="mt-4 glass rounded-xl p-4 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-amber-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      </div>
                      <span className="text-xs font-semibold text-amber-300">بانتظار رمز التفعيل (OTP)</span>
                    </div>
                    {o.phoneNumber && (
                      <div className="text-sm text-slate-200 mb-2">
                        الرقم: <span className="font-mono text-gold-300" dir="ltr">{o.phoneNumber}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <RefreshCw className="w-3 h-3 animate-spin [animation-duration:3s]" />
                      سيصلك الرمز خلال لحظات...
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'الآن';
  const min = Math.floor(sec / 60);
  if (min < 60) return `قبل ${min} دقيقة`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `قبل ${hr} ساعة`;
  const day = Math.floor(hr / 24);
  return `قبل ${day} يوم`;
}
