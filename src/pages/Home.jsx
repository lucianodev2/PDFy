import { Link } from 'react-router-dom'
import { PDFyFullLogo } from '../App'

function Home() {
  const tools = [
    { path: '/resume/simple', icon: '📄', title: 'Currículo Simples', desc: 'Crie um currículo limpo e direto em minutos com nosso editor intuitivo.' },
    { path: '/resume/professional', icon: '📋', title: 'Currículo Profissional', desc: 'Destaque sua carreira com um currículo completo e design elegante.' },
    { path: '/convert/to-pdf', icon: '📥', title: 'Converter para PDF', desc: 'Transforme Word, Excel, PowerPoint e imagens em PDF facilmente.' },
    { path: '/convert/from-pdf', icon: '📤', title: 'Converter de PDF', desc: 'Extraia conteúdo de PDFs para Word, Excel, imagens e mais formatos.' },
    { path: '/edit', icon: '✏️', title: 'Editar PDF', desc: 'Adicione texto, imagens, anotações e personalize seus documentos.' },
    { path: '/security', icon: '🔐', title: 'Segurança PDF', desc: 'Proteja documentos com senha e oculte informações sensíveis.' },
    { path: '/signature', icon: '✍️', title: 'Assinatura Digital', desc: 'Assine documentos digitalmente e solicite assinaturas de outras pessoas.' },
    { path: '/ocr', icon: '📸', title: 'OCR Inteligente', desc: 'Transforme PDFs escaneados e imagens em texto editável.' },
    { path: '/tools', icon: '🛠️', title: 'Mais Ferramentas', desc: 'Girar, mesclar, dividir, comprimir e muito mais para seus PDFs.' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="hero" style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <PDFyFullLogo height={56} />
        </div>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Tudo que você precisa para criar, converter, editar e proteger seus documentos PDF em um só lugar.
        </p>
        <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/convert/to-pdf" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
            📥 Converter para PDF
          </Link>
          <Link to="/resume/simple" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
            📄 Criar Currículo
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="page-container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Todas as Ferramentas
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Escolha a ferramenta que você precisa</p>
        </div>

        <div className="home-grid">
          {tools.map((tool) => (
            <Link key={tool.path} to={tool.path} className="home-card">
              <span className="icon">{tool.icon}</span>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="page-container" style={{ marginTop: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Por que escolher o PDFy?
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚡</div>
            <h3 style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Rápido e Fácil</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Processamento instantâneo direto no seu navegador</p>
          </div>
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔒</div>
            <h3 style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>100% Seguro</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Seus arquivos nunca saem do seu computador</p>
          </div>
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>💯</div>
            <h3 style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Gratuito</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Todas as ferramentas são gratuitas para usar</p>
          </div>
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📱</div>
            <h3 style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Responsivo</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Funciona perfeitamente em qualquer dispositivo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
