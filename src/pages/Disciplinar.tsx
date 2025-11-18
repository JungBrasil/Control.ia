import { useEffect, useState } from 'react'

type Processo = {
  id: string
  numero: string
  tipo: string
  assunto: string
  status: string
  servidor?: string
  data_instauracao?: string
  data_conclusao?: string
}

export default function Disciplinar() {
  const [lista, setLista] = useState<Processo[]>([])
  const [numero, setNumero] = useState('')
  const [tipo, setTipo] = useState('sindicancia')
  const [assunto, setAssunto] = useState('')
  const [servidor, setServidor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const carregar = async () => {
    const r = await fetch('/api/disciplinar')
    const json = await r.json()
    if (json.success) setLista(json.data)
  }

  useEffect(() => {
    carregar()
  }, [])

  const cadastrar = async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch('/api/disciplinar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero, tipo, assunto, servidor }),
      })
      const json = await r.json()
      if (!json.success) throw new Error(json.error || 'Erro')
      setNumero('')
      setAssunto('')
      setServidor('')
      carregar()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Corregedoria — Processos Administrativos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm">Número</label>
            <input value={numero} onChange={(e) => setNumero(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="sindicancia">Sindicância</option>
              <option value="pad">PAD</option>
              <option value="tce">TCE</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Servidor</label>
            <input value={servidor} onChange={(e) => setServidor(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Assunto</label>
            <textarea value={assunto} onChange={(e) => setAssunto(e.target.value)} className="border rounded px-3 py-2 w-full h-24" />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button onClick={cadastrar} disabled={loading} className="btn">
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Lista</h2>
          <div className="space-y-2">
            {lista.length === 0 && <div className="text-gray-600">Sem processos</div>}
            {lista.map((p) => (
              <div key={p.id} className="card p-3">
                <div className="font-medium">{p.numero} — {p.tipo}</div>
                <div className="text-sm text-gray-700">{p.assunto}</div>
                {p.servidor && <div className="text-sm text-gray-600">Servidor: {p.servidor}</div>}
                <div className="text-xs text-gray-500">{p.status}</div>
                {p.data_instauracao && <div className="text-xs text-gray-400">Instaurado: {new Date(p.data_instauracao).toLocaleDateString()}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}