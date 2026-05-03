import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://himohdpligmxrthpiksk.supabase.co';
const supabaseKey = 'sb_publishable_M6UnIyV3AkNkRYB0Oz7ZlA_zdbazR92';

export const supabase = createClient(supabaseUrl, supabaseKey);
