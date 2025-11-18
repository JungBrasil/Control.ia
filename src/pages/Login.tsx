import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { SUPABASE_CONFIGURED } from '@/lib/supabase'

function normalizeCPF(cpf: string) {
  return cpf.replace(/\D/g, '')
}

export default function Login() {
  const { signInWithEmail } = useAuth()
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const rawCpf = normalizeCPF(cpf)
    const loginEmail = email || ''

    if (!loginEmail) {
      setError('Informe o e-mail cadastrado ou configure o mapeamento CPF→e-mail')
      setLoading(false)
      return
    }

    const { error } = await signInWithEmail(loginEmail, password)
    if (error) setError(error)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow p-6 rounded space-y-4"
      >
        <h1 className="text-xl font-semibold text-gray-800">Acesso ao Control.ia</h1>
        {!SUPABASE_CONFIGURED && (
          <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 p-3 rounded">
            Autenticação desativada. Configure o Supabase para habilitar login.
          </div>
        )}
        <div className="text-sm">
          Não tem conta? <a href="/register" className="text-brand-700">Cadastrar</a>
        </div>
        <div className="text-sm">
          Esqueceu a senha? <a href="/reset-password" className="text-brand-700">Recuperar</a>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">CPF (opcional)</label>
          <input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@prefeitura.gov"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="btn w-full disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}