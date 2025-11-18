import { Router, type Request, type Response } from 'express'
import { supabaseServer, SUPABASE_CONFIGURED_BACKEND } from '../lib/supabase.js'

const router = Router()

router.post('/analisar-contratacao', async (req: Request, res: Response): Promise<void> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      res.status(500).json({ success: false, error: 'GEMINI_API_KEY não configurada' })
      return
    }

    const { contrato_id, documentos, contexto_adicional } = req.body || {}
    const textoDocs = Array.isArray(documentos) ? documentos.join('\n') : ''

    const prompt = `Analise a contratação municipal conforme requisitos legais.\nDocumentos:\n${textoDocs}\nContexto:\n${JSON.stringify(contexto_adicional || {})}`

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent'
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }

    const r = await fetch(`${url}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await r.json()

    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const result = {
      analise_id: crypto.randomUUID(),
      contrato_id,
      resultado_bruto: json,
      parecer: text,
      riscos_detectados: [],
      score_risco: null,
      recomendacoes: [],
    }

    if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
      await supabaseServer.from('analises_ia').insert({
        id: result.analise_id,
        usuario_id: null,
        tipo_analise: 'contratacao',
        referencia_id: contrato_id,
        entrada: { documentos },
        resultado: result,
        score_risco: result.score_risco,
        tempo_processamento: null,
      })
    }

    res.status(200).json({ success: true, data: result })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Falha ao processar análise' })
  }
})

router.post('/analisar-parceria', async (req: Request, res: Response): Promise<void> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      res.status(500).json({ success: false, error: 'GEMINI_API_KEY não configurada' })
      return
    }

    const { parceria_id, documentos, contexto_adicional } = req.body || {}
    const textoDocs = Array.isArray(documentos) ? documentos.join('\n') : ''

    const prompt = `Analise a parceria do terceiro setor conforme MROSC e legislação municipal.\nDocumentos:\n${textoDocs}\nContexto:\n${JSON.stringify(contexto_adicional || {})}`

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent'
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }

    const r = await fetch(`${url}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await r.json()

    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const result = {
      analise_id: crypto.randomUUID(),
      parceria_id,
      resultado_bruto: json,
      parecer: text,
      metas_extraidas: [],
      riscos_detectados: [],
      recomendacoes: [],
    }

    if (SUPABASE_CONFIGURED_BACKEND && supabaseServer) {
      await supabaseServer.from('analises_ia').insert({
        id: result.analise_id,
        usuario_id: null,
        tipo_analise: 'parceria',
        referencia_id: parceria_id,
        entrada: { documentos },
        resultado: result,
        score_risco: null,
        tempo_processamento: null,
      })
    }

    res.status(200).json({ success: true, data: result })
  } catch (e) {
    res.status(500).json({ success: false, error: 'Falha ao processar análise' })
  }
})

export default router
