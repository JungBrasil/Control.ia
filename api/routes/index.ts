import { Router } from 'express'
import authRoutes from './auth.js'
import iaRoutes from './ia.js'
import normasRoutes from './normas.js'
import ouvidoriaRoutes from './ouvidoria.js'
import auditoriasRoutes from './auditorias.js'
import orcamentoRoutes from './orcamento.js'
import disciplinarRoutes from './disciplinar.js'
import transparenciaRoutes from './transparencia.js'
import uploadRoutes from './upload.js'

const router = Router()

// Consolidate all routes under a single router
router.use('/auth', authRoutes)
router.use('/ia', iaRoutes)
router.use('/normas', normasRoutes)
router.use('/ouvidoria', ouvidoriaRoutes)
router.use('/auditorias', auditoriasRoutes)
router.use('/orcamento', orcamentoRoutes)
router.use('/disciplinar', disciplinarRoutes)
router.use('/transparencia', transparenciaRoutes)
router.use('/upload', uploadRoutes)

export default router