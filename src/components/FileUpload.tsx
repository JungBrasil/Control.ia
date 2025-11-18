import { useState } from 'react'

export default function FileUpload({ onUploadComplete }: { onUploadComplete: (url: string, fileName: string, size: number) => void }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erro ao fazer upload')
      }

      if (result.data.url !== '#') {
        onUploadComplete(result.data.url, result.data.fileName, result.data.size)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload do arquivo')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm font-medium">Upload de Documento</span>
        <input
          type="file"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>
      {uploading && <div className="text-sm text-blue-600">Fazendo upload...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  )
}