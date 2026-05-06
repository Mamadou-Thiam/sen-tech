import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { FaKey, FaEnvelope, FaLock, FaGraduationCap, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError('Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          padding: '40px 40px 32px',
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '180px',
            height: '180px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              margin: '0 auto 20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <FaKey />
            </div>
            <h2 style={{ 
              fontSize: '28px',
              fontWeight: '800',
              marginBottom: '8px'
            }}>
              Connexion
            </h2>
            <p style={{ 
              fontSize: '16px',
              color: '#ffffff',
              fontWeight: '600',
              margin: 0
            }}>
              Accédez à votre espace de formation
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '32px 40px' }}>
          {error && (
            <div style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              color: '#991b1b',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#1e293b',
              fontSize: '14px'
            }}>
              <FaEnvelope style={{ marginRight: '8px', color: '#6366f1' }} />
              Adresse email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="exemple@email.com"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                background: '#f8fafc'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#6366f1'
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.background = '#f8fafc'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#1e293b',
              fontSize: '14px'
            }}>
              <FaLock style={{ marginRight: '8px', color: '#6366f1' }} />
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '14px 46px 14px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6366f1'
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.background = '#f8fafc'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 2
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '700',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                Connexion en cours...
              </>
            ) : (
              <>
                Se connecter
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          padding: '24px 40px',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            Pas encore de compte ?{' '}
            <Link 
              to="/register"
              style={{
                color: '#6366f1',
                fontWeight: '700',
                textDecoration: 'none',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#6366f1'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              Créer un compte →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
