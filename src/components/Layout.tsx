import { Link, NavLink, Outlet } from 'react-router-dom'
import { LayoutGrid, FileText, Brain, Users, Search, ShieldCheck, FolderKanban, Wallet, Megaphone, Eye, BarChart3, LogOut } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-14 header flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5" />
          <Link to="/dashboard" className="font-semibold">Control.ia</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-2.5 text-white/70" />
            <input placeholder="Buscar" className="pl-8 pr-3 py-2 rounded text-sm bg-white/10 border-white/20 text-white placeholder-white/70 focus:outline-none" />
          </div>
          <Link to="/login" className="btn gap-1">
            <LogOut className="w-4 h-4" />
            Sair
          </Link>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 border-r bg-white p-3 space-y-2">
          <div className="text-xs text-gray-500 px-2">Módulos</div>
          <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-2 px-2 py-2 rounded ${isActive? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100'}`}><LayoutGrid className="w-4 h-4" />Dashboard</NavLink>
          <NavLink to="/gabinete" className={({isActive}) => `flex items-center gap-2 px-2 py-2 rounded ${isActive? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100'}`}><FileText className="w-4 h-4" />Gabinete</NavLink>
          <NavLink to="/auditorias" className={({isActive}) => `flex items-center gap-2 px-2 py-2 rounded ${isActive? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100'}`}><ShieldCheck className="w-4 h-4" />Auditorias</NavLink>
          <NavLink to="/corregedoria" className={({isActive}) => `flex items-center gap-2 px-2 py-2 rounded ${isActive? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100'}`}><ShieldCheck className="w-4 h-4" />Corregedoria</NavLink>
          <NavLink to="/ouvidoria" className={({isActive}) => `flex items-center gap-2 px-2 py-2 rounded ${isActive? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100'}`}><Megaphone className="w-4 h-4" />Ouvidoria</NavLink>
          <NavLink to="/transparencia" className={({isActive}) => `flex items-center gap-2 px-2 py-2 rounded ${isActive? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100'}`}><Eye className="w-4 h-4" />Transparência</NavLink>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}