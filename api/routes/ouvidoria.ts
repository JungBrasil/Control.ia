import { Router, type Request, type Response } from 'express'
import { supabaseServer, SUPABASE_CONFIGURED_BACKEND } from '../lib/supabase.js'

type Manifestacao = {
  id: string
  protocolo: string
  tipo: string
  assunto: string
  descricao: string
  nome_requerente?: string
  cpf_requerente?: string
  status: string
  criado_em: string
}

const router = Router()

const manifestacoes: Manifestacao[] = []

router.get('/', async (req: Request, res: Response): Promise<void> => {
  if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
    const { data, error } = await supabaseServer
      .from('manifestacoes')
      .select('*')
      .order('criado_em', { ascending: false })
    if (error) {
      res.status(500).json({ success: false, error: 'Erro ao consultar manifestacoes' })
      return
    }
    res.status(200).json({ success: true, data })
    return
  }
  res.status(200).json({ success: true, data: manifestacoes })
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { tipo, assunto, descricao, nome_requerente, cpf_requerente, email_requerente, telefone_requerente } =
    req.body || {}
  if (!tipo || !assunto || !descricao) {
    res.status(400).json({ success: false, error: 'tipo, assunto e descricao são obrigatórios' })
    return
  }

  const m: Manifestacao = {
    id: crypto.randomUUID(),
    protocolo: Math.random().toString().slice(2, 10),
    tipo,
    assunto,
    descricao,
    nome_requerente,
    cpf_requerente,
    status: 'registrada',
    criado_em: new Date().toISOString(),
  }

  if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
    const { data, error } = await supabaseServer.from('manifestacoes').insert({
      id: m.id,
      protocolo: m.protocolo,
      tipo: m.tipo,
      assunto: m.assunto,
      descricao: m.descricao,
      nome_requerente,
      cpf_requerente,
      email_requerente,
      telefone_requerente,
      status: m.status,
    }).select('*').single()
    if (error) {
      res.status(500).json({ success: false, error: 'Erro ao salvar manifestacao' })
      return
    }
    res.status(201).json({ success: true, data })
    return
  }

  manifestacoes.push(m)
  res.status(201).json({ success: true, data: m })
})

export default router