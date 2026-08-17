const TelegramBot = require('node-telegram-bot-api');
const { createClient } = require('@supabase/supabase-js');

const token = '8062958069:AAHMn-CK9-UN0f2pmsu4H3POi-9I9kPNvo8';
const bot = new TelegramBot(token, { polling: true });

const supabaseUrl = 'https://tihozfggiujerepxqwjz.supabase.co';
const supabaseKey = 'sbp_7ebbc3edbfef8f9363a03dd4d9ec0d4eeea7ebbc';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Bot is running...');

bot.onText(/\/code (.+) (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const orderId = match[1];
  const otpCode = match[2];

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ code: otpCode, status: 'completed' })
      .eq('id', orderId);

    if (error) {
      bot.sendMessage(chatId, "❌ خطأ في تحديث الطلب: " + error.message);
    } else {
      bot.sendMessage(chatId, "✅ تم إرسال الكود (" + otpCode + ") للطلب رقم " + orderId + " بنجاح إلى الزبون!");
    }
  } catch (err) {
    bot.sendMessage(chatId, "❌ حدث خطأ: " + err.message);
  }
});
