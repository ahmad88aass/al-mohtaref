import React, { useState, useEffect } from 'react';

interface HomePageProps {
  onNav?: (p: string) => void;
  onOpenService?: (id: string) => void;
  onBuyPhone?: (countryId: string, serviceCode?: string, serviceLabel?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNav, onOpenService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const bannerImages = [
    '/banners/banner1.jpg',
    '/banners/banner2.jpg',
  ];

  useEffect(() => {
    if (bannerImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
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
      id: 'telegram-prem',
      name: 'تفعيل اشتراك تليجرام بريميوم',
      image: '/categories/telegram-premium.jpg',
      description: 'اشتراك تيليجرام بريميوم رسمي وسريع.',
      action: () => {
        if (onOpenService) onOpenService('telegram-premium');
        else if (onNav) onNav('services');
      }
    },
    {
      id: 'proton-vpn-card',
      name: 'تفعيل اشتراك بروتون VPN',
      image: '/categories/proton-vpn.jpg',
      description: 'تفعيل اشتراك بروتون VPN بكامل المزايا والسرعة.',
      action: () => {
        if (onOpenService) onOpenService('proton-vpn-monthly');
        else if (onNav) onNav('services');
      }
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
      id: 'chat',
      name: 'شحن تطبيقات الدردشة',
      image: '/categories/chat.jpg',
      description: 'شحن جواهر وكوينز لجميع تطبيقات الدردشة والصوت.',
      action: () => navigateToTab('الخدمات الرقمية')
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
    {
      id: 'instagram',
      name: 'توثيق خدمات انستغرام',
      image: '/categories/instagram.jpg',
      description: 'توثيق الحساب بالعلامة الزرقاء رسمياً لمدة شهر.',
      action: () => {
        if (onOpenService) onOpenService('instagram-verification-monthly');
        else if (onNav) onNav('services');
      }
    },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d0714] text-white dir-rtl font-sans pb-16 overflow-x-hidden">
      
      {/* 1. البانر المتحرك */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"><div className="relative w-full aspect-[3/1] sm:aspect-[4/1] max-h-[250px] rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl bg-black/40">
          {bannerImages.map((src, index) => {
            const isCurrent = index === currentBannerIndex;
            return (
              <img
                key={index}
                src={src}
                alt="Phantom Banner"
                className={
                  isCurrent
                    ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100"
                    : "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0"
                }
              />
            );
          })}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {bannerImages.map((_, idx) => {
              const isCurrent = idx === currentBannerIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentBannerIndex(idx)}
                  className={
                    isCurrent
                      ? "h-2 w-8 bg-purple-400 rounded-full transition-all duration-300"
                      : "h-2 w-2 bg-white/40 rounded-full transition-all duration-300"
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. الشريط الإعلاني المتصل دائرياً بدون فراغات */}
      <div className="mt-4 border-y border-purple-500/20 py-2.5 overflow-hidden text-xs font-semibold text-purple-200/90 w-full relative flex backdrop-blur-sm select-none" dir="ltr">
        <div className="seamless-marquee">
          <div className="flex items-center gap-6 px-4 shrink-0">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">⚡️ أهلاً بكم في متجر فانتوم الرقمي</span>
            <span className="text-purple-400">✦</span>
            <span className="text-cyan-300 font-bold">💎 جميع الخدمات الرقمية في مكان واحد</span>
            <span className="text-purple-400">✦</span>
            <span className="text-yellow-400 font-extrabold">💲 الصرف الآن مقابل سوري: 136 / 138</span>
            <span className="text-purple-400">✦</span>
            <span className="text-emerald-400 font-mono font-bold dir-ltr">📞 رقم الإدارة: +963984335910</span>
            <span className="text-purple-400">✦</span>
          </div>

          <div className="flex items-center gap-6 px-4 shrink-0">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">⚡️ أهلاً بكم في متجر فانتوم الرقمي</span>
            <span className="text-purple-400">✦</span>
            <span className="text-cyan-300 font-bold">💎 جميع الخدمات الرقمية في مكان واحد</span>
            <span className="text-purple-400">✦</span>
            <span className="text-yellow-400 font-extrabold">💲 الصرف الآن مقابل سوري: 136 / 138</span>
            <span className="text-purple-400">✦</span>
            <span className="text-emerald-400 font-mono font-bold dir-ltr">📞 رقم الإدارة: +963984335910</span>
            <span className="text-purple-400">✦</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3. شريط البحث */}
        <div className="mt-6 max-w-md mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن خدمة، لعبة، أو بطاقة..."
            className="w-full bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition text-right"
          />
        </div>{/* 4. شبكة الخدمات والبطاقات */}
        <div className="mt-10 mb-12">
          <h2 className="text-xl font-bold text-purple-200 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
            الخدمات المتاحة
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={cat.action}
                className="cursor-pointer rounded-2xl overflow-hidden border border-purple-500/20 bg-purple-950/20 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="aspect-square relative overflow-hidden bg-purple-900/30">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center bg-purple-950/80 backdrop-blur-md border-t border-purple-500/20">
                  <p className="text-xs font-semibold text-purple-100 truncate">{cat.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
