import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function ResumeSimple() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    objective: '',
    experience: '',
    education: '',
    skills: ''
  })

  const resumeRef = useRef()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const downloadPDF = async () => {
    const element = resumeRef.current
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    
    pdf.addImage(imgData, 'PNG', imgX, 0, imgWidth * ratio, imgHeight * ratio)
    pdf.save(`${formData.fullName || 'curriculo'}.pdf`)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Currículo Simples</h1>
        <p>Um formato limpo e direto, ideal para candidaturas rápidas. Preencha seus dados e visualize em tempo real.</p>
      </div>

      <div className="resume-builder-layout">
        <div className="form-section">
          <h2>Informações Pessoais</h2>
          
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Seu nome completo" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" />
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Cidade, Estado" />
          </div>

          <div className="form-group">
            <label>Objetivo Profissional</label>
            <textarea name="objective" value={formData.objective} onChange={handleInputChange} placeholder="Breve descrição do seu objetivo profissional" />
          </div>

          <div className="form-group">
            <label>Experiência Profissional</label>
            <textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Descreva sua experiência profissional" />
          </div>

          <div className="form-group">
            <label>Formação Acadêmica</label>
            <textarea name="education" value={formData.education} onChange={handleInputChange} placeholder="Sua formação acadêmica" />
          </div>

          <div className="form-group">
            <label>Habilidades</label>
            <textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Liste suas habilidades separadas por vírgula" />
          </div>
        </div>

        <div>
          <h2 style={{marginBottom: '20px', color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 600}}>Visualização</h2>
          <div ref={resumeRef} className="resume-preview-container resume-simple">
            <div style={{textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '25px'}}>
              <h1 style={{fontSize: '1.8rem', marginBottom: '10px', textTransform: 'uppercase'}}>
                {formData.fullName || 'SEU NOME'}
              </h1>
              <p style={{color: '#666', fontSize: '0.9rem'}}>
                {formData.email && `📧 ${formData.email}`}
                {formData.email && formData.phone && ' | '}
                {formData.phone && `📱 ${formData.phone}`}
              </p>
              <p style={{color: '#666', fontSize: '0.9rem'}}>
                {formData.address}
              </p>
            </div>

            {formData.objective && (
              <div style={{marginBottom: '20px'}}>
                <h3 style={{fontSize: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px'}}>OBJETIVO</h3>
                <p style={{fontSize: '0.9rem', lineHeight: '1.5'}}>{formData.objective}</p>
              </div>
            )}

            {formData.experience && (
              <div style={{marginBottom: '20px'}}>
                <h3 style={{fontSize: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px'}}>EXPERIÊNCIA PROFISSIONAL</h3>
                <p style={{fontSize: '0.9rem', lineHeight: '1.5', whiteSpace: 'pre-wrap'}}>{formData.experience}</p>
              </div>
            )}

            {formData.education && (
              <div style={{marginBottom: '20px'}}>
                <h3 style={{fontSize: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px'}}>FORMAÇÃO ACADÊMICA</h3>
                <p style={{fontSize: '0.9rem', lineHeight: '1.5', whiteSpace: 'pre-wrap'}}>{formData.education}</p>
              </div>
            )}

            {formData.skills && (
              <div>
                <h3 style={{fontSize: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px'}}>HABILIDADES</h3>
                <p style={{fontSize: '0.9rem', lineHeight: '1.5'}}>{formData.skills}</p>
              </div>
            )}
          </div>

          <button className="btn btn-primary download-btn" onClick={downloadPDF}>
            📥 Baixar em PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeSimple
