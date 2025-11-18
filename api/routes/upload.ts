import { Router, type Request, type Response } from 'express'
import multer from 'multer'
import { supabaseServer } from '../lib/supabase'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'Nenhum arquivo enviado' })
      return
    }

    const { originalname, mimetype, buffer, size } = req.file

    if (supabaseServer) {
      const fileName = `${Date.now()}-${originalname}`
      const { data, error } = await supabaseServer.storage
        .from('documentos')
        .upload(fileName, buffer, {
          contentType: mimetype,
          upsert: false
        })

      if (error) {
        console.error('Supabase storage error:', error)
        res.status(500).json({ success: false, error: 'Erro ao fazer upload do arquivo' })
        return
      }

      const { data: urlData } = supabaseServer.storage
        .from('documentos')
        .getPublicUrl(fileName)

      res.status(200).json({
        success: true,
        data: {
          url: urlData.publicUrl,
          fileName,
          size,
          type: mimetype
        }
      })
    } else {
      res.status(200).json({
        success: true,
        data: {
          url: '#',
          fileName: originalname,
          size,
          type: mimetype,
          note: 'Upload não disponível - Supabase não configurado'
        }
      })
    }
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ success: false, error: 'Erro ao processar upload' })
  }
})

export default router