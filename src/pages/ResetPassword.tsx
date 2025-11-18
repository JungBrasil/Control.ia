import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('type=recovery')) {
      setOk(true)
    }
  }, [])

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await resetPassword(email)
    if (error) setError(error)
    else setOk(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow p-6 rounded space-y-4">
        {!ok ? (
          <form onSubmit={requestReset} className="space-y-4">
            <h1 className="text-xl font-semibold">Recuperar senha</h1>
            <div className="space-y-2">
              <label className="text-sm">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button type="submit" className="btn w-full">Enviar link</button>
          </form>
        ) : (
          <div className="space-y-3">
            <h1 className="text-xl font-semibold">Verifique seu e-mail</h1>
            <div className="text-sm text-gray-700">Um link de recuperação foi enviado.</div>
          </div>
        )}
      </div>
    </div>
  )
}