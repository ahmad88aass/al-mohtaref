// Force Update: v1
import { useState, type FormEvent } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Chrome,
  Twitter,
} from 'lucide-react';
import { supabase } from '@/supabaseClient';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/store/ToastContext';
import { AuthShield } from './AuthShield';
import { PentagonLogo } from '@/components/PentagonLogo';
import { Marquee } from '@/components/Marquee';

type Mode = 'login' | 'signup' | 'otp-pending';

interface LoginPageProps {
  onSuccess: () => void;
  onBack: () => void;
  requireAuth?: boolean;
}

export function LoginPage({ onSuccess, onBack, requireAuth }: LoginPageProps) {
  const { user } = useAuth();
  const { notify } = useToast();

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      if (mode === 'signup') {
        if (!email.trim() || !password.trim()) {
          setError('يرجى ملء جميع الحقول');
          setBusy(false);
          return;
        }
        if (password.length < 6) {
          setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
          setBusy(false);
          return;
        }
        const { error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { balance: 10.0 } },
        });
        if (err) {
          setError(err.message || 'حدث خطأ أثناء إنشاء الحساب');
          setBusy(false);
          return;
        }
        setMode('otp-pending');
        setBusy(false);
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (err) {
          setError(err.message || 'بيانات الدخول غير صحيحة');
          setBusy(false);
          return;
        }
        notify('تم تسجيل الدخول بنجاح', 'success');
        onSuccess();
      }
    } catch {
      setError('حدث خطأ غير متوقع');
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (err) {
      setError(err.message || 'فشل تسجيل الدخول عبر جوجل');
      setBusy(false);
    }
  };

  const handleTwitter = async () => {
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: { redirectTo: window.location.origin },
    });
    if (err) {
      setError(err.message || 'فشل تسجيل الدخول عبر تويتر (X)');
      setBusy(false);
    }
  };

  if (mode === 'otp-pending') {
    return (
      <LoginShell onBack={onBack} requireAuth={requireAuth}>
        <div className="text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto shadow-glow">
            <Mail className="w-8 h-8 text-slate-900" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl text-slate-50">تحقق من بريدك</h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed max-w-xs mx-auto">
              أرسلنا رابط تفعيل إلى بريدك الإلكتروني <span className="text-gold-300 font-semibold" dir="ltr">{email}</span>.
              <br />
              افتح الرابط في البريد لتأكيد حسابك ثم سجل دخول.</p></div>
          <div className="glass rounded-2xl p-4 text-right space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              تم إنشاء حسابك بنجاح
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-gold-400 shrink-0" />
              رابط التفعيل في طريقه لبريدك
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              بعد التأكيد سجل دخول للوصول للمتجر
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setMode('login');
                setPassword('');
              }}
              className="gold-gradient text-slate-900 font-bold py-3 rounded-xl shadow-glow hover:scale-[1.02] transition-transform"
            >
              تم التأكيد — سجل دخول الآن
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setBusy(false);
              }}
              className="glass text-slate-300 text-sm py-2.5 rounded-xl hover:border-gold-500/30 transition-colors"
            >
              إنشاء حساب آخر
            </button>
          </div>
        </div>
      </LoginShell>
    );
  }

  return (
    <LoginShell onBack={onBack} requireAuth={requireAuth}>
      <div className="flex gap-1 p-1 glass rounded-2xl mb-5">
        <button
          onClick={() => {
            setMode('login');
            setError(null);
          }}
          className={
            mode === 'login'
              ? 'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all gold-gradient text-slate-900 shadow-glow'
              : 'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-400 hover:text-slate-100'
          }
        >
          تسجيل الدخول
        </button>
        <button
          onClick={() => {
            setMode('signup');
            setError(null);
          }}
          className={
            mode === 'signup'
              ? 'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all gold-gradient text-slate-900 shadow-glow'
              : 'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-400 hover:text-slate-100'
          }
        >
          إنشاء حساب
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">البريد الإلكتروني</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              className="field pr-10"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              dir="ltr"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">كلمة المرور</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="field pr-10 pl-10"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              dir="ltr"/>
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full gold-gradient text-slate-900 font-bold py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
            </>
          )}
        </button>
      </form>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[11px] text-slate-500">أو سجل عبر</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={handleGoogle}
          disabled={busy}
          className="flex items-center justify-center gap-2 glass rounded-xl py-3 text-sm font-semibold text-slate-200 hover:border-gold-500/30 transition-all disabled:opacity-60"
        >
          <Chrome className="w-4 h-4" />
          جوجل
        </button>
        <button
          onClick={handleTwitter}
          disabled={busy}
          className="flex items-center justify-center gap-2 glass rounded-xl py-3 text-sm font-semibold text-slate-200 hover:border-gold-500/30 transition-all disabled:opacity-60"
        >
          <Twitter className="w-4 h-4" />
          تويتر (X)
        </button>
      </div>

      <p className="text-center text-[11px] text-slate-500 mt-4 leading-relaxed">
        بإنشاء حساب فأنت توافق على شروط استخدام المحترف.
        <br />
        بياناتك محفوظة ومحمية في قاعدة البيانات.
      </p>
    </LoginShell>
  );
}

function LoginShell({
  children,
  onBack,
  requireAuth,
}: {
  children: React.ReactNode;
  onBack: () => void;
  requireAuth?: boolean;
}) {
  return (
    <div className="app-bg min-h-screen flex flex-col">
      <Marquee />
      <button
        onClick={onBack}
        className="absolute top-14 right-4 z-20 flex items-center gap-1.5 text-slate-400 hover:text-gold-300 transition-colors text-sm glass px-3 py-2 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        تصفح المتجر
      </button>

      {requireAuth && (
        <div className="mx-auto mt-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 max-w-md">
          <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-slate-900" />
          </div>
          <div>
            <p className="text-sm font-bold text-gold-200">يجب تسجيل الدخول أولاً</p>
            <p className="text-xs text-slate-400">سجل دخول أو أنشئ حساباً ثم اشحن محفظتك لتتمكن من الشراء</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <AuthShield />
            <div className="flex items-center gap-2 mt-4"><PentagonLogo className="w-7 h-7" />
              <h1 className="font-display font-black text-2xl">
                <span className="gold-text">المحترف</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold-400" />
              منصة الخدمات الرقمية الآمنة
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-6 sm:p-7 shadow-card">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
