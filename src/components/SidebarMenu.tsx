import { useState } from 'react';
import {
  X,
  Wallet,
  CreditCard,
  MessageCircle,
  UserPlus,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useToast } from '@/store/ToastContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGoWallet: () => void;
}

function WhatsAppIcon({ className = "w-5 h-5 text-emerald-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.41 8.86 7.65C8.63 7.9 7.99 8.5 7.99 9.72C7.99 10.94 8.88 12.12 9 12.28C9.13 12.45 10.77 14.97 13.27 16.05C13.86 16.31 14.33 16.46 14.69 16.58C15.29 16.77 15.83 16.74 16.26 16.68C16.74 16.61 17.74 16.08 17.95 15.49C18.16 14.9 18.16 14.39 18.1 14.29C18.03 14.19 17.86 14.12 17.61 14C17.36 13.88 16.12 13.27 15.89 13.18C15.66 13.1 15.5 13.06 15.33 13.31C15.17 13.56 14.69 14.12 14.54 14.29C14.39 14.46 14.24 14.48 13.99 14.36C13.74 14.24 12.94 13.97 11.99 13.13C11.25 12.47 10.74 11.66 10.6 11.41C10.45 11.16 10.58 11.03 10.71 10.9C10.82 10.79 10.96 10.61 11.08 10.46C11.21 10.31 11.25 10.21 11.33 10.04C11.41 9.87 11.37 9.73 11.31 9.61C11.25 9.48 10.77 8.31 10.57 7.82C10.37 7.35 10.17 7.41 10.02 7.41C9.88 7.4 9.71 7.34 9.53 7.34Z" />
    </svg>
  );
}

export function SidebarMenu({ isOpen, onClose, onGoWallet }: Props) {
  const { notify } = useToast();
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  if (!isOpen) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'متجر الخدمات الرقمية',
          text: 'انضم إلى أفضل متجر للخدمات الرقمية وشحن الرصيد!',
          url: window.location.origin,
        });
      } catch {
        // Ignored
      }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      notify('تم نسخ رابط الدعوة بنجاح!', 'success');
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      <aside className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900 border-l border-amber-500/20 z-50 p-6 flex flex-col justify-between shadow-2xl animate-slide-left text-right overflow-y-auto" dir="rtl">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <h2 className="text-lg font-bold text-slate-100">القائمة الرئيسية</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 space-y-2">
            <button
              onClick={() => {
                onGoWallet();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <Wallet className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-sm">حسابي (المحفظة)</span>
            </button>

            <div>
              <button onClick={() => setShowPaymentMethods(!showPaymentMethods)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span className="font-medium text-sm">طرق الدفع</span>
                </div>
                {showPaymentMethods ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              
              {showPaymentMethods && (
                <div className="mr-8 my-1 p-3 rounded-xl glass space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span>شام كاش</span>
                    <span className="text-emerald-400">متاح</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span>عملات رقمية (USDT)</span>
                    <span className="text-emerald-400">متاح</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>بالليرة التركية (TRY)</span>
                    <span className="text-emerald-400">متاح</span>
                  </div>
                </div>
              )}
            </div>

            <a
              href="https://wa.me/963984335910"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-medium text-sm">تواصل مع الإدارة</span>
            </a>

            {/* تابعنا (قناة الواتساب مع أيقونة الواتساب الرسمية) */}
            <a
              href="https://whatsapp.com/channel/0029Vb8aXG0DOQIOBBZRTb1g"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span className="font-medium text-sm">تابعنا</span>
            </a>

            <button
              onClick={handleShare}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <UserPlus className="w-5 h-5 text-sky-400" />
              <span className="font-medium text-sm">دعوة صديق</span>
            </button>

            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <Info className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-sm">من نحن</span>
            </button>

            {/* برمجة وتصميم ahmad */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
              <p className="text-xs font-semibold text-purple-300 mb-2.5">برمجة وتصميم ahmad</p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://t.me/ahmad88_a"
                  target="_blank"
                  rel="noopener noreferrer"className="w-9 h-9 rounded-full bg-[#229ED9]/20 hover:bg-[#229ED9] text-[#229ED9] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="تليجرام ahmad"
                >
                  <svg className="w-4 h-4 fill-current -translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/abo123hmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-slate-300 hover:text-black flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="تويتر (X) ahmad"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-800 mt-6">
          جميع الحقوق محفوظة © {new Date().getFullYear()}
        </div>
      </aside>

      {showAboutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 animate-fade-in" dir="rtl">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Info className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">من نحن</h3>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              نحن إدارة تطبيق فانتوم: المالك الرسمي هو <span className="text-amber-400 font-bold">أحمد</span>. مطور في مجال الذكاء الاصطناعي وبرمجة المواقع والمتاجر وقائد جهاز الأمن السيبراني. نهدف من خلال موقعنا التقدم في الابتكار والأمان والجودة لتلبية تطلعات عملائنا وتقديم حلول متقدمة في مجال التكنولوجيا.
            </p>
            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-3 rounded-xl gold-gradient text-slate-900 font-bold hover:scale-[1.02] transition-transform"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}

