import { useState } from 'react';
import { StoreProvider } from '@/store/StoreContext';
import { ToastProvider } from '@/store/ToastContext';
import { ToastViewport } from '@/components/ToastViewport';
import { Header, BottomNav } from '@/components/Navigation';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { WalletPage } from '@/pages/WalletPage';
import { PhonePurchaseModal } from '@/components/PhonePurchaseModal';
import { AssistantWidget } from '@/components/AssistantWidget';
import { Marquee } from '@/components/Marquee';

type Page = 'home' | 'services' | 'service-detail' | 'orders' | 'wallet';

function Shell() {
  const [page, setPage] = useState<Page>('home');
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [phoneCountryId, setPhoneCountryId] = useState<string | null>(null);

  const nav = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openService = (id: string) => {
    setServiceId(id);
    setPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buyPhone = (countryId: string) => {
    setPhoneCountryId(countryId);
  };

  const activeNav = page === 'service-detail' ? 'services' : page;

  return (
    <div className="app-bg min-h-screen text-slate-200">
      <Marquee />
      <Header active={activeNav} onNav={nav} />

      <main className="pb-24 md:pb-10">
        {page === 'home' && (
          <HomePage onNav={nav} onOpenService={openService} onBuyPhone={buyPhone} />
        )}
        {page === 'services' && (
          <ServicesPage onOpenService={openService} onBuyPhone={buyPhone} />
        )}
        {page === 'service-detail' && serviceId && (
          <ServiceDetailPage
            serviceId={serviceId}
            onBack={() => nav('services')}
            onGoOrders={() => nav('orders')}
          />
        )}
        {page === 'orders' && <OrdersPage onGoServices={() => nav('services')} />}
        {page === 'wallet' && <WalletPage onGoServices={() => nav('services')} />}
      </main>

      <BottomNav active={activeNav} onNav={nav} />

      <PhonePurchaseModal
        countryId={phoneCountryId}
        onClose={() => setPhoneCountryId(null)}
        onGoOrders={() => nav('orders')}
      />

      <AssistantWidget />

      <footer className="hidden md:block border-t border-white/5 py-6 text-center text-xs text-slate-600">
        المحترف — Al-Mohtaref © {new Date().getFullYear()} | منصة الخدمات الرقمية
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <StoreProvider>
        <Shell />
        <ToastViewport />
      </StoreProvider>
    </ToastProvider>
  );
}
