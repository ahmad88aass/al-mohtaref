import { useState } from 'react';
import { Headphones, X, Send, MessageCircle } from 'lucide-react';

const TELEGRAM_USERNAME = 'hmada063';
const WHATSAPP_NUMBER = '963984335910';

export function AssistantWidget() {
  const [open, setOpen] = useState(false);

  const telegramLink = 'https://t.me/' + TELEGRAM_USERNAME;
  const whatsappLink = 'https://wa.me/' + WHATSAPP_NUMBER;

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="الدعم الفني"
          className="fixed bottom-20 md:bottom-6 left-4 z-50 group"
        >
          <span className="absolute inset-0 rounded-2xl gold-gradient opacity-60 animate-pulse-ring" />
          <span className="relative flex items-center gap-2 gold-gradient text-slate-900 font-bold px-4 py-3 rounded-2xl shadow-glow-lg group-hover:scale-105 transition-transform">
            <Headphones className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">الدعم الفني</span>
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 md:bottom-6 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm animate-scale-in">
          <div className="glass-strong rounded-3xl overflow-hidden shadow-card">
            {/* Header */}
            <div className="gold-gradient px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900/20 flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">الدعم الفني</div>
                  <div className="text-[10px] text-slate-800/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    متاح الآن
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-900/70 hover:text-slate-900 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options */}
            <div className="p-5 space-y-3">
              <p className="text-sm text-slate-300 text-center mb-1">
                اختر طريقة التواصل مع فريق الدعم
              </p>

              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass rounded-2xl p-4 hover:border-sky-500/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 text-sky-400" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm font-bold text-slate-100">تيليجرام</div>
                  <div className="text-xs text-slate-400" dir="ltr">@{TELEGRAM_USERNAME}</div>
                </div>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass rounded-2xl p-4 hover:border-emerald-500/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm font-bold text-slate-100">واتساب</div>
                  <div className="text-xs text-slate-400" dir="ltr">+{WHATSAPP_NUMBER}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
