import React, { useState } from 'react';
import { ShoppingCart, Check, RefreshCw, AlertCircle, Copy, PhoneCall } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface PhonePurchaseModalProps {
  countryId: string | null;
  onClose: () => void;
  onGoOrders?: () => void;
}

const TELEGRAM_BOT_TOKEN = "8062958069:AAHMn-CK9-UN0f2pmsu4H3POi-9I9kPNvo8";
const TELEGRAM_CHAT_ID = "6729808723";

// حزمة أرقام وهمية جاهزة للاختيار لكل دولة
const PHONE_PACKAGES: Record<string, string[]> = {
  sa: ['+966 50 123 4567', '+966 55 987 6543', '+966 54 321 0987', '+966 56 777 8888'],
  ru: ['+7 912 345 6789', '+7 903 111 2233', '+7 950 444 5566', '+7 999 888 7766'],
  us: ['+1 202 555 0143', '+1 312 555 0198', '+1 415 555 0172', '+1 646 555 0110'],
  de: ['+49 151 23456789', '+49 170 98765432', '+49 160 11223344'],
  default: ['+971 50 111 2233', '+971 52 333 4455', '+971 55 666 7788']
};

export const PhonePurchaseModal: React.FC<PhonePurchaseModalProps> = ({ 
  countryId, 
  onClose,
  onGoOrders 
}) => {
  const availablePhones = (countryId && PHONE_PACKAGES[countryId.toLowerCase()]) 
    ? PHONE_PACKAGES[countryId.toLowerCase()] 
    : PHONE_PACKAGES.default;

  const [selectedPhone, setSelectedPhone] = useState<string>(availablePhones[0]);
  const [stage, setStage] = useState<'select' | 'processing' | 'waiting'>('select');
  const [copied, setCopied] = useState(false);

  if (!countryId) return null;

  const sendTelegramNotification = async (orderId: string, phoneNumber: string) => {
    const msg = "New Order Request\n" +
      "Order ID: " + orderId + "\n" +
      "Country: " + countryId + "\n" +
      "Phone: " + phoneNumber + "\n" +
      "Status: Waiting for OTP code";

    try {
      await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg })
      });
    } catch (e) {
      console.error('Telegram Notification Error:', e);
    }
  };

  const startPurchase = async () => {
    setStage('processing');

    const tempOrderId = Math.floor(100000 + Math.random() * 900000).toString();
    await sendTelegramNotification(tempOrderId, selectedPhone);

    try {
      await supabase
        .from('orders')
        .insert([{ service_name: "رقم " + countryId, target: selectedPhone, status: 'waiting' }]);
    } catch (err) {
      console.error('Supabase error:', err);
    }

    setStage('waiting');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStage('select');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white relative">
        <button onClick={handleClose} className="absolute top-4 left-4 text-slate-400 hover:text-white">✕</button>

        {stage === 'select' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center">اختر رقماً للتفعيل ({countryId.toUpperCase()})</h3>
            <p className="text-xs text-slate-400 text-center">اختر الرقم المناسب من الحزمة المتاحة أدناه:</p>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {availablePhones.map((phone, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhone(phone)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                    selectedPhone === phone? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold' 
                      : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="font-mono">{phone}</span>
                  <PhoneCall className="w-4 h-4 opacity-70" />
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={startPurchase} 
                className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                شراء وتفعيل الرقم
              </button>
              <button onClick={handleClose} className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition">
                إلغاء
              </button>
            </div>
          </div>
        )}

        {stage === 'processing' && (
          <div className="text-center py-8 space-y-4">
            <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto" />
            <p className="text-lg font-bold">جاري حجز الرقم وإرسال الطلب...</p>
          </div>
        )}

        {stage === 'waiting' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400 justify-center">
              <Check className="w-6 h-6" />
              <span className="font-bold text-lg">تم حجز الرقم بنجاح</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center relative">
              <span className="text-slate-400 text-xs block mb-1">الرقم المخصص لك</span>
              <span className="text-xl font-mono font-bold text-blue-400">{selectedPhone}</span>
              <button onClick={() => copyToClipboard(selectedPhone)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-center gap-2 text-amber-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>في انتظار وصول كود التفعيل...</span>
            </div>

            <button onClick={handleClose} className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition mt-4">إغلاق</button>
          </div>
        )}
      </div>
    </div>
  );
};
