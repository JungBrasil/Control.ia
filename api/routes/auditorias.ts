import { Router, type Request, type Response } from 'express'
import { supabaseServer, SUPABASE_CONFIGURED_BACKEND } from '../lib/supabase.js'

type Auditoria = {
  id: string
  numero: string
  tipo: string
  objeto: string
  status: string
  data_inicio?: string
  data_fim?: string
  equipe?: string[]
  documento_url?: string
  documento_nome?: string
}

const router = Router()
const auditorias: Auditoria[] = []

router.get('/', async (req: Request, res: Response): Promise<void> => {
  if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
    const { data, error } = await supabaseServer
      .from('auditorias')
      .select('*')
      .order('criado_em', { ascending: false })
    if (error) {
      res.status(500).json({ success: false, error: 'Erro ao consultar auditorias' })
      return
    }
    res.status(200).json({ success: true, data })
    return
  }
  res.status(200).json({ success: true, data: auditorias })
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { numero, tipo, objeto, coordenador, data_inicio, data_fim, equipe, documento_url, documento_nome } = req.body || {}
  if (!numero || !tipo || !objeto) {
    res.status(400).json({ success: false, error: 'numero, tipo e objeto são obrigatórios' })
    return
  }
  const a: Auditoria = {
    id: crypto.randomUUID(),
    numero,
    tipo,
    objeto,
    status: 'planejada',
    documento_url,
    documento_nome
  }

  if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
    const { data, error } = await supabaseServer
      .from('auditorias')
      .insert({
        id: a.id,
        numero: a.numero,
        tipo: a.tipo,
        objeto: a.objeto,
        coordenador,
        data_inicio,
        data_fim,
        status: a.status,
        equipe,
        documento_url,
        documento_nome
      })
      .select('*')
      .single()
    if (error) {
      res.status(500).json({ success: false, error: 'Erro ao salvar auditoria' })
      return
    }
    res.status(201).json({ success: true, data })
    return
  }

  auditorias.push(a)
  res.status(201).json({ success: true, data: a })
})

export default router