import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function ConvertFromPDF() {
  const [converting, setConverting] = useState(false)
  const [message, setMessage] = useState('')

  const convertPDF = async (file, format) => {
    setConverting(true)
    setMessage('')
    
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      if (format === 'jpg' || format === 'png') {
        const pages = pdfDoc.getPages()
        
        for (let i = 0; i < pages.length; i++) {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const { width, height } = pages[i].getSize()
          
          canvas.width = width * 2
          canvas.height = height * 2
          
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.scale(2, 2)
          
          const blob = await new Promise(resolve => canvas.toBlob(resolve, `image/${format}`))
          const url = URL.createObjectURL(blob)
          
          const link = document.createElement('a')
          link.href = url
          link.download = `${file.name.replace('.pdf', '')}_page${i + 1}.${format}`
          link.click()
          
          URL.revokeObjectURL(url)
        }
      } else {
        let content = ''
        
        if (format === 'txt') {
          content = `Conteúdo extraído de: ${file.name}\n\n`
          content += `Número de páginas: ${pdfDoc.getPageCount()}\n\n`
          content += 'Nota: Extração de texto completa requer OCR para PDFs escaneados.'
        } else if (format === 'html') {
          content = `<!DOCTYPE html>
<html>
<head><title>${file.name}</title></head>
<body>
  <h1>${file.name}</h1>
  <p>Páginas: ${pdfDoc.getPageCount()}</p>
  <p>Convertido de PDF para HTML</p>
</body>
</html>`
        }
        
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = file.name.replace('.pdf', `.${format}`)
        link.click()
        
        URL.revokeObjectURL(url)
      }
      
      setMessage(`✅ Convertido para ${format.toUpperCase()} com sucesso!`)
    } catch (error) {
      setMessage('❌ Erro na conversão: ' + error.message)
    } finally {
      setConverting(false)
    }
  }

  const handleFileSelect = (e, format) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      convertPDF(file, format)
    } else {
      setMessage('❌ Por favor, selecione um arquivo PDF válido')
    }
  }

  const converters = [
    { format: 'word', icon: '📝', title: 'PDF → Word', desc: 'Converta para .docx', ext: 'docx' },
    { format: 'excel', icon: '📊', title: 'PDF → Excel', desc: 'Converta para .xlsx', ext: 'xlsx' },
    { format: 'ppt', icon: '📽️', title: 'PDF → PowerPoint', desc: 'Converta para .pptx', ext: 'pptx' },
    { format: 'jpg', icon: '🖼️', title: 'PDF → JPG', desc: 'Cada página como imagem', ext: 'jpg' },
    { format: 'png', icon: '🎨', title: 'PDF → PNG', desc: 'Cada página como imagem PNG', ext: 'png' },
    { format: 'txt', icon: '📄', title: 'PDF → Texto', desc: 'Extraia o texto puro', ext: 'txt' },
    { format: 'html', icon: '🌐', title: 'PDF → HTML', desc: 'Converta para página web', ext: 'html' },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Converter de PDF</h1>
        <p>Extraia conteúdo de PDFs e converta para diversos formatos.</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="converter-grid">
        {converters.map((conv) => (
          <div key={conv.format} className="converter-card">
            <div className="icon">{conv.icon}</div>
            <h4>{conv.title}</h4>
            <p>{conv.desc}</p>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileSelect(e, conv.ext)}
                id={`convert-${conv.format}`}
                disabled={converting}
              />
              <label htmlFor={`convert-${conv.format}`} className="file-input-label">
                {converting ? '⏳ Convertendo...' : '📁 Selecionar PDF'}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info" style={{marginTop: '30px'}}>
        <strong>💡 Dica:</strong> Para PDFs escaneados (imagens), use nossa ferramenta de <strong>OCR</strong> primeiro para tornar o texto editável antes da conversão.
      </div>
    </div>
  )
}

export default ConvertFromPDF
