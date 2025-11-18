import { Router, type Request, type Response } from 'express'

const router = Router()

router.get('/execucao/:exercicio', async (req: Request, res: Response): Promise<void> => {
  const exercicio = Number(req.params.exercicio)
  const unidade = String(req.query.unidade || '')
  const categoria = String(req.query.categoria || '')

  const orcado = 1000000
  const empenhado = 650000
  const liquidado = 520000
  const pago = 500000
  const percentual_execucao = Number(((pago / orcado) * 100).toFixed(2))

  const alertas = [] as Array<{ tipo: string; mensagem: string }>
  if (percentual_execucao > 80) alertas.push({ tipo: 'aviso', mensagem: 'Execução próxima ao limite' })

  res.status(200).json({
    success: true,
    data: { orcado, empenhado, liquidado, pago, percentual_execucao, alertas, exercicio, unidade, categoria },
  })
})

export default router