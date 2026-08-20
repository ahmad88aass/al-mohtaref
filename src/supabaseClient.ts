import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hbmkrmretanoxqrwugtq.supabase.co';
const supabaseKey = 'sb_publishable_ikhdmBpN1XBEGyGYi_p-Fg_s_kCmuWe';

export const supabase = createClient(supabaseUrl, supabaseKey);
