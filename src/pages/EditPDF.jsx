import { useState, useRef } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

function EditPDF() {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [fileName, setFileName] = useState('')
  const [message, setMessage] = useState('')
  const [editMode, setEditMode] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [xPos, setXPos] = useState(50)
  const [yPos, setYPos] = useState(700)
  const canvasRef = useRef()

  const loadPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const loadedPdf = await PDFDocument.load(arrayBuffer)
      setPdfDoc(loadedPdf)
      setFileName(file.name)
      setMessage('✅ PDF carregado com sucesso!')
    } catch (error) {
      setMessage('❌ Erro ao carregar PDF: ' + error.message)
    }
  }

  const addText = async () => {
    if (!pdfDoc || !textInput) return
    
    try {
      const pages = pdfDoc.getPages()
      const pageIndex = Math.min(pageNum - 1, pages.length - 1)
      const page = pages[pageIndex]
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      page.drawText(textInput, {
        x: parseInt(xPos),
        y: parseInt(yPos),
        size: 12,
        font: font,
        color: rgb(0, 0, 0)
      })
      
      setMessage('✅ Texto adicionado!')
      setTextInput('')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const addWatermark = async () => {
    if (!pdfDoc || !textInput) return
    
    try {
      const pages = pdfDoc.getPages()
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      
      pages.forEach(page => {
        const { width, height } = page.getSize()
        page.drawText(textInput, {
          x: width / 2 - 50,
          y: height / 2,
          size: 50,
          font: font,
          color: rgb(0.8, 0.8, 0.8),
          rotate: { angle: 45 }
        })
      })
      
      setMessage('✅ Marca d\'água adicionada a todas as páginas!')
      setTextInput('')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const addPageNumbers = async () => {
    if (!pdfDoc) return
    
    try {
      const pages = pdfDoc.getPages()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      pages.forEach((page, index) => {
        const { width } = page.getSize()
        page.drawText(`${index + 1}`, {
          x: width / 2,
          y: 30,
          size: 12,
          font: font,
          color: rgb(0, 0, 0)
        })
      })
      
      setMessage('✅ Numeração de páginas adicionada!')
    } catch (error) {
      setMessage('❌ Erro: ' + error.message)
    }
  }

  const savePDF = async () => {
    if (!pdfDoc) return
    
    try {
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = fileName.replace('.pdf', '_editado.pdf')
      link.click()
      
      URL.revokeObjectURL(url)
      setMessage('✅ PDF salvo com sucesso!')
    } catch (error) {
      setMessage('❌ Erro ao salvar: ' + error.message)
    }
  }

  const tools = [
    { id: 'text', icon: '📝', title: 'Adicionar Texto', desc: 'Insira texto em qualquer posição' },
    { id: 'watermark', icon: '💧', title: 'Marca d\'Água', desc: 'Adicione marca d\'água em todas as páginas' },
    { id: 'pagenums', icon: '🔢', title: 'Numerar Páginas', desc: 'Adicione números de página' },
    { id: 'annotate', icon: '📌', title: 'Anotações', desc: 'Adicione comentários e notas' },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Editar PDF</h1>
        <p>Personalize seus documentos adicionando texto, marcas d'água e numeração.</p>
      </div>

      {!pdfDoc ? (
        <div className="drop-zone" onClick={() => document.getElementById('pdf-upload').click()}>
          <span style={{fontSize: '3rem', marginBottom: '15px', display: 'block'}}>📁</span>
          <h3>Carregar PDF para Editar</h3>
          <p>Clique aqui ou arraste um arquivo PDF</p>
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={(e) => e.target.files[0] && loadPDF(e.target.files[0])}
            style={{display: 'none'}}
          />
        </div>
      ) : (
        <div>
          <div className="alert alert-success">
            <strong>📄 {fileName}</strong> - {pdfDoc.getPageCount()} página(s)
            <button className="btn btn-outline" onClick={() => {setPdfDoc(null); setFileName('')}} style={{marginLeft: '15px'}}>
              Trocar arquivo
            </button>
          </div>

          <div className="tools-grid" style={{marginBottom: '30px'}}>
            {tools.map(tool => (
              <div 
                key={tool.id} 
                className="tool-card"
                onClick={() => setEditMode(tool.id)}
                style={{cursor: 'pointer', border: editMode === tool.id ? '2px solid #667eea' : 'none'}}
              >
                <h4>{tool.icon} {tool.title}</h4>
                <p>{tool.desc}</p>
              </div>
            ))}
          </div>

          {editMode === 'text' && (
            <div className="item-card" style={{marginBottom: '20px'}}>
              <h4>📝 Adicionar Texto</h4>
              <div className="form-group">
                <label>Texto</label>
                <input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Digite o texto" />
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
                <div className="form-group">
                  <label>Página</label>
                  <input type="number" value={pageNum} onChange={e => setPageNum(e.target.value)} min="1" />
                </div>
                <div className="form-group">
                  <label>Posição X</label>
                  <input type="number" value={xPos} onChange={e => setXPos(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Posição Y</label>
                  <input type="number" value={yPos} onChange={e => setYPos(e.target.value)} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={addText}>Adicionar Texto</button>
            </div>
          )}

          {editMode === 'watermark' && (
            <div className="item-card" style={{marginBottom: '20px'}}>
              <h4>💧 Adicionar Marca d'Água</h4>
              <div className="form-group">
                <label>Texto da Marca d'Água</label>
                <input type="text" value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Ex: CONFIDENCIAL" />
              </div>
              <button className="btn btn-primary" onClick={addWatermark}>Aplicar Marca d'Água</button>
            </div>
          )}

          {editMode === 'pagenums' && (
            <div className="item-card" style={{marginBottom: '20px'}}>
              <h4>🔢 Numerar Páginas</h4>
              <p>Adicione números de página no rodapé de todas as páginas.</p>
              <button className="btn btn-primary" onClick={addPageNumbers}>Adicionar Numeração</button>
            </div>
          )}

          {editMode === 'annotate' && (
            <div className="item-card" style={{marginBottom: '20px'}}>
              <h4>📌 Anotações</h4>
              <p>Use a ferramenta "Adicionar Texto" para criar anotações no PDF.</p>
            </div>
          )}

          {message && (
            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`} style={{marginBottom: '20px'}}>
              {message}
            </div>
          )}

          <button className="btn btn-primary" onClick={savePDF} style={{width: '100%'}}>
            💾 Salvar PDF Editado
          </button>
        </div>
      )}
    </div>
  )
}

export default EditPDF
