import 'dotenv/config';
import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';
import readline from 'readline';

const supabaseUrl = 'https://hbmkrmretanoxqrwugtq.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

webpush.setVapidDetails(
  'mailto:admin@example.com',
  process.env.VITE_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise(function(resolve) {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log('SERVICE KEY LENGTH: ' + (serviceRoleKey ? serviceRoleKey.length : 0));

  const title = await ask('عنوان الإشعار: ');
  const body = await ask('نص الإشعار: ');
  rl.close();

  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('*');

  if (error) {
    console.log('خطأ بجلب المشتركين:', error.message);
    return;
  }

  if (!subscriptions || subscriptions.length === 0) {
    console.log('لا يوجد مشتركين بالإشعارات حاليًا');
    return;
  }

  console.log('عدد المشتركين: ' + subscriptions.length);

  const payload = JSON.stringify({
    title: title,
    body: body,
    url: '/',
  });

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    const sub = subscriptions[i];
    const pushSubscription = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth,
      },
    };

    try {
      await webpush.sendNotification(pushSubscription, payload);
      successCount = successCount + 1;
    } catch (err) {
      failCount = failCount + 1;
      const isExpired = err.statusCode === 410;
      if (isExpired) {
        await supabase.from('push_subscriptions').delete().eq('id', sub.id);
        console.log('اشتراك منتهي تم حذفه: ' + sub.id);
      } else {
        console.log('فشل الإرسال لـ ' + sub.id + ': ' + err.message);
      }
    }
  }

  console.log('تم الإرسال بنجاح: ' + successCount);
  console.log('فشل الإرسال: ' + failCount);
}

main();
