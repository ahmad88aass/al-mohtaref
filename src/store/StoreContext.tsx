import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Order } from '@/types';
import {
  getOrders,
  getUserId,
  getWallet,
  saveOrders,
  setWallet as persistWallet,
} from '@/lib/storage';
import { notifyOrder as tgNotifyOrder, notifyRecharge as tgNotifyRecharge } from '@/lib/telegram';

interface PurchaseInput {
  type: Order['type'];
  serviceName: string;
  target: string;
  price: number;
  country?: string;
  flag?: string;
  phoneNumber?: string;
  quantity?: number;
}

interface StoreContextValue {
  userId: string;
  wallet: number;
  orders: Order[];
  purchase: (input: PurchaseInput) => { ok: boolean; order?: Order; error?: string };
  addRecharge: (amount: number, method: string) => void;
  refreshOrders: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [userId] = useState<string>(() => getUserId());
  const [wallet, setWalletState] = useState<number>(() => getWallet());
  const [orders, setOrders] = useState<Order[]>(() => getOrders());

  const refreshOrders = useCallback(() => {
    setOrders(getOrders());
  }, []);

  const persist = useCallback((next: Order[]) => {
    setOrders(next);
    saveOrders(next);
  }, []);

  const purchase = useCallback(
    (input: PurchaseInput): { ok: boolean; order?: Order; error?: string } => {
      if (input.price <= 0) return { ok: false, error: 'السعر غير صالح' };
      setWalletState((prev) => {
        if (prev < input.price) return prev;
        const next = Math.round((prev - input.price) * 100) / 100;
        persistWallet(next);
        return next;
      });
      // Re-check after state update is async; use current wallet snapshot from storage.
      const current = getWallet();
      if (current < input.price) {
        return { ok: false, error: 'الرصيد غير كافٍ. يرجى شحن المحفظة.' };
      }
      const finalWallet = Math.round((current - input.price) * 100) / 100;
      persistWallet(finalWallet);
      setWalletState(finalWallet);

      const now = Date.now();
      const order: Order = {
        id: `ord_${now}_${Math.random().toString(36).slice(2, 8)}`,
        code: `#${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        type: input.type,
        serviceName: input.serviceName,
        target: input.target,
        price: input.price,
        status: 'قيد المعالجة',
        createdAt: now,
        country: input.country,
        flag: input.flag,
        phoneNumber: input.phoneNumber,
        quantity: input.quantity,
      };

      const nextOrders = [order, ...getOrders()];
      persist(nextOrders);

      void tgNotifyOrder({
        userId,
        code: order.code,
        type: input.type === 'phone' ? 'رقم وهمي' : 'خدمة رقمية',
        service: input.serviceName,
        target: input.target,
        price: input.price,
        walletAfter: finalWallet,
      });

      return { ok: true, order };
    },
    [persist, userId]
  );

  const addRecharge = useCallback((amount: number, method: string) => {
    setWalletState((prev) => {
      const next = Math.round((prev + amount) * 100) / 100;
      persistWallet(next);
      return next;
    });
    const after = getWallet() + amount;
    void tgNotifyRecharge({ userId, amount, walletAfter: after, method });
  }, [userId]);

  // Keep orders in sync across tabs
  useEffect(() => {
    const handler = () => setOrders(getOrders());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const value = useMemo<StoreContextValue>(
    () => ({ userId, wallet, orders, purchase, addRecharge, refreshOrders }),
    [userId, wallet, orders, purchase, addRecharge, refreshOrders]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
