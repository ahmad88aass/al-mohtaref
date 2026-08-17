import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useToast } from '@/store/ToastContext';

export function ToastViewport() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((t) => {
        const Icon = t.kind === 'success' ? CheckCircle2 : t.kind === 'error' ? XCircle : Info;
        const accent =
          t.kind === 'success'
            ? 'text-emerald-400'
            : t.kind === 'error'
            ? 'text-red-400'
            : 'text-sky-400';
        return (
          <div
            key={t.id}
            className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 shadow-card pointer-events-auto animate-scale-in"
          >
            <Icon className={`w-5 h-5 shrink-0 ${accent}`} />
            <p className="text-sm text-slate-100 flex-1 leading-relaxed">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-slate-500 hover:text-slate-200 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
