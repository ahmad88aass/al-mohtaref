// Telegram Bot API integration for order & recharge notifications.
// Configured per project spec.

export const TG = {
  mainToken: '8062958069:AAHMn-CK9-UN0f2pmsu4H3POi-9I9kPNvo8',
  rechargeToken: '8749270059:AAF7j2uKns-bQIwlvtVL6WqMnzOuvvWRB2Q',
  adminId: '6729808723',
  whatsapp: '+963984335910',
  agent: '@a_a_88as',
};

async function send(
  token: string,
  chatId: string,
  text: string
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function notifyOrder(payload: {
  userId: string;
  code: string;
  type: string;
  service: string;
  target: string;
  price: number;
  walletAfter: number;
}): Promise<boolean> {
  const text =
    `🛒 <b>طلب جديد — المحترف</b>\n\n` +
    `👤 المستخدم: <code>${payload.userId}</code>\n` +
    `🏷️ رقم الطلب: <code>${payload.code}</code>\n` +
    `📦 النوع: ${payload.type}\n` +
    `🔧 الخدمة: ${payload.service}\n` +
    `🎯 الهدف: <code>${payload.target}</code>\n` +
    `💰 السعر: $${payload.price}\n` +
    `🏦 الرصيد بعد العملية: $${payload.walletAfter}\n\n` +
    `📞 وكيل: ${TG.agent}`;
  return send(TG.mainToken, TG.adminId, text);
}

export async function notifyRecharge(payload: {
  userId: string;
  amount: number;
  walletAfter: number;
  method: string;
}): Promise<boolean> {
  const text =
    `💳 <b>طلب شحن محفظة — المحترف</b>\n\n` +
    `👤 المستخدم: <code>${payload.userId}</code>\n` +
    `💵 المبلغ: $${payload.amount}\n` +
    `🏦 الرصيد بعد الشحن: $${payload.walletAfter}\n` +
    `🔗 الطريقة: ${payload.method}\n\n` +
    `📞 وكيل: ${TG.agent}`;
  return send(TG.rechargeToken, TG.adminId, text);
}
