import { ServiceItem } from '../types';

export const VPN_SERVICES: ServiceItem[] = [
  // 1. اشتراك بروتون VPN
  {
    id: 'proton-vpn-package',
    name: 'اشتراك Proton VPN',
    description: 'تفعيل رسمي باقات بروتون VPN خصوصية وأمان فائق وسرعة غير محدودة',
    price: 3,
    unit: 'من $3',
    icon: 'proton',
    inputLabel: 'ادخل رقمك للتواصل معك',
    inputPlaceholder: 'e.g. +9639xxxxxxxx أو 09xxxxxxxx',
    accent: 'from-purple-600/10 via-indigo-600/10 to-blue-500/10 border-purple-500/20',
    rating: 5.0,
    reviews: 410,
    tag: 'الأكثر طلباً',
    tiers: [
      { id: 'pv-1', name: 'اشتراك شهر Proton VPN', price: 3 },
      { id: 'pv-2', name: 'اشتراك شهر حساب خاص 6 أجهزة', price: 13 },
      { id: 'pv-3', name: 'اشتراك سنة Proton VPN', price: 34 },
    ],
  },

  // 2. اشتراك نورد VPN
  {
    id: 'nord-vpn-package',
    name: 'اشتراك NordVPN',
    description: 'اشتراك نورد في بي إن الأصلي سيرفرات عالمية فائقة السرعة مع حماية التشفير',
    price: 6,
    unit: 'من $6',
    icon: 'nordVpn',
    inputLabel: 'ادخل رقمك للتواصل معك',
    inputPlaceholder: 'e.g. +9639xxxxxxxx أو 09xxxxxxxx',
    accent: 'from-blue-600/10 via-sky-500/10 to-indigo-600/10 border-blue-500/20',
    rating: 5.0,
    reviews: 285,
    tag: 'رسمي وسريع',
    tiers: [
      { id: 'nv-1', name: 'نورد VPN اشتراك ثلاث شهور', price: 6 },
      { id: 'nv-2', name: 'نورد VPN اشتراك ستة شهور', price: 11 },
      { id: 'nv-3', name: 'نورد VPN اشتراك سنة كامله', price: 19 },
    ],
  },

  // 3. اشتراك إكسبرس VPN
  {
    id: 'express-vpn-package',
    name: 'اشتراك ExpressVPN',
    description: 'اشتراك إكسبرس في بي إن الأسرع عالمياً لفتح القيود وحماية تصفحك بكامل الثبات',
    price: 5,
    unit: 'من $5',
    icon: 'expressVpn',
    inputLabel: 'ادخل رقمك للتواصل معك',
    inputPlaceholder: 'e.g. +9639xxxxxxxx أو 09xxxxxxxx',
    accent: 'from-rose-600/10 via-red-500/10 to-amber-500/10 border-rose-500/20',
    rating: 4.9,
    reviews: 320,
    tag: 'أعلى سرعة',
    tiers: [
      { id: 'ev-1', name: 'اشتراك شهر ExpressVPN', price: 5 },
      { id: 'ev-2', name: 'اشتراك ستة شهور ExpressVPN', price: 19 },
      { id: 'ev-3', name: 'اشتراك سنة ExpressVPN', price: 31 },
    ],
  },
];
