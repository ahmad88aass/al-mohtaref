#!/bin/bash
set -e
cat > src/components/PhonePurchaseModal.tsx << 'MODAL_EOF'
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Check, RefreshCw, AlertCircle, Copy } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { useStore } from '../store/StoreContext';
import { supabase } from '../supabaseClient';

interface PhonePurchaseModalProps {
  countryId: string | null;
  serviceCode: string;
  serviceLabel: string;
  onClose: () => void;
  onGoOrders?: () => void;
}

const COUNTRY_MAP: Record<string, string> = {
  sa: '0',
  ru: '0',
  us: '12',
  de: '43',
  default: '0',
};

const PHONE_PRICE = 2.50;
const POLL_INTERVAL_MS = 5000;

export const PhonePurchaseModal: React.FC<PhonePurchaseModalProps> = ({
  countryId,
  serviceCode,
  serviceLabel,
  onClose,
  onGoOrders
}) => {
  const { requireAuth } = useAuth();
  const [stage, setStage] = useState<'select' | 'processing' | 'waiting' | 'success' | 'error'>('select');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [activationId, setActivationId] = useState<string>('');
  const [smsCode, setSmsCode] = useState<string>('');

  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = () => {
    if (pollTimer.current) {
      clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  if (!countryId) return null;

  const resolvedCountry = COUNTRY_MAP[countryId.toLowerCase()]
    ? COUNTRY_MAP[countryId.toLowerCase()]
    : COUNTRY_MAP.default;

  const pollStatus = async (currentActivationId: string) => {
    const { data, error } = await supabase.functions.invoke('sms-man', {
      body: { action: 'checkStatus', activationId: currentActivationId },
    });

    if (error) {
      console.error('Poll error:', error);
      return;
    }

    if (data && data.status === 'completed' && data.code) {
      setSmsCode(data.code);
      setStage('success');
      stopPolling();
    } else if (data && data.status === 'cancelled') {
      setErrorMsg('تم إلغاء الطلب من المزود');
      setStage('error');
      stopPolling();
    }
  };

  const startPurchase = async () => {
    if (!requireAuth()) {
      return;
    }

    setErrorMsg('');
    setStage('processing');

    const { data, error } = await supabase.functions.invoke('sms-man', {
      body: {
        action: 'getNumber',
        service: serviceCode,
        country: resolvedCountry,
      },
    });

    if (error) {
      const serverMsg = error.message || (error as any).context?.body?.error;
      setErrorMsg(serverMsg || 'تعذر شراء الرقم من المزود، حاول مرة أخرى');
      setStage('error');
      return;
    }

    if (!data || data.error) {
      setErrorMsg((data && data.error) || 'تعذر شراء الرقم من المزود، حاول مرة أخرى');
      setStage('error');
      return;
    }

    if (!data.activation) {
      setErrorMsg('تعذر شراء الرقم من المزود، حاول مرة أخرى');
      setStage('error');
      return;
    }

    setPhoneNumber(data.activation.phone_number);
    setActivationId(data.activation.activation_id);
    setStage('waiting');

    pollTimer.current = setInterval(() => {
      pollStatus(data.activation.activation_id);
    }, POLL_INTERVAL_MS);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    stopPolling();
    setStage('select');
    setErrorMsg('');
    setPhoneNumber('');
    setActivationId('');
    setSmsCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white relative">
        <button onClick={handleClose} className="absolute top-4 left-4 text-slate-400 hover:text-white">✕</button>

        {stage === 'select' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center">Buy {serviceLabel} Number ({countryId.toUpperCase()})</h3>
            <p className="text-xs text-slate-400 text-center">Price: ${PHONE_PRICE.toFixed(2)}</p>
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs text-center flex items-center gap-2 justify-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

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
            <div className="flex items-center gap-2 text-blue-400 justify-center">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="font-bold text-lg">Waiting for SMS Code...</span>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center relative">
              <span className="text-slate-400 text-xs block mb-1">Your Number</span>
              <span className="text-xl font-mono font-bold text-blue-400">{phoneNumber}</span>
              <button onClick={() => copyToClipboard(phoneNumber)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center">This screen updates automatically every few seconds.</p>
            <button onClick={handleClose} className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition mt-2">Close</button>
          </div>
        )}

        {stage === 'success' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400 justify-center">
              <Check className="w-6 h-6" />
              <span className="font-bold text-lg">Code Received</span>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center relative">
              <span className="text-slate-400 text-xs block mb-1">SMS Code</span>
              <span className="text-2xl font-mono font-bold text-green-400">{smsCode}</span>
              <button onClick={() => copyToClipboard(smsCode)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-slate-400 text-xs block mb-1">Phone Number</span>
              <span className="font-mono text-blue-400">{phoneNumber}</span>
            </div>
            <button onClick={handleClose} className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition mt-2">Close</button>
          </div>
        )}

        {stage === 'error' && (
          <div className="space-y-4 text-center py-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
            <p className="text-red-400 font-bold">{errorMsg}</p>
            <button onClick={handleClose} className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition mt-2">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

MODAL_EOF
echo "PhonePurchaseModal.tsx updated successfully"
echo "|| count: $(grep -o '||' src/components/PhonePurchaseModal.tsx | wc -l)"
echo "lines: $(wc -l < src/components/PhonePurchaseModal.tsx)"
