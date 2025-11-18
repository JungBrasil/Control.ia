import { useEffect, useState } from 'react'

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

export default function TransparenciaPublica() {
  const [lista, setLista] = useState<Publicacao[]>([])

  const carregar = async () => {
    const r = await fetch('/api/transparencia')
    const json = await r.json()
    if (json.success) setLista(json.data)
  }

  useEffect(() => {
    carregar()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Transparência Pública</h1>
      <div className="space-y-3">
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
  )
}