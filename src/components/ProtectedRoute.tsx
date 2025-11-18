import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { SUPABASE_CONFIGURED } from '@/lib/supabase'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-6 text-center">Carregando...</div>
  if (!user && SUPABASE_CONFIGURED) return <Navigate to="/login" replace />
  return children
}