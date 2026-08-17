import { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, Send, X, MessageCircle, Bot, User } from 'lucide-react';
import { KNOWLEDGE } from '@/data/knowledge';

interface Msg {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

const QUICK_QS = [
  'كيف أستخدم الموقع؟',
  'كيف أشحن محفظتي؟',
  'كيف أشتري رقماً وهمياً؟',
  'كيف أشحن شدات ببجي؟',
  'كيف أتواصل مع الدعم؟',
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[إأآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findAnswer(query: string): string {
  const q = normalize(query);
  if (!q) return 'اكتب سؤالك وسأساعدك!';

  let best: { id: string; score: number } | null = null;
  for (const chunk of KNOWLEDGE) {
    let score = 0;
    for (const kw of chunk.keywords) {
      const nkw = normalize(kw);
      if (q.includes(nkw)) score += nkw.length > 2 ? 3 : 1;
    }
    // word-level overlap
    const qWords = new Set(q.split(' ').filter((w) => w.length > 1));
    const aText = normalize(chunk.question + ' ' + chunk.answer);
    for (const w of qWords) {
      if (aText.includes(w)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { id: chunk.id, score };
    }
  }

  if (!best) {
    return 'لم أجد إجابة دقيقة لسؤالك. يمكنك:\n• تصفح الخدمات من القائمة\n• التواصل مع الدعم عبر تيليجرام @a_a_88as أو واتساب +963984335910';
  }
  return KNOWLEDGE.find((c) => c.id === best!.id)!.answer;
}

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 'intro',
      role: 'bot',
      text: 'مرحباً! أنا مساعدك الذكي في «المحترف». اسألني عن أي خدمة، الشحن، أو كيفية استخدام الموقع.',
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, msgs, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: `u_${Date.now()}`, role: 'user', text: trimmed };
    setMsgs((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      const reply = findAnswer(trimmed);
      setMsgs((prev) => [...prev, { id: `b_${Date.now()}`, role: 'bot', text: reply }]);
      setTyping(false);
    }, 650 + Math.random() * 400);
  };

  const buttonLabel = useMemo(
    () => (open ? 'إغلاق المساعد' : 'مساعد ذكي'),
    [open]
  );

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={buttonLabel}
          className="fixed bottom-20 md:bottom-6 left-4 z-50 group"
        >
          <span className="absolute inset-0 rounded-2xl gold-gradient opacity-60 animate-pulse-ring" />
          <span className="relative flex items-center gap-2 gold-gradient text-slate-900 font-bold px-4 py-3 rounded-2xl shadow-glow-lg group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">مساعد ذكي</span>
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 md:bottom-6 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm animate-scale-in">
          <div className="glass-strong rounded-3xl overflow-hidden shadow-card flex flex-col max-h-[70vh]">
            {/* Header */}
            <div className="gold-gradient px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">المساعد الذكي</div>
                  <div className="text-[10px] text-slate-800/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    متصل الآن
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

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px]">
              {msgs.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 animate-fade-in ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      m.role === 'bot'
                        ? 'gold-gradient text-slate-900'
                        : 'glass text-slate-300'
                    }`}
                  >
                    {m.role === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === 'bot'
                        ? 'glass text-slate-200 rounded-tr-sm'
                        : 'gold-gradient text-slate-900 font-medium rounded-tl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2 animate-fade-in">
                  <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                  <div className="glass rounded-2xl rounded-tr-sm px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            {msgs.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {QUICK_QS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[11px] glass px-2.5 py-1.5 rounded-full text-slate-300 hover:border-gold-500/40 hover:text-gold-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/5 flex items-center gap-2">
              <input
                className="flex-1 glass rounded-xl px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-gold-500/40 transition-colors"
                placeholder="اكتب سؤالك..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send(input);
                }}
              />
              <button
                onClick={() => send(input)}
                className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-slate-900 shadow-glow hover:scale-105 transition-transform shrink-0"
                aria-label="إرسال"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
