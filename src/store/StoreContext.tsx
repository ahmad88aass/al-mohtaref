import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Order } from '@/types';
import { supabase } from '@/supabaseClient';
import { useAuth, AUTH_REQUIRED_MESSAGE } from './AuthContext';

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

interface Profile {
  id: string;
  email: string;
  public_id: string;
  balance: number;
  full_name: string | null;
}

interface StoreContextValue {
  userId: string;
  publicId: string;
  wallet: number;
  orders: Order[];
  profileLoading: boolean;
  purchase: (input: PurchaseInput) => Promise<{ ok: boolean; order?: Order; error?: string }>;
  addRecharge: (amount: number, method: string) => Promise<{ ok: boolean; error?: string }>;
  refreshOrders: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const { session, requireAuth } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const loadProfile = useCallback(async () => {
    if (!session) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    setProfileLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, public_id, balance, full_name')
      .eq('id', session.user.id)
      .single();

    if (!error && data) {
      setProfile(data as Profile);
    }
    setProfileLoading(false);
  }, [session]);

  const loadOrders = useCallback(async () => {
    if (!session) {
      setOrders([]);
      return;
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mapped: Order[] = data.map((row: any) => ({
        id: row.id,
        code: '#' + String(row.id).slice(0, 8).toUpperCase(),
        type: 'service',
        serviceName: row.service_name,
        target: row.target,
        price: Number(row.price),
        status: row.status,
        createdAt: new Date(row.created_at).getTime(),
      }));
      setOrders(mapped);
    }
  }, [session]);

  useEffect(() => {
    loadProfile();
    loadOrders();
  }, [loadProfile, loadOrders]);

  const purchase = useCallback(
    async (input: PurchaseInput): Promise<{ ok: boolean; order?: Order; error?: string }> => {
      if (!session) {
        requireAuth();
        return { ok: false, error: AUTH_REQUIRED_MESSAGE };
      }

      const { data, error } = await supabase.rpc('purchase_item', {
        p_service_name: input.serviceName,
        p_target: input.target,
        p_price: input.price,
      });

      if (error) {
        return { ok: false, error: error.message || 'حدث خطأ أثناء الشراء' };
      }

      const result = data as { ok: boolean; error?: string; order_id?: string; new_balance?: number };

      if (!result.ok) {
        return { ok: false, error: result.error || 'فشلت العملية' };
      }

      await loadProfile();
      await loadOrders();

      const order: Order = {
        id: result.order_id || '',
        code: '#' + String(result.order_id || '').slice(0, 8).toUpperCase(),
        type: input.type,
        serviceName: input.serviceName,
        target: input.target,
        price: input.price,
        status: 'قيد المعالجة',
        createdAt: Date.now(),
        country: input.country,
        flag: input.flag,
        phoneNumber: input.phoneNumber,
        quantity: input.quantity,
      };

      return { ok: true, order };
    },
    [session, requireAuth, loadProfile, loadOrders]
  );const addRecharge = useCallback(
    async (amount: number, _method: string): Promise<{ ok: boolean; error?: string }> => {
      if (!session) {
        requireAuth();
        return { ok: false, error: AUTH_REQUIRED_MESSAGE };
      }

      const { data, error } = await supabase.rpc('recharge_wallet', {
        p_amount: amount,
      });

      if (error) {
        return { ok: false, error: error.message || 'حدث خطأ أثناء الشحن' };
      }

      const result = data as { ok: boolean; error?: string; new_balance?: number };

      if (!result.ok) {
        return { ok: false, error: result.error || 'فشلت عملية الشحن' };
      }

      await loadProfile();
      return { ok: true };
    },
    [session, requireAuth, loadProfile]
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      userId: session?.user.id ?? '',
      publicId: profile?.public_id ?? '',
      wallet: profile?.balance ?? 0,
      orders,
      profileLoading,
      purchase,
      addRecharge,
      refreshOrders: loadOrders,
      refreshProfile: loadProfile,
    }),
    [session, profile, orders, profileLoading, purchase, addRecharge, loadOrders, loadProfile]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
