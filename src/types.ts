export type OrderStatus = 'قيد المعالجة' | 'مكتمل' | 'ملغي';

export type OrderType = 'phone' | 'service';

export interface Order {
  id: string;
  code: string;
  type: OrderType;
  serviceName: string;
  target: string;
  price: number;
  status: OrderStatus;
  createdAt: number;
  country?: string;
  flag?: string;
  phoneNumber?: string;
  otp?: string;
  quantity?: number;
}

/** Identifies which custom icon component to render for a service. */
export type ServiceIconKey =
  | 'instagramGrow'
  | 'telegramPremium'
  | 'instagramUnlock'
  | 'instagram'
  | 'yahla'
  | 'yoho'
  | 'yaahlan'
  | 'halami'
  | 'ahlan'
  | 'karnilive'
  | 'yoyolive'
  | 'hiyjalive'
  | 'pubgUc'
  | 'tiktokGrow'
  | 'usdtCoin';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
  icon: ServiceIconKey;
  inputLabel: string;
  inputPlaceholder: string;
  hasQuantity?: boolean;
  quantityLabel?: string;
  unitPrice?: number;
  unitAmount?: number;
  accent: string;
  rating: number;
  reviews: number;
  tag?: string;
}

export interface PhoneCountry {
  id: string;
  country: string;
  flag: string;
  price: number;
  available: number;
  rating: number;
  reviews: number;
}
