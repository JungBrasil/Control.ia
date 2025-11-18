import { useState } from 'react'

export default function IaParcerias() {
  const [docs, setDocs] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const analyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const r = await fetch('/api/ia/analisar-parceria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parceria_id: null, documentos: docs.split('\n') }),
      })
      const json = await r.json()
      if (!json.success) throw new Error(json.error || 'Erro')
      setResult(json.data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">IA — Análise de Parcerias</h1>
      <textarea
        value={docs}
        onChange={(e) => setDocs(e.target.value)}
        placeholder={"Cole textos/links do Plano de Trabalho, Termo e cotações"}
        className="w-full border rounded p-3 h-40"
      />
      <button onClick={analyze} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? 'Analisando...' : 'Analisar'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="border rounded p-4 whitespace-pre-wrap">
          {result.parecer || 'Sem parecer'}
        </div>
      )}
    </div>
  )
}