import { supabase } from '../supabaseClient';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPush(userId: string) {
  const hasServiceWorker = 'serviceWorker' in navigator;
  if (!hasServiceWorker) {
    return { success: false, message: 'المتصفح لا يدعم الإشعارات' };
  }

  const hasPushManager = 'PushManager' in window;
  if (!hasPushManager) {
    return { success: false, message: 'المتصفح لا يدعم الإشعارات' };
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    return { success: false, message: 'تم رفض إذن الإشعارات' };
  }

  const registration = await navigator.serviceWorker.ready;

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
  }

  const subJson = subscription.toJSON();
  const endpoint = subJson.endpoint;
  let p256dh = null;
  let auth = null;
  if (subJson.keys) {
    p256dh = subJson.keys.p256dh;
    auth = subJson.keys.auth;
  }

  let missingData = false;
  if (!endpoint) {
    missingData = true;
  }
  if (!p256dh) {
    missingData = true;
  }
  if (!auth) {
    missingData = true;
  }

  if (missingData) {
    return { success: false, message: 'تعذر الحصول على بيانات الاشتراك' };
  }

  const { error } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: userId,
      endpoint: endpoint,
      p256dh: p256dh,
      auth: auth,
    },
    { onConflict: 'endpoint' }
  );

  if (error) {
    return { success: false, message: 'خطأ في حفظ الاشتراك: ' + error.message };
  }

  return { success: true, message: 'تم تفعيل الإشعارات بنجاح' };
}

export async function getNotificationPermissionStatus() {
  const supported = 'Notification' in window;
  if (!supported) {
    return 'unsupported';
  }
  return Notification.permission;
}
