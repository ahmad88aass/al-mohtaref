import { useState } from 'react';
import { Landmark, Upload, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { sendPaymentNotification } from '@/lib/sendPaymentNotification';

const BINANCE_ID = '1124577341';
const SHAMCASH_CODE = 'acaf0bc3dbb14343c3502bdbb345c90d';
const MIN_AMOUNT = 10;

type Method = 'binance' | 'shamcash';

function buildQrUrl(data: string) {
  return 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(data);
}

export function AlternativePaymentMethods() {
  const { publicId } = useStore();
  const [selectedMethod, setSelectedMethod] = useState<Method>('binance');
  const [amount, setAmount] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultSuccess, setResultSuccess] = useState(false);

  const currentValue = selectedMethod === 'binance' ? BINANCE_ID : SHAMCASH_CODE;
  const currentLabel = selectedMethod === 'binance' ? 'Binance ID' : 'رمز حساب Shamcash';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = function () {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setResultMessage(null);

    const numericAmount = parseFloat(amount);
    const isAmountValid = !isNaN(numericAmount) && numericAmount >= MIN_AMOUNT;
    if (!isAmountValid) {
      setResultSuccess(false);
      setResultMessage('الحد الأدنى للشحن هو ' + MIN_AMOUNT + ' دولار');
      return;
    }

    if (!imageFile) {
      setResultSuccess(false);
      setResultMessage('يرجى إرفاق صورة إشعار الدفع');
      return;
    }

    setLoading(true);
    const methodLabel = selectedMethod === 'binance' ? 'بينانس' : 'شام كاش';
    const result = await sendPaymentNotification({
      method: methodLabel,
      amount: amount,
      publicId: publicId || '—',
      imageFile: imageFile,
    });
    setLoading(false);

    setResultSuccess(result.success);
    setResultMessage(result.message);

    if (result.success) {
      setAmount('');
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shadow-glow">
          <Landmark className="w-5 h-5 text-slate-900" />
        </div>
        <div>
          <h3 className="font-display font-extrabold text-lg text-slate-50">طرق دفع أخرى</h3>
          <p className="text-xs text-slate-400">شحن فوري عبر بينانس أو شام كاش</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelectedMethod('binance')}
          className={
            'rounded-2xl py-3.5 font-bold transition-all border ' +
            (selectedMethod === 'binance'
              ? 'gold-gradient text-slate-900 border-transparent shadow-glow'
              : 'glass text-slate-300 border-white/10 hover:border-gold-500/30')
          }
        >
          Binance
        </button>
        <button
          onClick={() => setSelectedMethod('shamcash')}
          className={
            'rounded-2xl py-3.5 font-bold transition-all border ' +
            (selectedMethod === 'shamcash'
              ? 'gold-gradient text-slate-900 border-transparent shadow-glow'
              : 'glass text-slate-300 border-white/10 hover:border-gold-500/30')
          }
        >
          Shamcash
        </button>
      </div><div className="glass rounded-2xl p-5 flex flex-col items-center gap-4">
        <img
          src={buildQrUrl(currentValue)}
          alt="QR Code"
          className="w-40 h-40 rounded-xl bg-white p-2"
        />
        <div className="text-center w-full">
          <p className="text-xs text-slate-400 mb-1">{currentLabel}</p>
          <p className="font-mono font-bold text-slate-100 break-all">{currentValue}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-slate-400 mb-1.5 block">المبلغ بالدولار (الحد الأدنى {MIN_AMOUNT}$)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="مثال: 20"
            className="w-full glass rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none focus:border-gold-500/40 border border-white/10"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1.5 block">إرفاق صورة إشعار الدفع</label>
          <label className="flex items-center justify-center gap-2 glass rounded-xl px-4 py-3.5 cursor-pointer border border-dashed border-white/15 hover:border-gold-500/40 transition-colors">
            <Upload className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-slate-300">
              {imageFile ? imageFile.name : 'اضغط لاختيار صورة'}
            </span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
          {imagePreview && (
            <img src={imagePreview} alt="معاينة" className="mt-3 rounded-xl max-h-40 mx-auto" />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full gold-gradient text-slate-900 font-bold py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          {loading ? 'جاري الإرسال...' : 'إرسال طلب الشحن'}
        </button>

        {resultMessage && (
          <div
            className={
              'rounded-xl p-3 text-sm flex items-center gap-2 ' +
              (resultSuccess ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400')
            }
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {resultMessage}
          </div>
        )}
      </div>
    </div>
  );
}
