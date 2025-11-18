import { useEffect, useState } from 'react'

type Manifestacao = {
  id: string
  protocolo: string
  tipo: string
  assunto: string
  descricao: string
  status: string
  criado_em: string
}

export default function Ouvidoria() {
  const [tipo, setTipo] = useState('denuncia')
  const [assunto, setAssunto] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lista, setLista] = useState<Manifestacao[]>([])

  const carregar = async () => {
    const r = await fetch('/api/ouvidoria')
    const json = await r.json()
    if (json.success) setLista(json.data)
  }

  useEffect(() => {
    carregar()
  }, [])

  const enviar = async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch('/api/ouvidoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, assunto, descricao }),
      })
      const json = await r.json()
      if (!json.success) throw new Error(json.error || 'Erro')
      setAssunto('')
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
      <h1 className="text-2xl font-semibold">Ouvidoria</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm">Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="sugestao">Sugestão</option>
              <option value="reclamacao">Reclamação</option>
              <option value="denuncia">Denúncia</option>
              <option value="elogio">Elogio</option>
              <option value="solicitacao">Solicitação</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Assunto</label>
            <input value={assunto} onChange={(e) => setAssunto(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="border rounded px-3 py-2 w-full h-24" />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button onClick={enviar} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Manifestações</h2>
          <div className="space-y-2">
            {lista.length === 0 && <div className="text-gray-600">Sem manifestações</div>}
            {lista.map((m) => (
              <div key={m.id} className="border rounded p-3">
                <div className="font-medium">{m.assunto} — {m.tipo}</div>
                <div className="text-sm text-gray-700">{m.descricao}</div>
                <div className="text-xs text-gray-500">Protocolo {m.protocolo} • {new Date(m.criado_em).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}