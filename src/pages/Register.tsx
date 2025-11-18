import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Register() {
  const { signUpWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signUpWithEmail(email, password, { name })
    if (error) setError(error)
    else setOk(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow p-6 rounded space-y-4">
        <h1 className="text-xl font-semibold">Criar conta</h1>
        {ok && <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded">Verifique seu e-mail para confirmar o cadastro.</div>}
        <div className="space-y-2">
          <label className="text-sm">Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button type="submit" disabled={loading} className="btn w-full">{loading ? 'Enviando...' : 'Cadastrar'}</button>
        <div className="text-center text-sm">
          Já tem conta? <a href="/login" className="text-brand-700">Entrar</a>
        </div>
      </form>
    </div>
  )
}