import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import Login from './pages/Login'
import ResumeSimple from './pages/ResumeSimple'
import ResumeProfessional from './pages/ResumeProfessional'
import ConvertToPDF from './pages/ConvertToPDF'
import ConvertFromPDF from './pages/ConvertFromPDF'
import EditPDF from './pages/EditPDF'
import PDFSecurity from './pages/PDFSecurity'
import DigitalSignature from './pages/DigitalSignature'
import OCR from './pages/OCR'
import PDFOtherTools from './pages/PDFOtherTools'
import './App.css'

// PDFy Logo Component - Refined Version
function PDFyLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pdfyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>
      {/* Background with rounded corners */}
      <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#pdfyGradient)" filter="url(#shadow)"/>
      
      {/* Document icon - centered and properly sized */}
      <g transform="translate(12, 10)">
        {/* Document body */}
        <path 
          d="M2 4C2 2.89543 2.89543 2 4 2H14L20 8V20C20 21.1046 19.1046 22 18 22H4C2.89543 22 2 21.1046 2 20V4Z" 
          fill="white"
        />
        {/* Folded corner */}
        <path 
          d="M14 2V8H20" 
          fill="#E5E7EB"
        />
        {/* PDF label on document */}
        <rect x="5" y="12" width="12" height="6" rx="1.5" fill="#DC2626"/>
        <text 
          x="11" 
          y="17" 
          textAnchor="middle" 
          fill="white" 
          fontSize="4" 
          fontWeight="800" 
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.3"
        >PDF</text>
      </g>
    </svg>
  )
}

// PDFy Full Logo with text - for larger displays
function PDFyFullLogo({ height = 40 }) {
  const scale = height / 40
  return (
    <svg width={140 * scale} height={height} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pdfyGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="60%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      
      {/* Icon */}
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="40" height="40" rx="10" fill="url(#pdfyGradientFull)"/>
        <path 
          d="M10 10C10 8.89543 10.8954 8 12 8H22L28 14V28C28 29.1046 27.1046 30 26 30H12C10.8954 30 10 29.1046 10 28V10Z" 
          fill="white"
        />
        <path d="M22 8V14H28" fill="#E5E7EB"/>
        <rect x="13" y="18" width="12" height="7" rx="2" fill="#DC2626"/>
        <text 
          x="19" 
          y="23.5" 
          textAnchor="middle" 
          fill="white" 
          fontSize="5" 
          fontWeight="800" 
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.3"
        >PDF</text>
      </g>
      
      {/* Text "PDFy" */}
      <text 
        x="50" 
        y="29" 
        fill="url(#textGradient)" 
        fontSize="26" 
        fontWeight="800" 
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-0.5"
      >PDFy</text>
    </svg>
  )
}

function Navigation() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path ? 'active' : ''
  
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PDFyLogo size={38} />
          <span style={{ 
            fontSize: '1.6rem', 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #DC2626 0%, #DC2626 60%, #1E40AF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px'
          }}>PDFy</span>
        </Link>
      </div>
      <div className="nav-links">
        <div className="dropdown">
          <button className="dropbtn">Currículos</button>
          <div className="dropdown-content">
            <Link to="/resume/simple" className={isActive('/resume/simple')}>Simples</Link>
            <Link to="/resume/professional" className={isActive('/resume/professional')}>Profissional</Link>
          </div>
        </div>
        
        <div className="dropdown">
          <button className="dropbtn">Converter</button>
          <div className="dropdown-content">
            <Link to="/convert/to-pdf" className={isActive('/convert/to-pdf')}>Para PDF</Link>
            <Link to="/convert/from-pdf" className={isActive('/convert/from-pdf')}>De PDF</Link>
          </div>
        </div>
        
        <Link to="/edit" className={isActive('/edit')}>Editar</Link>
        <Link to="/security" className={isActive('/security')}>Segurança</Link>
        <Link to="/signature" className={isActive('/signature')}>Assinar</Link>
        <Link to="/ocr" className={isActive('/ocr')}>OCR</Link>
        <Link to="/tools" className={isActive('/tools')}>Mais</Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}

// Export logo components for use in other pages
export { PDFyLogo, PDFyFullLogo }

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume/simple" element={<ResumeSimple />} />
            <Route path="/resume/professional" element={<ResumeProfessional />} />
            <Route path="/convert/to-pdf" element={<ConvertToPDF />} />
            <Route path="/convert/from-pdf" element={<ConvertFromPDF />} />
            <Route path="/edit" element={<EditPDF />} />
            <Route path="/security" element={<PDFSecurity />} />
            <Route path="/signature" element={<DigitalSignature />} />
            <Route path="/ocr" element={<OCR />} />
            <Route path="/tools" element={<PDFOtherTools />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
