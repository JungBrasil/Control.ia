import { Router, type Request, type Response } from 'express'
import { supabaseServer } from '../lib/supabase'

type Publicacao = {
  id: string
  titulo: string
  descricao?: string
  categoria?: string
  url?: string
  criado_em: string
  arquivo_url?: string
  tamanho_arquivo?: number
}

const router = Router()
const publicacoes: Publicacao[] = []

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    if (supabaseServer) {
      const { data, error } = await supabaseServer.from('publicacoes').select('*')
      if (error) {
        console.error('Supabase error:', error)
        res.status(200).json({ success: true, data: publicacoes })
        return
      }
      res.status(200).json({ success: true, data: data || [] })
    } else {
      res.status(200).json({ success: true, data: publicacoes })
    }
  } catch (error) {
    console.error('Error fetching publicacoes:', error)
    res.status(200).json({ success: true, data: publicacoes })
  }
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { titulo, descricao, categoria, url, arquivo_url, tamanho_arquivo } = req.body || {}
  if (!titulo) {
    res.status(400).json({ success: false, error: 'titulo é obrigatório' })
    return
  }
  
  try {
    if (supabaseServer) {
      const { data, error } = await supabaseServer.from('publicacoes').insert({
        titulo,
        descricao,
        categoria,
        url,
        arquivo_url,
        tamanho_arquivo,
        criado_em: new Date().toISOString()
      }).select()
      
      if (error) {
        console.error('Supabase error:', error)
        const p: Publicacao = {
          id: crypto.randomUUID(),
          titulo,
          descricao,
          categoria,
          url,
          arquivo_url,
          tamanho_arquivo,
          criado_em: new Date().toISOString(),
        }
        publicacoes.push(p)
        res.status(201).json({ success: true, data: p })
        return
      }
      
      res.status(201).json({ success: true, data: data[0] })
    } else {
      const p: Publicacao = {
        id: crypto.randomUUID(),
        titulo,
        descricao,
        categoria,
        url,
        arquivo_url,
        tamanho_arquivo,
        criado_em: new Date().toISOString(),
      }
      publicacoes.push(p)
      res.status(201).json({ success: true, data: p })
    }
  } catch (error) {
    console.error('Error creating publicacao:', error)
    const p: Publicacao = {
      id: crypto.randomUUID(),
      titulo,
      descricao,
      categoria,
      url,
      arquivo_url,
      tamanho_arquivo,
      criado_em: new Date().toISOString(),
    }
    publicacoes.push(p)
    res.status(201).json({ success: true, data: p })
  }
})

export default router