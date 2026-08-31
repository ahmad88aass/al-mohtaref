// src/data/socialCatalog.ts
import { ServiceItem } from '../types';

export const SOCIAL_SERVICES: ServiceItem[] = [
  {
    id: 'social-ig-real-3000',
    name: 'رشق متابعين انستغرام حقيقي',
    description: '3000 متابع انستغرام حقيقي لتعزيز وتنمية حسابك الشخصي أو التجاري',
    price: 8,
    icon: 'instagramGrow',
    inputLabel: 'يوزر الحساب',
    inputPlaceholder: 'e.g. username',
    accent: 'from-pink-500/10 via-purple-500/10 to-indigo-500/10 border-pink-500/20',
    rating: 4.9,
    reviews: 342,
    tag: 'الأكثر طلباً',
  },
  {
    id: 'social-ig-unstable-3000',
    name: 'رشق متابعين غير ثابت',
    description: '3000 متابع انستغرام غير ثابت بسعر اقتصادي ومناسب للجميع',
    price: 6,
    icon: 'instagram',
    inputLabel: 'يوزر الحساب',
    inputPlaceholder: 'e.g. username',
    accent: 'from-purple-500/10 via-slate-800/20 to-slate-900/10 border-purple-500/20',
    rating: 4.7,
    reviews: 180,
  },
  {
    id: 'social-tiktok-3000',
    name: 'تزويد متابعين تيك توك',
    description: '3000 متابع تيك توك لزيادة تفاعل حسابك ونشر محتواك',
    price: 8,
    icon: 'tiktokGrow',
    inputLabel: 'يوزر الحساب',
    inputPlaceholder: 'e.g. username',
    accent: 'from-cyan-500/10 via-rose-500/10 to-slate-900/10 border-cyan-500/20',
    rating: 4.9,
    reviews: 215,
    tag: 'الأكثر مبيعاً',
  },
];
