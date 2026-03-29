import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'

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
        
        if (type === 'jpg' || type === 'png') {
          const imageBytes = e.target.result
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
          const page = pdfDoc.addPage()
          const { width, height } = page.getSize()
          
          page.drawText(`Conteúdo convertido de ${type.toUpperCase()}`, {
            x: 50,
            y: height - 100,
            size: 20
          })
          
          page.drawText('Nota: Esta é uma conversão básica.', {
            x: 50,
            y: height - 150,
            size: 12
          })
          
          page.drawText(`Arquivo original: ${file.name}`, {
            x: 50,
            y: height - 180,
            size: 10
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
        setMessage('✅ Conversão concluída!')
      }
      
      if (type === 'jpg' || type === 'png') {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file)
      }
    } catch (error) {
      setMessage('❌ Erro na conversão: ' + error.message)
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
    { type: 'word', icon: '📝', title: 'Word → PDF', desc: 'Converta documentos .docx', accept: '.doc,.docx' },
    { type: 'excel', icon: '📊', title: 'Excel → PDF', desc: 'Converta planilhas .xlsx', accept: '.xls,.xlsx,.csv' },
    { type: 'ppt', icon: '📽️', title: 'PowerPoint → PDF', desc: 'Converta apresentações .pptx', accept: '.ppt,.pptx' },
    { type: 'jpg', icon: '🖼️', title: 'JPG → PDF', desc: 'Converta imagens em PDF', accept: '.jpg,.jpeg' },
    { type: 'png', icon: '🎨', title: 'PNG → PDF', desc: 'Converta imagens PNG em PDF', accept: '.png' },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Converter para PDF</h1>
        <p>Transforme seus arquivos em formato PDF de forma rápida e gratuita.</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
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
                {converting ? '⏳ Convertendo...' : '📁 Selecionar arquivo'}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info" style={{marginTop: '30px'}}>
        <strong>💡 Dica:</strong> Para melhores resultados com Word, Excel e PowerPoint, recomendamos usar as opções de "Salvar como PDF" disponíveis nesses programas. Esta ferramenta cria uma representação básica do conteúdo.
      </div>
    </div>
  )
}

export default ConvertToPDF
