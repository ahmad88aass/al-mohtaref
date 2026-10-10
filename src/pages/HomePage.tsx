import React, { useState, useEffect } from 'react';

interface HomePageProps {
  onNav?: (p: string) => void;
  onOpenService?: (id: string) => void;
  onBuyPhone?: (countryId: string, serviceCode?: string, serviceLabel?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNav, onOpenService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerImages = [
    '/banners/banner1.jpg',
    '/banners/banner2.jpg',
  ];

  useEffect(() => {
    if (bannerImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const navigateToTab = (tabName: string) => {
    if (onNav) onNav('services');
    setTimeout(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const targetBtn = buttons.find((btn) => btn.textContent?.includes(tabName));
      if (targetBtn) {
        (targetBtn as HTMLButtonElement).click();
      }
    }, 100);
  };

  const categories = [
    {
      id: 'premium-section',
      name: 'البريميوم والتوثيق',
      image: '/categories/premium-main.jpg',
      description: 'اشتراكات تليجرام بريميوم، نجوم تليجرام، وتوثيق حسابات انستغرام رسمياً.',
      action: () => navigateToTab('البريميوم والتوثيق')
    },
    {
      id: 'vpn-section',
      name: 'البروكسي vbn بريميوم',
      image: '/categories/vpn-main.jpg',
      description: 'اشتراكات رسمية Proton VPN و NordVPN و ExpressVPN بحماية قصوى.',
      action: () => navigateToTab('البروكسي و VPN')
    },
    {
      id: 'live-section',
      name: 'قسم تطبيقات البث المباشر',
      image: '/categories/live-main.jpg',
      description: 'شحن بيجو لايف، سوجو، أهلاً، ميكو، شاميت، تاكا وغيرها الكثير.',
      action: () => navigateToTab('تطبيقات البث المباشر')
    },
    {
      id: 'social-section',
      name: 'قسم السوشيال ميديا والرشق',
      image: '/categories/social-main.jpg',
      description: 'رشق متابعين ولايكات ومشاهدات لواتساب، انستغرام، وتيك توك.',
      action: () => navigateToTab('السوشيال ميديا والرشق')
    },
    {
      id: 'software-section',
      name: 'قسم السوفت وير والأدوات',
      image: '/categories/unlock-tool.jpg',
      description: 'اشتراكات سنوية لأدوات Unlock Tool و Oxygen و SamFw.',
      action: () => navigateToTab('قسم السوفت وير')
    },
    {
      id: 'pubg',
      name: 'شحن ببجي موبايل',
      image: '/categories/pubg.jpg',
      description: 'شحن شدات ببجي (UC) بأسعار منافسة وتسليم فوري.',
      action: () => {
        if (onOpenService) onOpenService('pubg-uc');
        else if (onNav) onNav('services');
      }
    },
    {
      id: 'numbers',
      name: 'تفعيل أرقام واتساب وتليجرام',
      image: '/categories/numbers.jpg',
      description: 'أرقام وهمية وخاصة لتفعيل الحسابات بسهولة وأمان.',
      action: () => navigateToTab('الأرقام الوهمية')
    },
    {
      id: 'crypto',
      name: 'شحن عملات رقمية',
      image: '/categories/crypto.jpg',
      description: 'شحن USDT وباقي العملات الرقمية عبر شبكات مختلفة.',
      action: () => navigateToTab('الدفع الإلكتروني')
    },
    {
      id: 'gemini-card',
      name: 'اشتراك جمناي سنة ونصف',
      image: '/categories/gemini.jpg',
      description: 'تفعيل اشتراك Gemini بكامل المزايا لمدة سنة ونصف.',
      action: () => {
        if (onOpenService) onOpenService('gemini-subscription');
        else if (onNav) onNav('services');
      }
    },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bannerTransformStyle = {
    transform: 'translateX(' + (currentIndex * 100) + '%)'
  };

  return (
    <div className="min-h-screen bg-[#090511] text-white dir-rtl font-sans pb-16 overflow-x-hidden">{/* 1. البانر السلس */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="relative w-full aspect-[2.6/1] sm:aspect-[3.5/1] max-h-[260px] rounded-2xl overflow-hidden banner-card border border-purple-500/20 bg-black/40">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={bannerTransformStyle}
          >
            {bannerImages.map((src, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={src}
                  alt={'Phantom Banner ' + (idx + 1)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2 py-1 rounded-full bg-black/30 backdrop-blur-md">
            {bannerImages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={
                  currentIndex === dotIdx
                    ? 'w-6 h-1.5 bg-gradient-to-r from-purple-400 to-amber-300 rounded-full transition-all duration-300 shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-all duration-300'
                }
                aria-label={'Go to slide ' + (dotIdx + 1)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. شريط متحرك إعلاني */}
      <div className="mt-4 border-y border-purple-500/20 bg-purple-950/20 py-2.5 overflow-hidden text-xs font-medium text-purple-100 backdrop-blur-md">
        <div className="seamless-marquee-container" dir="ltr">
          <div className="seamless-marquee-track">
            <div className="flex items-center gap-6 px-4 shrink-0 text-xs sm:text-sm font-semibold">
              <span className="text-amber-300 flex items-center gap-1.5">⚡️ أهلاً بك في متجر فانتوم نقدم لك جميع الخدمات في موقعنا بسرعة وأمان</span>
              <span className="text-purple-400">✦</span>
              <span className="text-cyan-300">💎 تفعيل رسمي وتسليم فوري ومباشر على مدار الساعة</span>
              <span className="text-purple-400">✦</span>
              <span className="text-yellow-400 font-bold">💲 أسعار الصرف الحية: 136 / 138 سوري</span>
              <span className="text-purple-400">✦</span>
              <span className="text-emerald-400 font-mono font-bold dir-ltr">📞 خدمة الدعم: +963984335910</span>
              <span className="text-purple-400">✦</span>
            </div>

            <div className="flex items-center gap-6 px-4 shrink-0 text-xs sm:text-sm font-semibold">
              <span className="text-amber-300 flex items-center gap-1.5">⚡️ أهلاً بك في متجر فانتوم نقدم لك جميع الخدمات في موقعنا بسرعة وأمان</span>
              <span className="text-purple-400">✦</span>
              <span className="text-cyan-300">💎 تفعيل رسمي وتسليم فوري ومباشر على مدار الساعة</span>
              <span className="text-purple-400">✦</span>
              <span className="text-yellow-400 font-bold">💲 أسعار الصرف الحية: 136 / 138 سوري</span>
              <span className="text-purple-400">✦</span>
              <span className="text-emerald-400 font-mono font-bold dir-ltr">📞 خدمة الدعم: +963984335910</span>
              <span className="text-purple-400">✦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3. شريط البحث */}
        <div className="mt-5 max-w-lg mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}placeholder="بحث عن منتج، بطاقة، أو خدمة..."
            className="w-full bg-[#150d24]/90 border border-purple-500/25 rounded-2xl px-5 py-3 text-sm text-purple-100 placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition text-right shadow-inner"
          />
        </div>

        {/* 4. شبكة البطاقات */}
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-gradient-to-b from-purple-500 to-amber-400 rounded-full inline-block"></span>
              الأقسام والخدمات المميزة
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={cat.action}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-purple-500/20 bg-[#120a1f]/80 hover:border-purple-400/60 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-purple-950/40">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-3 text-center bg-[#170e29] border-t border-purple-500/15 flex-1 flex items-center justify-center">
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-1">{cat.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
