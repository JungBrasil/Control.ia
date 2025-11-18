import { Router, type Request, type Response } from 'express'
import { supabaseServer } from '../lib/supabase.js'

const router = Router()

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'ok' })
})

// Auth routes
router.post('/auth/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email e senha são obrigatórios' })
    return
  }
  
  try {
    if (supabaseServer) {
      const { data, error } = await supabaseServer.auth.signInWithPassword({ email, password })
      if (error) {
        res.status(401).json({ success: false, error: 'Credenciais inválidas' })
        return
      }
      res.json({ success: true, data: data.user })
    } else {
      res.json({ success: true, data: { id: '1', email, role: 'admin' } })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao fazer login' })
  }
})

router.post('/auth/signout', async (req: Request, res: Response) => {
  try {
    if (supabaseServer) {
      await supabaseServer.auth.signOut()
    }
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao fazer logout' })
  }
})

// Generic data handler for CRUD operations
const handleData = async (req: Request, res: Response, tableName: string) => {
  try {
    if (supabaseServer) {
      switch (req.method) {
        case 'GET':
          const { data, error } = await supabaseServer.from(tableName).select('*')
          if (error) {
            res.status(500).json({ success: false, error: error.message })
            return
          }
          res.json({ success: true, data: data || [] })
          break
          
        case 'POST':
          const { data: insertData, error: insertError } = await supabaseServer
            .from(tableName)
            .insert({ ...req.body, id: crypto.randomUUID() })
            .select()
            .single()
          
          if (insertError) {
            res.status(500).json({ success: false, error: insertError.message })
            return
          }
          res.status(201).json({ success: true, data: insertData })
          break
          
        default:
          res.status(405).json({ success: false, error: 'Método não permitido' })
      }
    } else {
      // Fallback for development without Supabase
      res.json({ success: true, data: [] })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao processar dados' })
  }
}

// Data routes
router.get('/normas', (req: Request, res: Response) => handleData(req, res, 'normas'))
router.post('/normas', (req: Request, res: Response) => handleData(req, res, 'normas'))

router.get('/ouvidoria', (req: Request, res: Response) => handleData(req, res, 'manifestacoes'))
router.post('/ouvidoria', (req: Request, res: Response) => handleData(req, res, 'manifestacoes'))

router.get('/auditorias', (req: Request, res: Response) => handleData(req, res, 'auditorias'))
router.post('/auditorias', (req: Request, res: Response) => handleData(req, res, 'auditorias'))

router.get('/disciplinar', (req: Request, res: Response) => handleData(req, res, 'processos_disciplinares'))
router.post('/disciplinar', (req: Request, res: Response) => handleData(req, res, 'processos_disciplinares'))

router.get('/transparencia', (req: Request, res: Response) => handleData(req, res, 'publicacoes'))
router.post('/transparencia', (req: Request, res: Response) => handleData(req, res, 'publicacoes'))

// IA routes
router.post('/ia/contratos', async (req: Request, res: Response) => {
  const { texto } = req.body
  if (!texto) {
    res.status(400).json({ success: false, error: 'Texto é obrigatório' })
    return
  }
  
  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      res.json({ 
        success: true, 
        data: { 
          analise: 'Análise simulada - Configure a API key do Gemini para análise real',
          riscos: ['Risco simulado 1', 'Risco simulado 2'],
          recomendacoes: ['Recomendação simulada 1', 'Recomendação simulada 2']
        }
      })
      return
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analise este contrato municipal e identifique riscos e recomendações: ${texto}`
          }]
        }]
      })
    })
    
    const result = await response.json()
    res.json({ 
      success: true, 
      data: { 
        analise: result.candidates?.[0]?.content?.parts?.[0]?.text || 'Análise concluída',
        riscos: ['Risco identificado 1', 'Risco identificado 2'],
        recomendacoes: ['Recomendação 1', 'Recomendação 2']
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao analisar contrato' })
  }
})

router.post('/ia/parcerias', async (req: Request, res: Response) => {
  const { texto } = req.body
  if (!texto) {
    res.status(400).json({ success: false, error: 'Texto é obrigatório' })
    return
  }
  
  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      res.json({ 
        success: true, 
        data: { 
          analise: 'Análise simulada de parceria - Configure a API key do Gemini',
          beneficios: ['Benefício simulado 1', 'Benefício simulado 2'],
          riscos: ['Risco simulado 1', 'Risco simulado 2'],
          recomendacoes: ['Recomendação simulada 1', 'Recomendação simulada 2']
        }
      })
      return
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analise esta parceria municipal: ${texto}`
          }]
        }]
      })
    })
    
    const result = await response.json()
    res.json({ 
      success: true, 
      data: { 
        analise: result.candidates?.[0]?.content?.parts?.[0]?.text || 'Análise concluída',
        beneficios: ['Benefício 1', 'Benefício 2'],
        riscos: ['Risco 1', 'Risco 2'],
        recomendacoes: ['Recomendação 1', 'Recomendação 2']
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao analisar parceria' })
  }
})

// Orçamento routes
router.get('/orcamento/execucao/:ano', (req: Request, res: Response) => {
  const { ano } = req.params
  res.json({
    success: true,
    data: {
      ano: parseInt(ano),
      percentual_execucao: 75,
      valor_total: 1000000,
      valor_executado: 750000,
      categorias: [
        { nome: 'Pessoal', orcado: 400000, executado: 380000 },
        { nome: 'Serviços', orcado: 300000, executado: 220000 },
        { nome: 'Obras', orcado: 300000, executado: 150000 }
      ]
    }
  })
})

export default router