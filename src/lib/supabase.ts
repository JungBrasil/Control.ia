import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || ''
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || ''
const isPlaceholder = (v: string) =>
  !v || /your[-_]/i.test(v) || /your-project\.supabase\.co/i.test(v)
export const SUPABASE_CONFIGURED =
  !!supabaseUrl && !!supabaseAnonKey && !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey)

const fallback = {
  auth: {
    async getSession() {
      return { data: { session: null } }
    },
    async signInWithPassword() {
      return { error: { message: 'Supabase não configurado' } }
    },
    async signOut() {},
    onAuthStateChange() {
      return { data: { subscription: { unsubscribe() {} } } }
    },
  },
}

export const supabase = SUPABASE_CONFIGURED
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (fallback as any)