import { useState } from 'react'
import { PDFDocument, degrees } from 'pdf-lib'

function PDFOtherTools() {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [fileName, setFileName] = useState('')
  const [message, setMessage] = useState('')
  const [activeTool, setActiveTool] = useState(null)
  const [rotation, setRotation] = useState(90)

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

  const rotatePDF = async () => {
    if (!pdfDoc) return
    
    try {
      const pages = pdfDoc.getPages()
      pages.forEach(page => {
        page.setRotation(degrees(rotation))
      })

      const pdfBytes = await pdfDoc.save()
      downloadPDF(pdfBytes, '_rotacionado')
      setMessage(`✅ PDF rotacionado ${rotation}°!`)
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const repairPDF = async () => {
    if (!pdfDoc) return
    
    try {
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false
      })
      downloadPDF(pdfBytes, '_reparado')
      setMessage('✅ PDF reparado!')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const mergePDFs = async (files) => {
    try {
      const mergedPdf = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach(page => mergedPdf.addPage(page))
      }

      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'merged.pdf'
      link.click()
      
      URL.revokeObjectURL(url)
      setMessage('✅ PDFs mesclados!')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const splitPDF = async () => {
    if (!pdfDoc) return
    
    try {
      const pageCount = pdfDoc.getPageCount()
      
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create()
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i])
        newPdf.addPage(copiedPage)
        
        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = `${fileName.replace('.pdf', '')}_pagina${i + 1}.pdf`
        link.click()
        
        URL.revokeObjectURL(url)
      }
      
      setMessage(`✅ PDF dividido em ${pageCount} arquivos!`)
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const compressPDF = async () => {
    if (!pdfDoc) return
    
    try {
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false
      })
      downloadPDF(pdfBytes, '_comprimido')
      setMessage('✅ PDF otimizado!')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const downloadPDF = async (pdfBytes, suffix) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = fileName.replace('.pdf', `${suffix}.pdf`)
    link.click()
    
    URL.revokeObjectURL(url)
  }

  const tools = [
    { id: 'rotate', icon: '🔄', title: 'Girar PDF', desc: 'Rotacione todas as páginas' },
    { id: 'repair', icon: '🔧', title: 'Reparar PDF', desc: 'Tente corrigir PDFs corrompidos' },
    { id: 'merge', icon: '➕', title: 'Mesclar PDFs', desc: 'Combine múltiplos PDFs' },
    { id: 'split', icon: '✂️', title: 'Dividir PDF', desc: 'Separe em arquivos individuais' },
    { id: 'compress', icon: '📦', title: 'Comprimir PDF', desc: 'Reduza o tamanho do arquivo' },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mais Ferramentas</h1>
        <p>Ferramentas adicionais para organizar e otimizar seus PDFs.</p>
      </div>

      <div className="tools-grid">
        {tools.map(tool => (
          <div 
            key={tool.id} 
            className="tool-card"
            onClick={() => setActiveTool(tool.id)}
            style={{cursor: 'pointer', border: activeTool === tool.id ? '2px solid #667eea' : 'none'}}
          >
            <h4>{tool.icon} {tool.title}</h4>
            <p>{tool.desc}</p>
          </div>
        ))}
      </div>

      {activeTool && activeTool !== 'merge' && (
        <div style={{marginTop: '30px'}}>
          {!pdfDoc ? (
            <div className="drop-zone" onClick={() => document.getElementById('tool-pdf-upload').click()}>
              <span style={{fontSize: '2rem', marginBottom: '10px', display: 'block'}}>📁</span>
              <h4>Selecionar PDF</h4>
              <input
                type="file"
                id="tool-pdf-upload"
                accept=".pdf"
                onChange={(e) => e.target.files[0] && loadPDF(e.target.files[0])}
                style={{display: 'none'}}
              />
            </div>
          ) : (
            <div className="item-card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <strong>📄 {fileName}</strong>
                <button className="btn btn-outline" onClick={() => {setPdfDoc(null); setFileName('')}}>
                  Trocar
                </button>
              </div>

              {activeTool === 'rotate' && (
                <div>
                  <h4>🔄 Girar PDF</h4>
                  <div className="form-group">
                    <label>Ângulo de Rotação</label>
                    <select value={rotation} onChange={e => setRotation(parseInt(e.target.value))} style={{width: '100%', padding: '10px'}}>
                      <option value={90}>90° (Direita)</option>
                      <option value={180}>180° (Inverter)</option>
                      <option value={270}>270° (Esquerda)</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={rotatePDF}>
                    🔄 Girar PDF
                  </button>
                </div>
              )}

              {activeTool === 'repair' && (
                <div>
                  <h4>🔧 Reparar PDF</h4>
                  <p>Tenta corrigir erros e reconstruir o arquivo PDF.</p>
                  <button className="btn btn-primary" onClick={repairPDF}>
                    🔧 Reparar PDF
                  </button>
                </div>
              )}

              {activeTool === 'split' && (
                <div>
                  <h4>✂️ Dividir PDF</h4>
                  <p>Divide o PDF em arquivos separados, uma página cada.</p>
                  <button className="btn btn-primary" onClick={splitPDF}>
                    ✂️ Dividir em Páginas
                  </button>
                </div>
              )}

              {activeTool === 'compress' && (
                <div>
                  <h4>📦 Comprimir PDF</h4>
                  <p>Otimiza o PDF para reduzir o tamanho do arquivo.</p>
                  <button className="btn btn-primary" onClick={compressPDF}>
                    📦 Comprimir PDF
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTool === 'merge' && (
        <div className="item-card" style={{marginTop: '30px'}}>
          <h4>➕ Mesclar PDFs</h4>
          <p>Selecione múltiplos arquivos PDF para combinar em um só.</p>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={(e) => e.target.files.length > 0 && mergePDFs(Array.from(e.target.files))}
            style={{marginTop: '15px'}}
          />
        </div>
      )}

      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`} style={{marginTop: '20px'}}>
          {message}
        </div>
      )}

      <div className="alert alert-info" style={{marginTop: '30px'}}>
        <h4>📱 Digitalizar pelo Celular</h4>
        <p>Para digitalizar documentos usando seu celular, recomendamos apps como:</p>
        <ul style={{marginLeft: '20px', marginTop: '10px'}}>
          <li><strong>Adobe Scan</strong> - Gratuito, OCR integrado</li>
          <li><strong>CamScanner</strong> - Múltiplos modos de captura</li>
          <li><strong>Microsoft Lens</strong> - Integração com Office</li>
          <li><strong>Google Drive</strong> - Digitalização nativa no app</li>
        </ul>
      </div>
    </div>
  )
}

export default PDFOtherTools
