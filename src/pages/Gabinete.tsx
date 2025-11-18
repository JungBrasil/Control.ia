import { useState } from 'react'

type Plano = { id: string; titulo: string; responsavel: string; prazo: string; status: 'planejado' | 'em_execucao' | 'concluido' }

export default function Gabinete() {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [titulo, setTitulo] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [prazo, setPrazo] = useState('')
  const [status, setStatus] = useState<Plano['status']>('planejado')

  const addPlano = () => {
    if (!titulo || !responsavel || !prazo) return
    setPlanos((prev) => [{ id: crypto.randomUUID(), titulo, responsavel, prazo, status }, ...prev])
    setTitulo(''); setResponsavel(''); setPrazo(''); setStatus('planejado')
  }

  const Card = ({ title, children }: { title: string; children: any }) => (
    <div className="card p-4 space-y-3">
      <div className="font-medium">{title}</div>
      {children}
    </div>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Gabinete do Controlador-Geral</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card title="Planejamento">
          <div className="space-y-2">
            <input placeholder="Título" value={titulo} onChange={(e)=>setTitulo(e.target.value)} className="border rounded px-3 py-2 w-full" />
            <input placeholder="Responsável" value={responsavel} onChange={(e)=>setResponsavel(e.target.value)} className="border rounded px-3 py-2 w-full" />
            <input type="date" value={prazo} onChange={(e)=>setPrazo(e.target.value)} className="border rounded px-3 py-2 w-full" />
            <select value={status} onChange={(e)=>setStatus(e.target.value as any)} className="border rounded px-3 py-2 w-full">
              <option value="planejado">Planejado</option>
              <option value="em_execucao">Em execução</option>
              <option value="concluido">Concluído</option>
            </select>
            <button className="btn" onClick={addPlano}>Adicionar Plano</button>
          </div>
        </Card>
        <Card title="Integridade">
          <div className="text-sm text-gray-700">Mapeamento de riscos, códigos de conduta, canais de integridade.</div>
        </Card>
        <Card title="Gestão Interna">
          <div className="text-sm text-gray-700">Documentos internos, fluxos de trabalho, responsabilidades e prazos.</div>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">Planos</h2>
        <div className="space-y-2">
          {planos.length === 0 && <div className="text-gray-600">Sem planos cadastrados</div>}
          {planos.map((p)=> (
            <div key={p.id} className="card p-3">
              <div className="font-medium">{p.titulo}</div>
              <div className="text-sm text-gray-700">Responsável: {p.responsavel} • Prazo: {p.prazo} • Status: {p.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}