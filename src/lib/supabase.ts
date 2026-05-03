import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://chsxlkpfjssedmybztar.supabase.co';
const supabaseKey = 'sb_publishable_crAxy9yfPrZ2Q-H0Jevj9w_BXvFGo70';

export const supabase = createClient(supabaseUrl, supabaseKey);
