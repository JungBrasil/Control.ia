import { Router, type Request, type Response } from 'express'
import { supabaseServer, SUPABASE_CONFIGURED_BACKEND } from '../lib/supabase.js'

type Norma = {
  id: string
  numero: string
  titulo: string
  descricao?: string
  data_publicacao?: string
  data_vigencia?: string
  ativa: boolean
  anexos?: string[]
  criado_em: string
}

const router = Router()

const normas: Norma[] = []

router.get('/', async (req: Request, res: Response): Promise<void> => {
  if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
    const { data, error } = await supabaseServer.from('normas').select('*').order('criado_em', { ascending: false })
    if (error) {
      res.status(500).json({ success: false, error: 'Erro ao consultar normas' })
      return
    }
    res.status(200).json({ success: true, data })
    return
  }
  res.status(200).json({ success: true, data: normas })
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { numero, titulo, descricao, data_publicacao, data_vigencia, ativa, anexos } = req.body || {}
  if (!numero || !titulo) {
    res.status(400).json({ success: false, error: 'numero e titulo são obrigatórios' })
    return
  }
  const n: Norma = {
    id: crypto.randomUUID(),
    numero,
    titulo,
    descricao,
    data_publicacao,
    data_vigencia,
    ativa: Boolean(ativa ?? true),
    anexos: Array.isArray(anexos) ? anexos : [],
    criado_em: new Date().toISOString(),
  }
  if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
    const { data, error } = await supabaseServer.from('normas').insert({
      id: n.id,
      numero: n.numero,
      titulo: n.titulo,
      descricao: n.descricao,
      data_publicacao: n.data_publicacao,
      data_vigencia: n.data_vigencia,
      ativa: n.ativa,
      anexos: n.anexos,
      criado_por: null,
    }).select('*').single()
    if (error) {
      res.status(500).json({ success: false, error: 'Erro ao salvar norma' })
      return
    }
    res.status(201).json({ success: true, data })
    return
  }
  normas.push(n)
  res.status(201).json({ success: true, data: n })
})

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
    const { data, error } = await supabaseServer
      .from('normas')
      .update(req.body)
      .eq('id', id)
      .select('*')
      .single()
    if (error) {
      res.status(500).json({ success: false, error: 'Erro ao atualizar norma' })
      return
    }
    res.status(200).json({ success: true, data })
    return
  }
  const idx = normas.findIndex((x) => x.id === id)
  if (idx === -1) {
    res.status(404).json({ success: false, error: 'Norma não encontrada' })
    return
  }
  normas[idx] = { ...normas[idx], ...req.body }
  res.status(200).json({ success: true, data: normas[idx] })
})

export default router