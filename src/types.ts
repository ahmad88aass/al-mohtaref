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

export interface ServiceTier {
  id: string;
  name: string;
  price: number;
  providerSubId?: number;
}

/** Identifies which custom icon component to render for a service. */
export type ServiceIconKey =
  | 'gemini'
  | 'proton'
  | 'instagramGrow'
  | 'telegramPremium'
  | 'instagramUnlock'
  | 'instagram'
  | 'bigo'
  | 'sugo'
  | 'yaahlan'
  | 'ahlan'
  | 'karnilive'
  | 'yoyolive'
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
  outOfStock?: boolean;
  tiers?: ServiceTier[];
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
