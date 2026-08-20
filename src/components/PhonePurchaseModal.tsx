import React, { useState } from 'react';
import { ShoppingCart, Check, RefreshCw, AlertCircle, Copy, PhoneCall, Send } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { useStore } from '../store/StoreContext';

interface PhonePurchaseModalProps {
  countryId: string | null;
  onClose: () => void;
  onGoOrders?: () => void;
}

const TELEGRAM_BOT_TOKEN = "8062958069:AAHMn-CK9-UN0f2pmsu4H3POi-9I9kPNvo8";
const TELEGRAM_CHAT_ID = "6729808723"; 
const OTP_BOT_USERNAME = "Ahmad_OTP_vip_bot";

const PHONE_PACKAGES: Record<string, string[]> = {
  sa: ['+966 50 123 4567', '+966 55 987 6543', '+966 54 321 0987', '+966 56 777 8888'],
  ru: ['+7 912 345 6789', '+7 903 111 2233', '+7 950 444 5566', '+7 999 888 7766'],
  us: ['+1 202 555 0143', '+1 312 555 0198', '+1 415 555 0172', '+1 646 555 0110'],
  de: ['+49 151 23456789', '+49 170 98765432', '+49 160 11223344'],
  default: ['+971 50 111 2233', '+971 52 333 4455', '+971 55 666 7788']
};

const PHONE_PRICE = 2.50;

export const PhonePurchaseModal: React.FC<PhonePurchaseModalProps> = ({ 
  countryId, 
  onClose,
  onGoOrders 
}) => {
  const { requireAuth } = useAuth();
  const { purchase } = useStore();

  const availablePhones = (countryId && PHONE_PACKAGES[countryId.toLowerCase()]) 
    ? PHONE_PACKAGES[countryId.toLowerCase()] 
    : PHONE_PACKAGES.default;

  const [selectedPhone, setSelectedPhone] = useState<string>(availablePhones[0]);
  const [stage, setStage] = useState<'select' | 'processing' | 'waiting'>('select');
  const [copied, setCopied] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!countryId) return null;

  const startPurchase = async () => {
    if (!requireAuth()) {
      return;
    }

    setErrorMsg('');
    setStage('processing');

    const result = await purchase({
      type: 'phone',
      serviceName: 'Phone ' + countryId,
      target: selectedPhone,
      price: PHONE_PRICE,
      country: countryId,
      phoneNumber: selectedPhone,
    });

    if (!result.ok) {
      setErrorMsg(result.error || 'فشلت عملية الشراء');
      setStage('select');
      return;
    }

    const tempOrderId = result.order?.id || Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOrderId(tempOrderId);

    try {
      const msg = "📦 New Phone Order\n🆔 ID: " + tempOrderId + "\n🌍 Country: " + countryId + "\n📱 Phone: " + selectedPhone;
      await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg })
      });
    } catch (e) {
      console.error('Telegram error:', e);
    }

    setTimeout(() => {
      setStage('waiting');
    }, 500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStage('select');
    setErrorMsg('');
    onClose();
  };

  const telegramTLink = "https://t.me/" + OTP_BOT_USERNAME + "?text=" + encodeURIComponent("Order ID: " + currentOrderId + "\nPhone: " + selectedPhone);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white relative">
        <button onClick={handleClose} className="absolute top-4 left-4 text-slate-400 hover:text-white">✕</button>

        {stage === 'select' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center">Select Phone Number ({countryId.toUpperCase()})</h3>
            <p className="text-xs text-slate-400 text-center">Choose a number from the list below — ${PHONE_PRICE.toFixed(2)}</p>{errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs text-center flex items-center gap-2 justify-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {availablePhones.map((phone, idx) => {
                const isSelected = selectedPhone === phone;
                const phoneClass = isSelected 
                  ? "p-3 rounded-xl border cursor-pointer flex items-center justify-between transition bg-blue-600/20 border-blue-500 text-blue-400 font-bold"
                  : "p-3 rounded-xl border cursor-pointer flex items-center justify-between transition bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500";
                
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhone(phone)}
                    className={phoneClass}
                  >
                    <span className="font-mono">{phone}</span>
                    <PhoneCall className="w-4 h-4 opacity-70" />
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={startPurchase} 
                className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy & Activate
              </button>
              <button onClick={handleClose} className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition">
                Cancel
              </button>
            </div>
          </div>
        )}

        {stage === 'processing' && (
          <div className="text-center py-8 space-y-4">
            <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto" />
            <p className="text-lg font-bold">Processing order...</p>
          </div>
        )}

        {stage === 'waiting' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400 justify-center">
              <Check className="w-6 h-6" />
              <span className="font-bold text-lg">Order Reserved Successfully</span>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center relative">
              <span className="text-slate-400 text-xs block mb-1">Your Number (Order ID: {currentOrderId})</span>
              <span className="text-xl font-mono font-bold text-blue-400">{selectedPhone}</span>
              <button onClick={() => copyToClipboard(selectedPhone)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a 
              href={telegramTLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-sky-600 hover:bg-sky-500 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-white shadow-lg"
            >
              <Send className="w-5 h-5" />
              Get OTP Code via Telegram Bot
            </a>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-center gap-2 text-amber-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Click the button above to send the order details to the bot instantly.</span>
            </div>

            <button onClick={handleClose} className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition mt-2">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};
