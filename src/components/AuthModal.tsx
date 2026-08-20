import React, { useState } from 'react';
import { Shield, Plane, Mail, Lock, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../store/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const resetAndClose = () => {
    setStep('form');
    setEmail('');
    setPassword('');
    setOtpCode('');
    setErrorMsg('');
    closeAuthModal();
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { balance: 10.0 }
          }
        });
        if (error) throw error;
        setStep('verify');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ ما، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'signup'
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || 'كود التحقق غير صحيح أو انتهت صلاحيته.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || 'فشل تسجيل الدخول عبر منصة التواصل');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-8 text-white relative shadow-2xl overflow-hidden">

        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <button onClick={resetAndClose} className="absolute top-5 left-5 text-slate-400 hover:text-white transition">✕</button>

        <div className="flex flex-col items-center justify-center mb-6 pt-2">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-2xl animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center transform hover:scale-105 transition">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 bg-sky-400 p-1.5 rounded-full shadow-md animate-bounce">
              <Plane className="w-4 h-4 text-slate-950 transform rotate-45" /></div>
          </div>
          <h2 className="text-2xl font-black mt-4 tracking-wide bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">يجب عليك تسجيل الدخول لكي تتمكن من استخدام الموقع وإتمام الشراء</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs mb-4 text-center">
            {errorMsg}
          </div>
        )}

        {step === 'form' ? (
          <form onSubmit={handleAuth} className="space-y-4">

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>{isSignUp ? 'إنشاء الحساب وإرسال كود التأكيد' : 'دخول إلى الحساب'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-xs">أو الدخول عبر منصات أخرى</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition text-slate-200"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition text-slate-200"
              >
                Facebook
              </button>
            </div><div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-blue-400 hover:underline"
              >
                {isSignUp ? 'لديك حساب بالفعل؟ سجل دخولك الآن' : 'ليس لديك حساب؟ أنشئ حساباً جديداً'}
              </button>
            </div>

          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl text-xs text-blue-300">
              تم إرسال كود التحقق إلى بريدك الإلكتروني. يرجى إدخاله أدناه لتفعيل الحساب.
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">كود التحقق (OTP)</label>
              <input
                type="text"
                required
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-center tracking-widest text-lg font-mono text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>تأكيد الحساب والدخول</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="text-xs text-slate-400 hover:underline"
              >
                العودة للخلف
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
