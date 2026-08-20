import TelegramBot from 'node-telegram-bot-api';
import { createClient } from '@supabase/supabase-js';

const token = '8062958069:AAHMn-CK9-UN0f2pmsu4H3POi-9I9kPNvo8';
const bot = new TelegramBot(token, { polling: true });

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'sbp_7ebbc3edbfef8f9363a03dd4d9ec0d4eeea7ebbc';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🤖 Bot is running and connected...');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    bot.sendMessage(chatId, 'أهلاً بك في منصة أمريكي نمبر وان ✈️! البوت يعمل بنجاح وجاهز لاستقبال العمليات والتنبيهات.');
  }
});
