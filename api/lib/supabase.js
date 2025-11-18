import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const SUPABASE_CONFIGURED_BACKEND = !!supabaseUrl && !!supabaseServiceKey;
export const supabaseServer = SUPABASE_CONFIGURED_BACKEND
    ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
    : null;
