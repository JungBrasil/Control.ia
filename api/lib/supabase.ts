import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export const SUPABASE_CONFIGURED_BACKEND = !!supabaseUrl && !!supabaseServiceKey

export const supabaseServer: SupabaseClient | null = SUPABASE_CONFIGURED_BACKEND
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : null