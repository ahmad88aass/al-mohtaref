const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const OWNER_CHAT_ID = import.meta.env.VITE_TELEGRAM_OWNER_CHAT_ID;

interface PaymentNotificationInput {
  method: string;
  amount: string;
  publicId: string;
  imageFile: File;
}

export async function sendPaymentNotification(input: PaymentNotificationInput) {
  const hasToken = !!BOT_TOKEN;
  const hasChatId = !!OWNER_CHAT_ID;

  if (!hasToken) {
    return { success: false, message: 'إعدادات الإشعار غير مكتملة' };
  }
  if (!hasChatId) {
    return { success: false, message: 'إعدادات الإشعار غير مكتملة' };
  }

  const caption =
    'طلب شحن جديد\n' +
    'طريقة الدفع: ' + input.method + '\n' +
    'المبلغ: ' + input.amount + ' $\n' +
    'معرف المستخدم: ' + input.publicId;

  const formData = new FormData();
  formData.append('chat_id', OWNER_CHAT_ID);
  formData.append('caption', caption);
  formData.append('photo', input.imageFile);

  const url = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendPhoto';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();

    if (result.ok) {
      return { success: true, message: 'تم إرسال طلبك بنجاح، سيتم شحن رصيدك خلال دقائق' };
    } else {
      return { success: false, message: 'تعذر إرسال الطلب، حاول مرة أخرى' };
    }
  } catch (err) {
    return { success: false, message: 'تعذر إرسال الطلب، تحقق من الاتصال بالإنترنت' };
  }
}
