import { useState, useRef } from 'react'
import { PDFDocument, StandardFonts } from 'pdf-lib'

function ConvertToPDF() {
  const [converting, setConverting] = useState(false)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef()

  const convertFile = async (file, type) => {
    setConverting(true)
    setMessage('')
    
    try {
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        const pdfDoc = await PDFDocument.create()
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
        
        if (type === 'jpg' || type === 'png') {
          // Image to PDF conversion
          const imageBytes = new Uint8Array(e.target.result)
          let image
          if (type === 'jpg') {
            image = await pdfDoc.embedJpg(imageBytes)
          } else {
            image = await pdfDoc.embedPng(imageBytes)
          }
          
          const page = pdfDoc.addPage([image.width, image.height])
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height
          })
        } else {
          // Text-based files to PDF
          const content = e.target.result
          const lines = content.split('\n')
          
          // A4 page size
          const pageWidth = 595
          const pageHeight = 842
          const margin = 50
          const lineHeight = 14
          const maxWidth = pageWidth - (margin * 2)
          
          let currentPage = pdfDoc.addPage([pageWidth, pageHeight])
          let y = pageHeight - margin - 30
          
          // Add title
          const title = `Converted from ${file.name}`
          currentPage.drawText(title, {
            x: margin,
            y: y,
            size: 16,
            font: helveticaBold
          })
          y -= 30
          
          // Add separator line
          currentPage.drawLine({
            start: { x: margin, y: y },
            end: { x: pageWidth - margin, y: y },
            thickness: 1,
            color: { r: 0.8, g: 0.8, b: 0.8 }
          })
          y -= 20
          
          // Process content line by line
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            
            // Check if we need a new page
            if (y < margin + lineHeight) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight])
              y = pageHeight - margin
            }
            
            // Wrap long lines
            const words = line.split(' ')
            let currentLine = ''
            
            for (let word of words) {
              const testLine = currentLine + word + ' '
              const textWidth = helveticaFont.widthOfTextAtSize(testLine, 10)
              
              if (textWidth > maxWidth && currentLine !== '') {
                // Draw current line
                currentPage.drawText(currentLine.trim(), {
                  x: margin,
                  y: y,
                  size: 10,
                  font: helveticaFont
                })
                y -= lineHeight
                
                // Check for new page
                if (y < margin + lineHeight) {
                  currentPage = pdfDoc.addPage([pageWidth, pageHeight])
                  y = pageHeight - margin
                }
                
                currentLine = word + ' '
              } else {
                currentLine = testLine
              }
            }
            
            // Draw remaining text in line
            if (currentLine.trim()) {
              currentPage.drawText(currentLine.trim(), {
                x: margin,
                y: y,
                size: 10,
                font: helveticaFont
              })
            }
            
            y -= lineHeight
          }
          
          // Add page numbers
          const pages = pdfDoc.getPages()
          pages.forEach((page, index) => {
            page.drawText(`Page ${index + 1} of ${pages.length}`, {
              x: pageWidth - margin - 60,
              y: 20,
              size: 8,
              font: helveticaFont,
              color: { r: 0.5, g: 0.5, b: 0.5 }
            })
          })
        }
        
        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = file.name.replace(/\.[^/.]+$/, '') + '.pdf'
        link.click()
        
        URL.revokeObjectURL(url)
        setMessage('Conversao concluida com sucesso!')
      }
      
      if (type === 'jpg' || type === 'png') {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file)
      }
    } catch (error) {
      setMessage('Erro na conversao: ' + error.message)
    } finally {
      setConverting(false)
    }
  }

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      convertFile(file, type)
    }
  }

  const converters = [
    { type: 'word', icon: '📝', title: 'Word → PDF', desc: 'Converta documentos .docx', accept: '.doc,.docx,.txt,.rtf' },
    { type: 'excel', icon: '📊', title: 'Excel → PDF', desc: 'Converta planilhas .xlsx', accept: '.xls,.xlsx,.csv' },
    { type: 'ppt', icon: '📽️', title: 'PowerPoint → PDF', desc: 'Converta apresentacoes .pptx', accept: '.ppt,.pptx' },
    { type: 'jpg', icon: '🖼️', title: 'JPG → PDF', desc: 'Converta imagens em PDF', accept: '.jpg,.jpeg' },
    { type: 'png', icon: '🎨', title: 'PNG → PDF', desc: 'Converta imagens PNG em PDF', accept: '.png' },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Converter para PDF</h1>
        <p>Transforme seus arquivos em formato PDF de forma rapida e gratuita.</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="converter-grid">
        {converters.map((conv) => (
          <div key={conv.type} className="converter-card">
            <div className="icon">{conv.icon}</div>
            <h4>{conv.title}</h4>
            <p>{conv.desc}</p>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept={conv.accept}
                onChange={(e) => handleFileSelect(e, conv.type)}
                id={`file-${conv.type}`}
                disabled={converting}
              />
              <label htmlFor={`file-${conv.type}`} className="file-input-label">
                {converting ? 'Convertendo...' : 'Selecionar arquivo'}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info" style={{marginTop: '30px'}}>
        <strong>Dica:</strong> Para melhores resultados com Word, Excel e PowerPoint, recomendamos usar as opcoes de "Salvar como PDF" disponiveis nesses programas. Esta ferramenta extrai o conteudo texto para PDF.
      </div>
    </div>
  )
}

export default ConvertToPDF
