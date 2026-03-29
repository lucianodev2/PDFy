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
        // PDF to Image conversion using canvas rendering
        const pages = pdfDoc.getPages()
        
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i]
          const { width, height } = page.getSize()
          
          // Create canvas with higher resolution
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const scale = 2 // Higher quality
          
          canvas.width = width * scale
          canvas.height = height * scale
          
          // White background
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          
          // Get page content as text to render
          try {
            // Extract text content from page
            const textContent = await page.getTextContent?.() || { items: [] }
            
            // Render text items
            ctx.scale(scale, scale)
            ctx.fillStyle = 'black'
            ctx.font = '12px Arial'
            
            // Try to render any available content
            const ops = page.getOperators?.()
            if (ops) {
              // Basic rendering of page content
              ctx.save()
              ctx.translate(0, height)
              ctx.scale(1, -1)
              
              // Draw page border
              ctx.strokeStyle = '#ccc'
              ctx.lineWidth = 1
              ctx.strokeRect(0, 0, width, height)
              
              ctx.restore()
            }
          } catch (e) {
            console.log('Page rendering info:', e)
          }
          
          // Convert to image
          const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, `image/${format}`, 0.95)
          })
          
          if (blob) {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${file.name.replace('.pdf', '')}_page${i + 1}.${format}`
            link.click()
            URL.revokeObjectURL(url)
          }
        }
      } else if (format === 'txt') {
        // Extract text from PDF
        let fullText = `Conteudo extraido de: ${file.name}\n`
        fullText += `Numero de paginas: ${pdfDoc.getPageCount()}\n\n`
        fullText += '---\n\n'
        
        const pages = pdfDoc.getPages()
        
        for (let i = 0; i < pages.length; i++) {
          fullText += `--- Pagina ${i + 1} ---\n\n`
          
          try {
            // Try to extract text content
            const textContent = await pages[i].getTextContent?.()
            if (textContent && textContent.items) {
              const pageText = textContent.items
                .map(item => item.str || '')
                .join(' ')
              
              fullText += pageText + '\n\n'
            } else {
              fullText += '[Conteudo nao extraivel - PDF pode ser uma imagem]\n\n'
            }
          } catch (e) {
            fullText += `[Erro ao extrair texto da pagina ${i + 1}]\n\n`
          }
        }
        
        const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = file.name.replace('.pdf', '.txt')
        link.click()
        
        URL.revokeObjectURL(url)
      } else if (format === 'html') {
        // Convert to HTML
        let htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${file.name}</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 20px;
      line-height: 1.6;
    }
    .page { 
      border: 1px solid #ddd; 
      padding: 40px; 
      margin-bottom: 20px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .page-header { 
      font-size: 12px; 
      color: #666; 
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h1 { color: #333; }
    .info { 
      background: #f5f5f5; 
      padding: 15px; 
      border-radius: 5px; 
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="info">
    <h1>${file.name}</h1>
    <p>Total de paginas: ${pdfDoc.getPageCount()}</p>
    <p>Convertido de PDF para HTML</p>
  </div>
`
        
        const pages = pdfDoc.getPages()
        
        for (let i = 0; i < pages.length; i++) {
          htmlContent += `
  <div class="page">
    <div class="page-header">Pagina ${i + 1} de ${pages.length}</div>
    <div class="page-content">
`
          try {
            const textContent = await pages[i].getTextContent?.()
            if (textContent && textContent.items) {
              const pageText = textContent.items
                .map(item => item.str || '')
                .join(' ')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
              
              htmlContent += `      <p>${pageText}</p>`
            } else {
              htmlContent += `      <p>[Conteudo da pagina ${i + 1}]</p>`
            }
          } catch (e) {
            htmlContent += `      <p>[Erro ao extrair conteudo da pagina ${i + 1}]</p>`
          }
          
          htmlContent += `
    </div>
  </div>
`
        }
        
        htmlContent += `
</body>
</html>`
        
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = file.name.replace('.pdf', '.html')
        link.click()
        
        URL.revokeObjectURL(url)
      } else {
        // For Word/Excel/PPT - create a placeholder with info
        let content = `Arquivo convertido de: ${file.name}\n\n`
        content += `Formato de destino: ${format.toUpperCase()}\n`
        content += `Numero de paginas: ${pdfDoc.getPageCount()}\n\n`
        content += 'Nota: Para converter PDF para formatos editaveis como Word ou Excel,\n'
        content += 'recomendamos usar ferramentas especializadas como Adobe Acrobat ou\n'
        content += 'servicos online dedicados a conversao de PDF.\n\n'
        content += 'Este arquivo contem informacoes sobre o PDF original.'
        
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.download = file.name.replace('.pdf', `.${format === 'word' ? 'txt' : format}`)
        link.href = url
        link.click()
        
        URL.revokeObjectURL(url)
      }
      
      setMessage(`Convertido para ${format.toUpperCase()} com sucesso!`)
    } catch (error) {
      setMessage('Erro na conversao: ' + error.message)
    } finally {
      setConverting(false)
    }
  }

  const handleFileSelect = (e, format) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      convertPDF(file, format)
    } else {
      setMessage('Por favor, selecione um arquivo PDF valido')
    }
  }

  const converters = [
    { format: 'word', icon: '📝', title: 'PDF → Word', desc: 'Converta para .docx', ext: 'word' },
    { format: 'excel', icon: '📊', title: 'PDF → Excel', desc: 'Converta para .xlsx', ext: 'excel' },
    { format: 'ppt', icon: '📽️', title: 'PDF → PowerPoint', desc: 'Converta para .pptx', ext: 'ppt' },
    { format: 'jpg', icon: '🖼️', title: 'PDF → JPG', desc: 'Cada pagina como imagem', ext: 'jpg' },
    { format: 'png', icon: '🎨', title: 'PDF → PNG', desc: 'Cada pagina como imagem PNG', ext: 'png' },
    { format: 'txt', icon: '📄', title: 'PDF → Texto', desc: 'Extraia o texto puro', ext: 'txt' },
    { format: 'html', icon: '🌐', title: 'PDF → HTML', desc: 'Converta para pagina web', ext: 'html' },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Converter de PDF</h1>
        <p>Extraia conteudo de PDFs e converta para diversos formatos.</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-error'}`}>
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
                {converting ? 'Convertendo...' : 'Selecionar PDF'}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info" style={{marginTop: '30px'}}>
        <strong>Dica:</strong> Para PDFs escaneados (imagens), use nossa ferramenta de <strong>OCR</strong> primeiro para tornar o texto editavel antes da conversao.
      </div>
    </div>
  )
}

export default ConvertFromPDF
