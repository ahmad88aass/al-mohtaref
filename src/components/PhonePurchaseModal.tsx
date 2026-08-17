import { useState } from 'react';
import { X, Phone, Loader2, KeyRound, RefreshCw } from 'lucide-react';
import { PHONE_COUNTRIES } from '@/data/phoneNumbers';
import { useStore } from '@/store/StoreContext';
import { useToast } from '@/store/ToastContext';
import { generatePhone } from '@/lib/storage';

interface Props {
  countryId: string | null;
  onClose: () => void;
  onGoOrders: () => void;
}

export function PhonePurchaseModal({ countryId, onClose, onGoOrders }: Props) {
  const { purchase } = useStore();
  const { notify } = useToast();
  const country = PHONE_COUNTRIES.find((c) => c.id === countryId);
  const [stage, setStage] = useState<'confirm' | 'processing' | 'waiting'>('confirm');
  const [phone, setPhone] = useState("");

  if (!country) return null;

  const startPurchase = () => {
    setStage('processing');
    window.setTimeout(() => {
      const num = generatePhone();
      setPhone(num);
      purchase({
        type: 'phone',
        serviceName: "رقم " + country.country,
        target: num,
        price: country.price,
        country: country.country,
        flag: country.flag,
        phoneNumber: num,
      });
      setStage('waiting');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-strong rounded-3xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <h2 className="font-bold text-slate-50">تفعيل {country.country}</h2>
          <button onClick={onClose} className="text-slate-500"><X className="w-5 h-5" /></button>
        </div>

        {stage === 'confirm' && (
          <button onClick={startPurchase} className="w-full py-3 gold-gradient text-slate-900 font-bold rounded-xl">
            شراء وتفعيل
          </button>
        )}

        {stage === 'processing' && (
          <div className="text-center py-10"><Loader2 className="w-10 h-10 animate-spin text-gold-400 mx-auto" /></div>
        )}

        {stage === 'waiting' && (
          <div className="text-center space-y-4">
            <div className="p-4 bg-slate-800 rounded-xl">
               <p className="text-slate-400 text-sm">الرقم المخصص لك</p>
               <div className="text-2xl font-mono text-gold-300 my-2">{phone}</div>
            </div>
            <div className="flex items-center justify-center gap-2 text-amber-400">
               <KeyRound className="w-5 h-5" />
               <p>بانتظار وصول الكود...</p>
               <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
