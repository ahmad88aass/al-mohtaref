import { ServiceItem } from '../types';

export const PREMIUM_SERVICES: ServiceItem[] = [
  // 1. نجوم تليجرام (غير متوفر بقصاصة حمراء)
  {
    id: 'telegram-stars',
    name: 'شحن نجوم تليجرام (Telegram Stars)',
    description: 'شحن رصيد نجوم تيليجرام لدعم القنوات واستخدام البوتات الرسمية',
    price: 5,
    unit: 'من $1.50',
    icon: 'telegramStarsIcon',
    inputLabel: 'ادخل يوزر حسابك (@username)',
    inputPlaceholder: 'e.g. @your_username',
    accent: 'from-amber-500/10 via-yellow-600/10 to-orange-500/10 border-amber-500/20',
    rating: 5.0,
    reviews: 140,
    tag: 'غير متوفر',
    tiers: [
      { id: 'ts-1', name: '50 نجمة', price: 1.50 },
      { id: 'ts-2', name: '100 نجمة', price: 2.80 },
      { id: 'ts-3', name: '250 نجمة', price: 6.50 },
      { id: 'ts-4', name: '500 نجمة', price: 12.00 },
      { id: 'ts-5', name: '1000 نجمة', price: 23.50 },
    ],
  },

  // 2. اشتراك تليجرام بريميوم (3 شهور بـ 2$ وسنة بـ 37$)
  {
    id: 'telegram-premium',
    name: 'اشتراك تليجرام بريميوم (Telegram Premium)',
    description: 'تفعيل اشتراك تيليجرام بريميوم رسمي وسريع على يوزرك مباشرة مع شارة النجمة',
    price: 2,
    unit: 'من $2',
    icon: 'telegramPremium',
    inputLabel: 'ادخل يوزر حسابك (@username)',
    inputPlaceholder: 'e.g. @your_username',
    accent: 'from-sky-500/10 via-blue-600/10 to-indigo-600/10 border-sky-500/20',
    rating: 5.0,
    reviews: 630,
    tag: 'الأكثر طلباً',
    tiers: [
      { id: 'tp-3m', name: 'اشتراك 3 شهور بريميوم', price: 25 },
      { id: 'tp-1y', name: 'اشتراك سنة كاملة بريميوم', price: 37 },
    ],
  },

  // 3. توثيق حسابات انستغرام (شهر بـ 15$ - غير متوفر بقصاصة حمراء)
  {
    id: 'instagram-meta-verified',
    name: 'توثيق حسابات انستغرام (Meta Verified)',
    description: 'توثيق حساب انستغرام بالشارة الزرقاء الرسمية وحماية الحساب المتقدمة',
    price: 15,
    unit: '$15 شهرياً',
    icon: 'instagramVerifyIcon',
    inputLabel: 'ادخل يوزر حسابك (@username)',
    inputPlaceholder: 'e.g. @your_username',
    accent: 'from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-blue-500/20',
    rating: 5.0,
    reviews: 215,
    tag: 'غير متوفر',
    tiers: [
      { id: 'ig-verify-1m', name: 'توثيق انستغرام شهر كامل', price: 15 },
    ],
  },
];
