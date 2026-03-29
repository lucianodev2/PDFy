import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'

function DigitalSignature() {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [fileName, setFileName] = useState('')
  const [signatureData, setSignatureData] = useState('')
  const [signerName, setSignerName] = useState('')
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState('sign')
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const loadPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const loadedPdf = await PDFDocument.load(arrayBuffer)
      setPdfDoc(loadedPdf)
      setFileName(file.name)
      setMessage('✅ PDF carregado!')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      const canvas = canvasRef.current
      setSignatureData(canvas.toDataURL())
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignatureData('')
  }

  const signPDF = async () => {
    if (!pdfDoc || !signerName) {
      setMessage('❌ Informe seu nome e desenhe a assinatura')
      return
    }

    try {
      const pages = pdfDoc.getPages()
      const lastPage = pages[pages.length - 1]
      const { width, height } = lastPage.getSize()

      lastPage.drawText(`Assinado digitalmente por: ${signerName}`, {
        x: 50,
        y: 100,
        size: 10,
        color: { r: 0, g: 0, b: 0 }
      })

      lastPage.drawText(`Data: ${new Date().toLocaleDateString()}`, {
        x: 50,
        y: 85,
        size: 10,
        color: { r: 0, g: 0, b: 0 }
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = fileName.replace('.pdf', '_assinado.pdf')
      link.click()
      
      URL.revokeObjectURL(url)
      setMessage('✅ PDF assinado com sucesso!')
      setSignerName('')
      clearSignature()
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Assinatura Digital</h1>
        <p>Assine documentos digitalmente ou solicite assinaturas de outras pessoas.</p>
      </div>

      {!pdfDoc ? (
        <div className="drop-zone" onClick={() => document.getElementById('sign-pdf-upload').click()}>
          <span style={{fontSize: '3rem', marginBottom: '15px', display: 'block'}}>✍️</span>
          <h3>Carregar PDF para Assinar</h3>
          <p>Selecione o documento que deseja assinar</p>
          <input
            type="file"
            id="sign-pdf-upload"
            accept=".pdf"
            onChange={(e) => e.target.files[0] && loadPDF(e.target.files[0])}
            style={{display: 'none'}}
          />
        </div>
      ) : (
        <div>
          <div className="alert alert-success">
            <strong>📄 {fileName}</strong>
            <button className="btn btn-outline" onClick={() => {setPdfDoc(null); setFileName('')}} style={{marginLeft: '15px'}}>
              Trocar arquivo
            </button>
          </div>

          <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
            <button 
              className={`btn ${mode === 'sign' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setMode('sign')}
            >
              ✍️ Assinar Documento
            </button>
            <button 
              className={`btn ${mode === 'request' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setMode('request')}
            >
              📨 Solicitar Assinatura
            </button>
          </div>

          {mode === 'sign' && (
            <div>
              <div className="item-card" style={{marginBottom: '20px'}}>
                <h4>✍️ Sua Assinatura</h4>
                <p>Desenhe sua assinatura no quadro abaixo:</p>
                
                <div style={{border: '2px solid #ddd', borderRadius: '8px', margin: '15px 0'}}>
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{cursor: 'crosshair', display: 'block', margin: '0 auto'}}
                  />
                </div>
                
                <button className="btn btn-outline" onClick={clearSignature}>
                  🗑️ Limpar Assinatura
                </button>
              </div>

              <div className="item-card">
                <h4>👤 Informações do Signatário</h4>
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input 
                    type="text" 
                    value={signerName} 
                    onChange={e => setSignerName(e.target.value)} 
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <button className="btn btn-primary" onClick={signPDF}>
                  ✍️ Assinar e Baixar PDF
                </button>
              </div>
            </div>
          )}

          {mode === 'request' && (
            <div className="item-card">
              <h4>📨 Solicitar Assinatura</h4>
              <p>Envie uma solicitação de assinatura para outras pessoas.</p>
              
              <div className="form-group">
                <label>Email do Signatário</label>
                <input type="email" placeholder="email@exemplo.com" />
              </div>
              
              <div className="form-group">
                <label>Mensagem</label>
                <textarea placeholder="Mensagem opcional para o signatário" />
              </div>

              <div className="alert alert-info">
                <strong>Nota:</strong> Em uma implementação completa, esta funcionalidade enviaria um email com link para assinatura.
              </div>

              <button className="btn btn-primary" onClick={() => setMessage('✅ Solicitação enviada!')}>
                📨 Enviar Solicitação
              </button>
            </div>
          )}

          {message && (
            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`} style={{marginTop: '20px'}}>
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DigitalSignature
