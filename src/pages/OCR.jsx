import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'

function OCR() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [language, setLanguage] = useState('por')
  const canvasRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setExtractedText('')
      setMessage('')
    }
  }

  const processOCR = async () => {
    if (!file) {
      setMessage('❌ Selecione um arquivo primeiro')
      return
    }

    setProcessing(true)
    setMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      let text = ''
      
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pageCount = pdfDoc.getPageCount()
        
        text = `[OCR SIMULADO - PDF com ${pageCount} páginas]\n\n`
        text += `Arquivo: ${fileName}\n`
        text += `Idioma detectado: ${language === 'por' ? 'Português' : language === 'eng' ? 'Inglês' : 'Espanhol'}\n\n`
        text += `--- TEXTO EXTRAÍDO ---\n\n`
        text += `Este é um exemplo de texto que seria extraído de um PDF escaneado.\n\n`
        text += `Em uma implementação completa com Tesseract.js ou API de OCR,\n`
        text += `o texto real seria extraído das imagens do documento.\n\n`
        text += `Página 1:\n`
        text += `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n`
        text += `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n`
        text += `Página 2:\n`
        text += `Ut enim ad minim veniam, quis nostrud exercitation ullamco.\n`
        text += `Duis aute irure dolor in reprehenderit in voluptate velit esse.\n`
      } else if (file.type.startsWith('image/')) {
        const img = new Image()
        img.src = URL.createObjectURL(file)
        
        await new Promise((resolve) => {
          img.onload = resolve
        })

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        text = `[OCR SIMULADO - Imagem]\n\n`
        text += `Arquivo: ${fileName}\n`
        text += `Dimensões: ${img.width}x${img.height}px\n`
        text += `Idioma: ${language === 'por' ? 'Português' : language === 'eng' ? 'Inglês' : 'Espanhol'}\n\n`
        text += `--- TEXTO DETECTADO ---\n\n`
        text += `Exemplo de texto extraído da imagem.\n`
        text += `Em produção, o Tesseract.js processaria a imagem.\n`

        URL.revokeObjectURL(img.src)
      }

      setExtractedText(text)
      setMessage('✅ OCR concluído!')
    } catch (error) {
      setMessage('❌ Erro no OCR: ' + error.message)
    } finally {
      setProcessing(false)
    }
  }

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName.replace(/\.[^/.]+$/, '') + '_ocr.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText)
    setMessage('✅ Texto copiado!')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>OCR Inteligente</h1>
        <p>Extraia texto automaticamente de PDFs escaneados e imagens.</p>
      </div>

      <div className="drop-zone" onClick={() => document.getElementById('ocr-upload').click()}>
        <span style={{fontSize: '3rem', marginBottom: '15px', display: 'block'}}>📸</span>
        <h3>Carregar Arquivo</h3>
        <p>PDF escaneado ou imagem (JPG, PNG)</p>
        <input
          type="file"
          id="ocr-upload"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          style={{display: 'none'}}
        />
      </div>

      {fileName && (
        <div className="alert alert-info" style={{marginTop: '20px'}}>
          <strong>📄 {fileName}</strong>
        </div>
      )}

      <div className="form-group" style={{marginTop: '20px'}}>
        <label>Idioma do Documento</label>
        <select value={language} onChange={e => setLanguage(e.target.value)} style={{width: '100%', padding: '12px'}}>
          <option value="por">🇧🇷 Português</option>
          <option value="eng">🇺🇸 Inglês</option>
          <option value="spa">🇪🇸 Espanhol</option>
          <option value="fra">🇫🇷 Francês</option>
          <option value="deu">🇩🇪 Alemão</option>
        </select>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={processOCR} 
        disabled={processing || !file}
        style={{width: '100%', marginTop: '20px'}}
      >
        {processing ? '⏳ Processando OCR...' : '🔍 Extrair Texto'}
      </button>

      <canvas ref={canvasRef} style={{display: 'none'}} />

      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`} style={{marginTop: '20px'}}>
          {message}
        </div>
      )}

      {extractedText && (
        <div style={{marginTop: '30px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
            <h3>Texto Extraído</h3>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-outline" onClick={copyToClipboard}>
                📋 Copiar
              </button>
              <button className="btn btn-secondary" onClick={downloadText}>
                💾 Baixar TXT
              </button>
            </div>
          </div>
          <textarea
            value={extractedText}
            onChange={e => setExtractedText(e.target.value)}
            style={{
              width: '100%',
              minHeight: '300px',
              padding: '15px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          />
        </div>
      )}

      <div className="alert alert-info" style={{marginTop: '30px'}}>
        <strong>💡 Nota:</strong> Esta é uma demonstração do OCR. Para OCR real em produção, 
        seria necessário integrar com bibliotecas como Tesseract.js ou serviços de OCR na nuvem 
        (Google Vision API, AWS Textract, Azure Computer Vision).
      </div>
    </div>
  )
}

export default OCR
