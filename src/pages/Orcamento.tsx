import { useEffect, useState } from 'react'

export default function Orcamento() {
  const [exercicio, setExercicio] = useState<number>(new Date().getFullYear())
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const carregar = async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch(`/api/orcamento/execucao/${exercicio}`)
      const json = await r.json()
      if (!json.success) throw new Error('Erro ao carregar orçamento')
      setData(json.data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Orçamento</h1>
      <div className="flex gap-3 items-end">
        <div>
          <label className="text-sm">Exercício</label>
          <input
            type="number"
            value={exercicio}
            onChange={(e) => setExercicio(Number(e.target.value))}
            className="border rounded px-3 py-2"
          />
        </div>
        <button onClick={carregar} className="bg-blue-600 text-white px-4 py-2 rounded">Atualizar</button>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-4">Orçado: R$ {data.orcado.toLocaleString()}</div>
          <div className="border rounded p-4">Empenhado: R$ {data.empenhado.toLocaleString()}</div>
          <div className="border rounded p-4">Liquidado: R$ {data.liquidado.toLocaleString()}</div>
          <div className="border rounded p-4">Pago: R$ {data.pago.toLocaleString()}</div>
          <div className="border rounded p-4">Execução: {data.percentual_execucao}%</div>
        </div>
      )}
    </div>
  )
}