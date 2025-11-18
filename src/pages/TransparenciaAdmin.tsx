import { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'

type Publicacao = {
  id: string
  titulo: string
  descricao?: string
  categoria?: string
  url?: string
  criado_em: string
  arquivo_url?: string
  tamanho_arquivo?: number
}

export default function TransparenciaAdmin() {
  const [lista, setLista] = useState<Publicacao[]>([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [url, setUrl] = useState('')
  const [arquivo_url, setArquivoUrl] = useState('')
  const [tamanho_arquivo, setTamanhoArquivo] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const carregar = async () => {
    const r = await fetch('/api/transparencia')
    const json = await r.json()
    if (json.success) setLista(json.data)
  }

  useEffect(() => {
    carregar()
  }, [])

  const publicar = async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch('/api/transparencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, categoria, url, arquivo_url, tamanho_arquivo }),
      })
      const json = await r.json()
      if (!json.success) throw new Error(json.error || 'Erro')
      setTitulo('')
      setDescricao('')
      setCategoria('')
      setUrl('')
      setArquivoUrl('')
      setTamanhoArquivo(undefined)
      carregar()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Transparência — Publicações</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm">Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="border rounded px-3 py-2 w-full h-24" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Categoria</label>
            <input value={categoria} onChange={(e) => setCategoria(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">URL (opcional)</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <FileUpload onUploadComplete={(uploadUrl, fileName, size) => {
            setArquivoUrl(uploadUrl)
            setTamanhoArquivo(size)
          }} />
          <div className="space-y-2">
            <label className="text-sm">Arquivo URL (opcional)</label>
            <input value={arquivo_url} onChange={(e) => setArquivoUrl(e.target.value)} className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Tamanho do arquivo (bytes, opcional)</label>
            <input 
              type="number" 
              value={tamanho_arquivo || ''} 
              onChange={(e) => setTamanhoArquivo(e.target.value ? parseInt(e.target.value) : undefined)} 
              className="border rounded px-3 py-2 w-full" 
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button onClick={publicar} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Publicações</h2>
          <div className="space-y-2">
            {lista.length === 0 && <div className="text-gray-600">Sem publicações</div>}
            {lista.map((p) => (
              <div key={p.id} className="border rounded p-3">
                <div className="font-medium">{p.titulo}</div>
                {p.descricao && <div className="text-sm text-gray-700">{p.descricao}</div>}
                <div className="text-xs text-gray-500">{p.categoria || 'Geral'} • {new Date(p.criado_em).toLocaleString()}</div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Abrir</a>
                )}
                {p.arquivo_url && (
                  <a href={p.arquivo_url} target="_blank" rel="noreferrer" className="text-green-600 text-sm ml-2">
                    Download ({p.tamanho_arquivo ? (p.tamanho_arquivo / 1024).toFixed(1) + ' KB' : 'Arquivo'})
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