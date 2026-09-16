import { useState } from 'react';
import {
  X,
  Wallet,
  CreditCard,
  MessageCircle,
  Instagram,
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
      {/* خلفية معتمة عند فتح القائمة */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* النافذة الجانبية */}
      <aside className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900 border-l border-amber-500/20 z-50 p-6 flex flex-col justify-between shadow-2xl animate-slide-left text-right" dir="rtl">
        <div>
          {/* هيدر القائمة */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <h2 className="text-lg font-bold text-slate-100">القائمة الرئيسية</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* خيارات القائمة */}
          <nav className="mt-6 space-y-2">
            {/* زر حسابي / المحفظة */}
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

            {/* طرق الدفع */}
            <div>
              <button
                onClick={() => setShowPaymentMethods(!showPaymentMethods)}
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
              
              {/* القائمة الفرعية لطرق الدفع */}
              {showPaymentMethods && (
                <div className="mr-8 my-1 p-3 rounded-xl glass space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span>شام كاش</span>
                    <span className="text-emerald-400">متاح</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2"><span>عملات رقمية (USDT)</span>
                    <span className="text-emerald-400">متاح</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>بالليرة التركية (TRY)</span>
                    <span className="text-emerald-400">متاح</span>
                  </div>
                </div>
              )}
            </div>

            {/* تواصل مع الإدارة (واتساب) */}
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

            {/* تابعنا (إنستغرام) */}
            <a
              href="https://instagram.com/a.j._7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <Instagram className="w-5 h-5 text-pink-400" />
              <span className="font-medium text-sm">تابعنا</span>
            </a>

            {/* دعوة صديق */}
            <button
              onClick={handleShare}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <UserPlus className="w-5 h-5 text-sky-400" />
              <span className="font-medium text-sm">دعوة صديق</span>
            </button>

            {/* من نحن */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-colors"
            >
              <Info className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-sm">من نحن</span>
            </button>
          </nav>
        </div>

        <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-800">
          جميع الحقوق محفوظة © {new Date().getFullYear()}
        </div>
      </aside>

      {/* نافذة "من نحن" المنبثقة */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 animate-fade-in" dir="rtl">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Info className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">من نحن</h3>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              نحن إدارة تطبيق فانتوم: المالك الرسمي هو <span className="text-amber-400 font-bold">أحمد</span>. مطور في مجال الذكاء الاصطناعي وبرمجة المواقع والمتاجر ومدير مكافحة الأمن السيبراني. نهدف من خلال موقعنا التقدم في الابتكار والأمان والجودة لتلبية تطلعات عملائنا وتقديم حلول متقدمة في مجال التكنولوجيا.
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
