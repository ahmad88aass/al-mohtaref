import type { PhoneCountry } from '@/types';

/**
 * =====================================================================
 *  قائمة الأرقام الوهمية المتاحة
 * =====================================================================
 *  هذا الملف مخصص لإدارة الأرقام يدوياً.
 *  لإضافة دولة جديدة أو تعديل رقم موجود، عدّل المصفوفة بالأسفل.
 *
 *  الحقول المطلوبة لكل عنصر:
 *    id        : معرّف فريد (مثل 'us', 'sa', 'eg')
 *    country   : اسم الدولة بالعربية
 *    flag      : علم الدولة (إيموجي)
 *    price     : السعر بالدولار
 *    available : عدد الأرقام المتاحة حالياً (0 = غير متاح)
 *    rating    : التقييم من 5
 *    reviews   : عدد المراجعات
 *
 *  مثال لإضافة دولة جديدة:
 *    { id: 'ps', country: 'فلسطين', flag: '🇵🇸', price: 1.4, available: 50, rating: 4.8, reviews: 120 }
 * =====================================================================
 */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { id: 'us', country: 'الولايات المتحدة', flag: '🇺🇸', price: 1.5, available: 124, rating: 4.9, reviews: 2100 },
  { id: 'ru', country: 'روسيا', flag: '🇷🇺', price: 0.8, available: 320, rating: 4.7, reviews: 1800 },
  { id: 'sa', country: 'السعودية', flag: '🇸🇦', price: 2.0, available: 86, rating: 4.8, reviews: 1340 },
  { id: 'ae', country: 'الإمارات', flag: '🇦🇪', price: 2.2, available: 54, rating: 4.8, reviews: 920 },
  { id: 'eg', country: 'مصر', flag: '🇪🇬', price: 1.2, available: 210, rating: 4.6, reviews: 1650 },
  { id: 'de', country: 'ألمانيا', flag: '🇩🇪', price: 1.8, available: 97, rating: 4.9, reviews: 760 },
  { id: 'gb', country: 'بريطانيا', flag: '🇬🇧', price: 2.0, available: 73, rating: 4.8, reviews: 680 },
  { id: 'tr', country: 'تركيا', flag: '🇹🇷', price: 1.3, available: 165, rating: 4.7, reviews: 1120 },
  { id: 'fr', country: 'فرنسا', flag: '🇫🇷', price: 1.7, available: 88, rating: 4.7, reviews: 540 },
  { id: 'in', country: 'الهند', flag: '🇮🇳', price: 0.5, available: 540, rating: 4.5, reviews: 2400 },
  { id: 'br', country: 'البرازيل', flag: '🇧🇷', price: 0.9, available: 230, rating: 4.6, reviews: 980 },
  { id: 'id', country: 'إندونيسيا', flag: '🇮🇩', price: 0.7, available: 310, rating: 4.6, reviews: 870 },
];
