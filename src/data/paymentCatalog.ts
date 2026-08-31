// src/data/paymentCatalog.ts
import { ServiceItem } from '../types';

export const PAYMENT_SERVICES: ServiceItem[] = [
  {
    id: 'electronic-digital-coins',
    name: 'عملات رقمية',
    description: 'شراء عملات رقمية (10 عملات مقابل 11 دولار) مع التواصل المباشر عبر رقم هاتفك',
    price: 11,
    icon: 'usdtCoin',
    inputLabel: 'أدخل رقمك للتواصل معك',
    inputPlaceholder: 'e.g. +9639xxxxxxxx',
    accent: 'from-emerald-500/10 via-cyan-500/10 to-slate-900/10 border-emerald-500/20',
    rating: 5.0,
    reviews: 412,
    tag: 'خدمة خاصة',
  },
];
