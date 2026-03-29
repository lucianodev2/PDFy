import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/'
    }, 1500)
  }

  return (
    <div className="login-page">
      {/* Left Panel - Login Form */}
      <div className="login-panel">
        <div className="login-content">
          {/* Header */}
          <header className="login-header">
            <Link to="/" className="login-brand">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <rect width="48" height="48" rx="12" fill="url(#brandGradient)"/>
                <path d="M14 16C14 14.895 14.895 14 16 14H26L34 22V32C34 33.105 33.105 34 32 34H16C14.895 34 14 33.105 14 32V16Z" fill="white"/>
                <path d="M26 14V22H34" fill="white" fillOpacity="0.6"/>
                <rect x="18" y="24" width="12" height="6" rx="2" fill="#6366F1"/>
              </svg>
              <span>PDFy</span>
            </Link>
          </header>

          {/* Main Form */}
          <main className="login-main">
            <div className="login-intro">
              <h1>Welcome back</h1>
              <p>Sign in to access your documents and tools</p>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <button className="social-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <button className="social-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-field">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-field">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span className="label-text">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-link">
                  Forgot password?
                </Link>
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="signup-prompt">
              Don't have an account?{' '}
              <Link to="/signup" className="text-link">Create account</Link>
            </p>
          </main>

          {/* Footer */}
          <footer className="login-footer">
            <p>Protected by reCAPTCHA and subject to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a></p>
          </footer>
        </div>
      </div>

      {/* Right Panel - Hero */}
      <div className="hero-panel">
        <div className="hero-content">
          {/* Feature Icons Row */}
          <div className="feature-icons">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
          </div>

          {/* Hero Text */}
          <h2 className="hero-title">
            Manage your PDFs with ease
          </h2>
          <p className="hero-subtitle">
            Edit, convert, sign, and organize your documents in one secure platform. 
            Built for professionals who value efficiency.
          </p>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">10M+</span>
              <span className="stat-label">Documents processed</span>
            </div>
            <div className="stat">
              <span className="stat-value">50+</span>
              <span className="stat-label">PDF tools</span>
            </div>
            <div className="stat">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="hero-bg">
          <div className="gradient-overlay"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
