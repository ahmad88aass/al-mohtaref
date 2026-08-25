import { useEffect, useState } from 'react';
import { useAuth } from '@/store/AuthContext';
import { subscribeToPush, getNotificationPermissionStatus } from '@/lib/pushNotifications';

export function NotificationPrompt() {
  const { user, isAuthenticated } = useAuth();
  const [status, setStatus] = useState('default');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setVisible(false);
      return;
    }
    getNotificationPermissionStatus().then(function(result) {
      setStatus(result);
      if (result === 'default') {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, [isAuthenticated]);

  const handleEnable = async () => {
    if (!user) return;
    setLoading(true);
    const result = await subscribeToPush(user.id);
    setLoading(false);
    if (result.success) {
      setVisible(false);
    } else {
      alert(result.message);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-purple-700 text-white px-4 py-3 flex items-center justify-between gap-3 text-sm">
      <span>فعّل الإشعارات حتى توصلك آخر العروض والتحديثات</span>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleEnable}
          disabled={loading}
          className="bg-white text-purple-700 px-3 py-1.5 rounded-lg font-bold"
        >
          {loading ? '...جاري' : 'تفعيل'}
        </button>
        <button
          onClick={handleDismiss}
          className="text-white/80 px-2"
        >
          لاحقًا
        </button>
      </div>
    </div>
  );
}
