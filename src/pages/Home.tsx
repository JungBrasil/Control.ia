import { useState, useEffect } from 'react'

export default function Home() {
  const [metrics, setMetrics] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    try {
      const safeJson = async (res: Response) => {
        try {
          return await res.json()
        } catch {
          return { success: false, data: [] }
        }
      }
      const [normas, ouvidoria, auditorias, orc] = await Promise.all([
        fetch('/api/normas').then(safeJson),
        fetch('/api/ouvidoria').then(safeJson),
        fetch('/api/auditorias').then(safeJson),
        fetch(`/api/orcamento/execucao/${new Date().getFullYear()}`).then(safeJson),
      ])
      setMetrics({
        normas: normas.success ? normas.data.length : 0,
        manifestacoes: ouvidoria.success ? ouvidoria.data.length : 0,
        auditorias: auditorias.success ? auditorias.data.length : 0,
        execucao: orc.success ? orc.data.percentual_execucao : 0,
      })
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">SCM — Visão Geral</h1>
      {error && <div className="text-red-600">{error}</div>}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-4">Normas: {metrics.normas}</div>
          <div className="border rounded p-4">Manifestações: {metrics.manifestacoes}</div>
          <div className="border rounded p-4">Auditorias: {metrics.auditorias}</div>
          <div className="border rounded p-4">Execução Orçamentária: {metrics.execucao}%</div>
        </div>
      )}
    </div>
  )
}