import { useEffect, useState } from 'react'

type Norma = {
  id: string
  numero: string
  titulo: string
  descricao?: string
  ativa: boolean
  criado_em: string
}

export default function Normatizacao() {
  const [lista, setLista] = useState<Norma[]>([])
  const [numero, setNumero] = useState('')
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const carregar = async () => {
    const r = await fetch('/api/normas')
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
      const r = await fetch('/api/normas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero, titulo, descricao, ativa: true }),
      })
      const json = await r.json()
      if (!json.success) throw new Error(json.error || 'Erro')
      setNumero('')
      setTitulo('')
      setDescricao('')
      carregar()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Normatização</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm">Número</label>
            <input value={numero} onChange={(e) => setNumero(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="border rounded px-3 py-2 w-full h-24" />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button onClick={cadastrar} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Catálogo</h2>
          <div className="space-y-2">
            {lista.length === 0 && <div className="text-gray-600">Sem normas cadastradas</div>}
            {lista.map((n) => (
              <div key={n.id} className="border rounded p-3">
                <div className="font-medium">{n.numero} — {n.titulo}</div>
                {n.descricao && <div className="text-sm text-gray-700">{n.descricao}</div>}
                <div className="text-xs text-gray-500">{new Date(n.criado_em).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}