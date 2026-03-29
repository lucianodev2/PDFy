import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function PDFSecurity() {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [fileName, setFileName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState('protect')

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

  const protectPDF = async () => {
    if (!pdfDoc || !password) {
      setMessage('❌ Informe uma senha')
      return
    }
    if (password !== confirmPassword) {
      setMessage('❌ As senhas não coincidem')
      return
    }

    try {
      const pdfBytes = await pdfDoc.save({
        password: password,
        ownerPassword: password,
        permissions: {
          printing: true,
          copying: false,
          modifying: false,
          annotating: false
        }
      })

      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = fileName.replace('.pdf', '_protegido.pdf')
      link.click()
      
      URL.revokeObjectURL(url)
      setMessage('✅ PDF protegido com senha!')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const redactPDF = async () => {
    if (!pdfDoc) return
    
    try {
      const pages = pdfDoc.getPages()
      
      pages.forEach(page => {
        const { width, height } = page.getSize()
        page.drawRectangle({
          x: 50,
          y: height / 2 - 25,
          width: width - 100,
          height: 50,
          color: { r: 0, g: 0, b: 0 },
          opacity: 1
        })
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = fileName.replace('.pdf', '_redigido.pdf')
      link.click()
      
      URL.revokeObjectURL(url)
      setMessage('✅ Informações sensíveis ocultas!')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Segurança de PDF</h1>
        <p>Proteja seus documentos com senha e oculte informações confidenciais.</p>
      </div>

      {!pdfDoc ? (
        <div className="drop-zone" onClick={() => document.getElementById('security-pdf-upload').click()}>
          <span style={{fontSize: '3rem', marginBottom: '15px', display: 'block'}}>🔒</span>
          <h3>Carregar PDF</h3>
          <p>Selecione o arquivo para aplicar segurança</p>
          <input
            type="file"
            id="security-pdf-upload"
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
              className={`btn ${mode === 'protect' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setMode('protect')}
            >
              🔐 Proteger com Senha
            </button>
            <button 
              className={`btn ${mode === 'redact' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setMode('redact')}
            >
              🚫 Ocultar Informações
            </button>
          </div>

          {mode === 'protect' && (
            <div className="item-card">
              <h4>🔐 Proteger com Senha</h4>
              <p>Adicione uma senha para abrir o PDF. O usuário precisará da senha para visualizar o documento.</p>
              
              <div className="form-group">
                <label>Senha</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Digite a senha"
                />
              </div>
              
              <div className="form-group">
                <label>Confirmar Senha</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  placeholder="Confirme a senha"
                />
              </div>

              <button className="btn btn-primary" onClick={protectPDF}>
                🔒 Proteger PDF
              </button>
            </div>
          )}

          {mode === 'redact' && (
            <div className="item-card">
              <h4>🚫 Ocultar Informações Sensíveis</h4>
              <p>Esta ferramenta demonstra como ocultar áreas do PDF. Em uma implementação completa, você poderia selecionar áreas específicas para redigir.</p>
              
              <div className="alert alert-info" style={{margin: '15px 0'}}>
                <strong>Nota:</strong> Esta é uma demonstração. O redaction real requer bibliotecas adicionais para remover permanentemente o conteúdo.
              </div>

              <button className="btn btn-primary" onClick={redactPDF}>
                🚫 Aplicar Redação
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

export default PDFSecurity
