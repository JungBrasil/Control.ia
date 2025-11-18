import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { FileText, ShieldCheck, Wallet, Megaphone, BarChart3, Brain, Users, FolderKanban, Eye } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const safeJson = async (res: Response) => {
        try { return await res.json() } catch { return { success: false, data: [] } }
      }
      const [ouvidoria, auditorias, processos, orc] = await Promise.all([
        fetch('/api/ouvidoria').then(safeJson),
        fetch('/api/auditorias').then(safeJson),
        fetch('/api/disciplinar').then(safeJson),
        fetch(`/api/orcamento/execucao/${new Date().getFullYear()}`).then(safeJson),
      ])
      setMetrics({
        manifestacoes: ouvidoria.success ? ouvidoria.data.length : 0,
        auditorias: auditorias.success ? auditorias.data.length : 0,
        processos: processos.success ? processos.data.length : 0,
        execucao: orc.success ? orc.data.percentual_execucao : 0,
      })
    }
    load()
  }, [])

  const Card = ({ href, title, icon: Icon, value }: { href: string, title: string, icon: any, value?: string | number }) => (
    <a href={href} className="group border rounded p-4 bg-white hover:border-blue-600 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <div className="font-medium">{title}</div>
          {value !== undefined && <div className="text-sm text-gray-600">{value}</div>}
        </div>
      </div>
    </a>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm text-gray-600">Bem-vindo{user?.email ? `, ${user.email}` : ''}</div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card href="/gabinete" title="Gabinete" icon={FileText} />
        <Card href="/auditorias" title="Auditorias" icon={ShieldCheck} value={`Ativas: ${metrics?.auditorias ?? 0}`} />
        <Card href="/corregedoria" title="Corregedoria" icon={ShieldCheck} value={`Processos: ${metrics?.processos ?? 0}`} />
        <Card href="/ouvidoria" title="Ouvidoria" icon={Megaphone} value={`Registros: ${metrics?.manifestacoes ?? 0}`} />
        <Card href="/transparencia" title="Transparência" icon={Eye} value={`Execução: ${metrics?.execucao ?? 0}%`} />
      </div>
    </div>
  )
}