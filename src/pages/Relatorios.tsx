import { useEffect, useState } from 'react'

export default function Relatorios() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const carregar = async () => {
    setLoading(true)
    setError(null)
    try {
      const [normas, ouvidoria, auditorias, orc] = await Promise.all([
        fetch('/api/normas').then((r) => r.json()),
        fetch('/api/ouvidoria').then((r) => r.json()),
        fetch('/api/auditorias').then((r) => r.json()),
        fetch(`/api/orcamento/execucao/${new Date().getFullYear()}`).then((r) => r.json()),
      ])
      const payload = {
        gerado_em: new Date().toISOString(),
        normas: normas.success ? normas.data : [],
        manifestacoes: ouvidoria.success ? ouvidoria.data : [],
        auditorias: auditorias.success ? auditorias.data : [],
        orcamento: orc.success ? orc.data : null,
      }
      setData(payload)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const baixar = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'relatorio_scm.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Relatórios Consolidados</h1>
      <div className="flex gap-3">
        <button onClick={carregar} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Atualizando...' : 'Atualizar'}
        </button>
        {data && (
          <button onClick={baixar} className="border px-4 py-2 rounded">Baixar JSON</button>
        )}
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {data && (
        <pre className="border rounded p-4 overflow-auto max-h-[60vh] whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}