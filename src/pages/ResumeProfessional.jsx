import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function ResumeProfessional() {
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
    projects: []
  })

  const [newExperience, setNewExperience] = useState({ company: '', position: '', startDate: '', endDate: '', description: '', location: '' })
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', field: '', startDate: '', endDate: '' })
  const [newSkill, setNewSkill] = useState('')
  const [newCert, setNewCert] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [newProject, setNewProject] = useState({ name: '', description: '', link: '' })

  const resumeRef = useRef()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setFormData(prev => ({ ...prev, experience: [...prev.experience, { ...newExperience, id: Date.now() }] }))
      setNewExperience({ company: '', position: '', startDate: '', endDate: '', description: '', location: '' })
    }
  }

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setFormData(prev => ({ ...prev, education: [...prev.education, { ...newEducation, id: Date.now() }] }))
      setNewEducation({ institution: '', degree: '', field: '', startDate: '', endDate: '' })
    }
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, { name: newSkill.trim(), id: Date.now() }] }))
      setNewSkill('')
    }
  }

  const addCert = () => {
    if (newCert.trim()) {
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, { name: newCert.trim(), id: Date.now() }] }))
      setNewCert('')
    }
  }

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData(prev => ({ ...prev, languages: [...prev.languages, { name: newLanguage.trim(), id: Date.now() }] }))
      setNewLanguage('')
    }
  }

  const addProject = () => {
    if (newProject.name) {
      setFormData(prev => ({ ...prev, projects: [...prev.projects, { ...newProject, id: Date.now() }] }))
      setNewProject({ name: '', description: '', link: '' })
    }
  }

  const removeItem = (section, id) => {
    setFormData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }))
  }

  const downloadPDF = async () => {
    const element = resumeRef.current
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = pdfWidth / imgWidth
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight * ratio)
    pdf.save(`${formData.fullName || 'curriculo'}.pdf`)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Currículo Profissional</h1>
        <p>Um currículo completo e elegante para destacar sua carreira. Inclua todas suas qualificações.</p>
      </div>

      <div className="resume-builder-layout">
        <div className="form-section" style={{background: 'white', padding: '25px', borderRadius: '12px', maxHeight: '90vh', overflowY: 'auto'}}>
          <h2>Informações Pessoais</h2>
          
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Seu nome" />
          </div>

          <div className="form-group">
            <label>Título Profissional</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Ex: Desenvolvedor Full Stack" />
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
            <label>LinkedIn</label>
            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="linkedin.com/in/seuperfil" />
          </div>

          <div className="form-group">
            <label>Website/Portfólio</label>
            <input type="text" name="website" value={formData.website} onChange={handleInputChange} placeholder="www.seusite.com" />
          </div>

          <div className="form-group">
            <label>Resumo Profissional</label>
            <textarea name="summary" value={formData.summary} onChange={handleInputChange} placeholder="Resumo da sua carreira e objetivos" />
          </div>

          <h3 style={{marginTop: '25px', marginBottom: '15px', color: '#667eea'}}>Experiência Profissional</h3>
          <div className="item-card">
            <input type="text" placeholder="Empresa" value={newExperience.company} onChange={e => setNewExperience(p => ({...p, company: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <input type="text" placeholder="Cargo" value={newExperience.position} onChange={e => setNewExperience(p => ({...p, position: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <input type="text" placeholder="Local" value={newExperience.location} onChange={e => setNewExperience(p => ({...p, location: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
              <input type="text" placeholder="Início" value={newExperience.startDate} onChange={e => setNewExperience(p => ({...p, startDate: e.target.value}))} style={{flex: 1, padding: '10px'}} />
              <input type="text" placeholder="Término" value={newExperience.endDate} onChange={e => setNewExperience(p => ({...p, endDate: e.target.value}))} style={{flex: 1, padding: '10px'}} />
            </div>
            <textarea placeholder="Descrição" value={newExperience.description} onChange={e => setNewExperience(p => ({...p, description: e.target.value}))} style={{width: '100%', padding: '10px', marginBottom: '10px'}} />
            <button className="btn btn-secondary" onClick={addExperience}>+ Adicionar</button>
          </div>
          {formData.experience.map(exp => (
            <div key={exp.id} className="item-card" style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>{exp.position} - {exp.company}</span>
              <button className="btn btn-danger" onClick={() => removeItem('experience', exp.id)}>Remover</button>
            </div>
          ))}

          <h3 style={{marginTop: '25px', marginBottom: '15px', color: '#667eea'}}>Educação</h3>
          <div className="item-card">
            <input type="text" placeholder="Instituição" value={newEducation.institution} onChange={e => setNewEducation(p => ({...p, institution: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <input type="text" placeholder="Grau" value={newEducation.degree} onChange={e => setNewEducation(p => ({...p, degree: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <input type="text" placeholder="Área" value={newEducation.field} onChange={e => setNewEducation(p => ({...p, field: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
              <input type="text" placeholder="Início" value={newEducation.startDate} onChange={e => setNewEducation(p => ({...p, startDate: e.target.value}))} style={{flex: 1, padding: '10px'}} />
              <input type="text" placeholder="Término" value={newEducation.endDate} onChange={e => setNewEducation(p => ({...p, endDate: e.target.value}))} style={{flex: 1, padding: '10px'}} />
            </div>
            <button className="btn btn-secondary" onClick={addEducation}>+ Adicionar</button>
          </div>
          {formData.education.map(edu => (
            <div key={edu.id} className="item-card" style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>{edu.degree} em {edu.field} - {edu.institution}</span>
              <button className="btn btn-danger" onClick={() => removeItem('education', edu.id)}>Remover</button>
            </div>
          ))}

          <h3 style={{marginTop: '25px', marginBottom: '15px', color: '#667eea'}}>Habilidades</h3>
          <div className="item-card">
            <input type="text" placeholder="Nova habilidade" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={e => e.key === 'Enter' && addSkill()} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <button className="btn btn-secondary" onClick={addSkill}>+ Adicionar</button>
          </div>
          <div className="skills-list" style={{marginTop: '10px'}}>
            {formData.skills.map(skill => (
              <span key={skill.id} className="skill-tag" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                {skill.name}
                <button onClick={() => removeItem('skills', skill.id)} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>×</button>
              </span>
            ))}
          </div>

          <h3 style={{marginTop: '25px', marginBottom: '15px', color: '#667eea'}}>Certificações</h3>
          <div className="item-card">
            <input type="text" placeholder="Certificação" value={newCert} onChange={e => setNewCert(e.target.value)} onKeyPress={e => e.key === 'Enter' && addCert()} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <button className="btn btn-secondary" onClick={addCert}>+ Adicionar</button>
          </div>
          {formData.certifications.map(cert => (
            <div key={cert.id} className="item-card" style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>🏆 {cert.name}</span>
              <button className="btn btn-danger" onClick={() => removeItem('certifications', cert.id)}>Remover</button>
            </div>
          ))}

          <h3 style={{marginTop: '25px', marginBottom: '15px', color: '#667eea'}}>Idiomas</h3>
          <div className="item-card">
            <input type="text" placeholder="Idioma" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} onKeyPress={e => e.key === 'Enter' && addLanguage()} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <button className="btn btn-secondary" onClick={addLanguage}>+ Adicionar</button>
          </div>
          {formData.languages.map(lang => (
            <div key={lang.id} className="item-card" style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>🌐 {lang.name}</span>
              <button className="btn btn-danger" onClick={() => removeItem('languages', lang.id)}>Remover</button>
            </div>
          ))}

          <h3 style={{marginTop: '25px', marginBottom: '15px', color: '#667eea'}}>Projetos</h3>
          <div className="item-card">
            <input type="text" placeholder="Nome do projeto" value={newProject.name} onChange={e => setNewProject(p => ({...p, name: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <textarea placeholder="Descrição" value={newProject.description} onChange={e => setNewProject(p => ({...p, description: e.target.value}))} style={{width: '100%', padding: '10px', marginBottom: '10px'}} />
            <input type="text" placeholder="Link" value={newProject.link} onChange={e => setNewProject(p => ({...p, link: e.target.value}))} style={{marginBottom: '10px', width: '100%', padding: '10px'}} />
            <button className="btn btn-secondary" onClick={addProject}>+ Adicionar</button>
          </div>
          {formData.projects.map(proj => (
            <div key={proj.id} className="item-card" style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>📁 {proj.name}</span>
              <button className="btn btn-danger" onClick={() => removeItem('projects', proj.id)}>Remover</button>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{marginBottom: '20px', color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 600}}>Visualização</h2>
          <div ref={resumeRef} className="resume-preview-container resume-professional">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px'}}>
              <div style={{background: '#2c3e50', color: 'white', padding: '30px', margin: '-40px 0 -40px -40px', borderRadius: '8px 0 0 8px'}}>
                <h1 style={{fontSize: '1.5rem', marginBottom: '5px'}}>{formData.fullName || 'Seu Nome'}</h1>
                <p style={{color: '#3498db', marginBottom: '20px'}}>{formData.title}</p>
                
                <div style={{marginBottom: '20px'}}>
                  <h4 style={{borderBottom: '1px solid #34495e', paddingBottom: '5px', marginBottom: '10px'}}>CONTATO</h4>
                  {formData.email && <p style={{fontSize: '0.85rem', marginBottom: '5px'}}>📧 {formData.email}</p>}
                  {formData.phone && <p style={{fontSize: '0.85rem', marginBottom: '5px'}}>📱 {formData.phone}</p>}
                  {formData.address && <p style={{fontSize: '0.85rem', marginBottom: '5px'}}>📍 {formData.address}</p>}
                  {formData.linkedin && <p style={{fontSize: '0.85rem', marginBottom: '5px'}}>💼 {formData.linkedin}</p>}
                  {formData.website && <p style={{fontSize: '0.85rem'}}>🌐 {formData.website}</p>}
                </div>

                {formData.skills.length > 0 && (
                  <div style={{marginBottom: '20px'}}>
                    <h4 style={{borderBottom: '1px solid #34495e', paddingBottom: '5px', marginBottom: '10px'}}>HABILIDADES</h4>
                    {formData.skills.map(s => <p key={s.id} style={{fontSize: '0.85rem', marginBottom: '3px'}}>• {s.name}</p>)}
                  </div>
                )}

                {formData.languages.length > 0 && (
                  <div style={{marginBottom: '20px'}}>
                    <h4 style={{borderBottom: '1px solid #34495e', paddingBottom: '5px', marginBottom: '10px'}}>IDIOMAS</h4>
                    {formData.languages.map(l => <p key={l.id} style={{fontSize: '0.85rem', marginBottom: '3px'}}>🌐 {l.name}</p>)}
                  </div>
                )}

                {formData.certifications.length > 0 && (
                  <div>
                    <h4 style={{borderBottom: '1px solid #34495e', paddingBottom: '5px', marginBottom: '10px'}}>CERTIFICAÇÕES</h4>
                    {formData.certifications.map(c => <p key={c.id} style={{fontSize: '0.85rem', marginBottom: '3px'}}>🏆 {c.name}</p>)}
                  </div>
                )}
              </div>

              <div style={{padding: '20px 0'}}>
                {formData.summary && (
                  <div style={{marginBottom: '25px'}}>
                    <h3 style={{color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '5px', marginBottom: '10px'}}>PERFIL PROFISSIONAL</h3>
                    <p style={{fontSize: '0.9rem', lineHeight: '1.6'}}>{formData.summary}</p>
                  </div>
                )}

                {formData.experience.length > 0 && (
                  <div style={{marginBottom: '25px'}}>
                    <h3 style={{color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '5px', marginBottom: '15px'}}>EXPERIÊNCIA</h3>
                    {formData.experience.map(exp => (
                      <div key={exp.id} style={{marginBottom: '15px'}}>
                        <h4 style={{color: '#333', fontSize: '1rem'}}>{exp.position}</h4>
                        <p style={{color: '#3498db', fontSize: '0.9rem'}}>{exp.company} | {exp.location}</p>
                        <p style={{color: '#7f8c8d', fontSize: '0.85rem'}}>{exp.startDate} - {exp.endDate}</p>
                        <p style={{fontSize: '0.9rem', marginTop: '5px'}}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {formData.education.length > 0 && (
                  <div style={{marginBottom: '25px'}}>
                    <h3 style={{color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '5px', marginBottom: '15px'}}>EDUCAÇÃO</h3>
                    {formData.education.map(edu => (
                      <div key={edu.id} style={{marginBottom: '10px'}}>
                        <h4 style={{color: '#333', fontSize: '1rem'}}>{edu.degree} em {edu.field}</h4>
                        <p style={{color: '#666', fontSize: '0.9rem'}}>{edu.institution}</p>
                        <p style={{color: '#7f8c8d', fontSize: '0.85rem'}}>{edu.startDate} - {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                )}

                {formData.projects.length > 0 && (
                  <div>
                    <h3 style={{color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '5px', marginBottom: '15px'}}>PROJETOS</h3>
                    {formData.projects.map(proj => (
                      <div key={proj.id} style={{marginBottom: '10px'}}>
                        <h4 style={{color: '#333', fontSize: '1rem'}}>📁 {proj.name}</h4>
                        <p style={{fontSize: '0.9rem'}}>{proj.description}</p>
                        {proj.link && <p style={{color: '#3498db', fontSize: '0.85rem'}}>{proj.link}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="btn btn-primary download-btn" onClick={downloadPDF}>
            📥 Baixar em PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeProfessional
