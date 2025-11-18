import { Router, type Request, type Response } from 'express'
import { supabaseServer } from '../lib/supabase'

type Processo = {
  id: string
  numero: string
  tipo: string
  assunto: string
  status: string
  servidor?: string
  data_instauracao?: string
  data_conclusao?: string
}

const router = Router()
const processos: Processo[] = []

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    if (supabaseServer) {
      const { data, error } = await supabaseServer.from('processos_disciplinares').select('*')
      if (error) {
        console.error('Supabase error:', error)
        res.status(200).json({ success: true, data: processos })
        return
      }
      res.status(200).json({ success: true, data: data || [] })
    } else {
      res.status(200).json({ success: true, data: processos })
    }
  } catch (error) {
    console.error('Error fetching processos:', error)
    res.status(200).json({ success: true, data: processos })
  }
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { numero, tipo, assunto, servidor } = req.body || {}
  if (!numero || !tipo || !assunto) {
    res.status(400).json({ success: false, error: 'numero, tipo e assunto são obrigatórios' })
    return
  }
  
  try {
    if (supabaseServer) {
      const { data, error } = await supabaseServer.from('processos_disciplinares').insert({
        numero,
        tipo,
        assunto,
        servidor,
        status: 'instaurado',
        data_instauracao: new Date().toISOString()
      }).select()
      
      if (error) {
        console.error('Supabase error:', error)
        const p: Processo = {
          id: crypto.randomUUID(),
          numero,
          tipo,
          assunto,
          status: 'instaurado',
          servidor
        }
        processos.push(p)
        res.status(201).json({ success: true, data: p })
        return
      }
      
      res.status(201).json({ success: true, data: data[0] })
    } else {
      const p: Processo = {
        id: crypto.randomUUID(),
        numero,
        tipo,
        assunto,
        status: 'instaurado',
        servidor
      }
      processos.push(p)
      res.status(201).json({ success: true, data: p })
    }
  } catch (error) {
    console.error('Error creating processo:', error)
    const p: Processo = {
      id: crypto.randomUUID(),
      numero,
      tipo,
      assunto,
      status: 'instaurado',
      servidor
    }
    processos.push(p)
    res.status(201).json({ success: true, data: p })
  }
})

export default router