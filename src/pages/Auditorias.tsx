import { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'

type Auditoria = {
  id: string
  numero: string
  tipo: string
  objeto: string
  status: string
  documento_url?: string
  documento_nome?: string
}

export default function Auditorias() {
  const [lista, setLista] = useState<Auditoria[]>([])
  const [numero, setNumero] = useState('')
  const [tipo, setTipo] = useState('operacional')
  const [objeto, setObjeto] = useState('')
  const [documento_url, setDocumentoUrl] = useState('')
  const [documento_nome, setDocumentoNome] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const carregar = async () => {
    const r = await fetch('/api/auditorias')
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
      const r = await fetch('/api/auditorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero, tipo, objeto, documento_url, documento_nome }),
      })
      const json = await r.json()
      if (!json.success) throw new Error(json.error || 'Erro')
      setNumero('')
      setObjeto('')
      setDocumentoUrl('')
      setDocumentoNome('')
      carregar()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Auditorias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm">Número</label>
            <input value={numero} onChange={(e) => setNumero(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="operacional">Operacional</option>
              <option value="conformidade">Conformidade</option>
              <option value="financeira">Financeira</option>
              <option value="interna">Interna</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Objeto</label>
            <textarea value={objeto} onChange={(e) => setObjeto(e.target.value)} className="border rounded px-3 py-2 w-full h-24" />
          </div>
          <FileUpload onUploadComplete={(url, fileName) => {
            setDocumentoUrl(url)
            setDocumentoNome(fileName)
          }} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button onClick={cadastrar} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Lista</h2>
          <div className="space-y-2">
            {lista.length === 0 && <div className="text-gray-600">Sem auditorias</div>}
            {lista.map((a) => (
              <div key={a.id} className="border rounded p-3">
                <div className="font-medium">{a.numero} — {a.tipo}</div>
                <div className="text-sm text-gray-700">{a.objeto}</div>
                <div className="text-xs text-gray-500">{a.status}</div>
                {a.documento_url && (
                  <a href={a.documento_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">
                    Ver documento
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}