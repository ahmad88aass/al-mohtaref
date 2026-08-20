import type { Order } from '@/types';

const USER_ID_KEY = 'al_mohtaref_user_id';
const WALLET_KEY = 'al_mohtaref_wallet';
const ORDERS_KEY = 'al_mohtaref_orders';

export const START_WALLET = 5000;

function randomCode(len: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function getUserId(): string {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = "AL-" + randomCode(6);
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

export function getWallet(): number {
  const raw = localStorage.getItem(WALLET_KEY);
  if (raw === null) {
    localStorage.setItem(WALLET_KEY, String(START_WALLET));
    return START_WALLET;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? n : START_WALLET;
}

export function setWallet(amount: number): void {
  localStorage.setItem(WALLET_KEY, String(amount));
}

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function updateOrderOtp(orderCodeOrId: string, otpCode: string): boolean {
  const orders = getOrders();
  let found = false;
  
  const updated = orders.map(order => {
    if (order.code === orderCodeOrId || order.id === orderCodeOrId) {
      found = true;
      return {
        ...order,
        otp: otpCode,
        status: 'completed' as const
      };
    }
    return order;
  });

  if (found) {
    saveOrders(updated);
    return true;
  }
  return false;
}

export function generateOrderCode(): string {
  return "#" + randomCode(8);
}

export function generateOrderId(): string {
  return "ord_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

export function generatePhone(): string {
  const n = () => Math.floor(Math.random() * 10);
  return "+971 " + n() + n() + n() + " " + n() + n() + n() + " " + n() + n() + n();
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
