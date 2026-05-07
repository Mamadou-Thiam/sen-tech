import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { FaGraduationCap, FaBook, FaTachometerAlt, FaKey, FaUserPlus, FaSignOutAlt, FaBars, FaTimes, FaShieldAlt, FaDoorOpen } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const NavLink = ({ to, icon, children }) => (
    <Link 
      to={to} 
      onClick={() => setMobileMenuOpen(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 18px',
        borderRadius: '12px',
        fontWeight: isActive(to) ? '700' : '500',
        background: isActive(to) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        borderBottom: isActive(to) ? '2px solid #a5b4fc' : '2px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '15px'
      }}
      onMouseEnter={(e) => {
        if (!isActive(to)) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive(to)) {
          e.currentTarget.style.background = 'transparent'
        }
      }}
    >
      {icon}
      {children}
    </Link>
  )

  return (
    <>
      <nav style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        padding: '0 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          padding: '12px 0'
        }}>
          <img 
            src="/assets/image.png" 
            alt="SEN TECH Logo" 
            style={{
              width: '48px',
              height: '48px',
              objectFit: 'contain',
              borderRadius: '10px'
            }}
          />
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #a5b4fc, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px'
            }}>
              SEN TECH
            </div>
            <div style={{
              fontSize: '11px',
              color: '#94a3b8',
              fontWeight: '500',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              ACADEMY
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="desktop-nav">
          <NavLink to="/courses" icon={<FaBook />}>
            Formations
          </NavLink>
          
          {user ? (
            <>
              <NavLink to="/dashboard" icon={<FaTachometerAlt />}>
                Mon Espace
              </NavLink>
              {user.role !== 'admin' && (
                <NavLink to="/my-enrollments" icon={<FaDoorOpen />}>
                  Mes Accès
                </NavLink>
              )}
              {user.role === 'admin' && (
                <NavLink to="/admin" icon={<FaShieldAlt />}>
                  Admin
                </NavLink>
              )}
              
              {/* User Menu */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginLeft: '16px',
                paddingLeft: '16px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                }}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>
                  {user.name}
                </span>
                <button 
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                    marginLeft: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <FaSignOutAlt />
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  marginLeft: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                }}
              >
                <FaKey /> Connexion
              </Link>
              <Link 
                to="/register"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                  marginLeft: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)'
                }}
              >
                <FaUserPlus /> Inscription
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '20px'
          }}
          className="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Link 
            to="/courses" 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '14px 20px',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              background: isActive('/courses') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <FaBook /> Formations
          </Link>
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '14px 20px',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  background: isActive('/dashboard') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <FaTachometerAlt /> Mon Espace
              </Link>
              {user.role !== 'admin' && (
                <Link 
                  to="/my-enrollments" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '14px 20px',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    background: isActive('/my-enrollments') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <FaDoorOpen /> Mes Accès
                </Link>
              )}
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '14px 20px',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    background: isActive('/admin') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <FaShieldAlt /> Admin
                </Link>
              )}
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                style={{
                  padding: '14px 20px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '8px'
                }}
              >
                <FaSignOutAlt /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '14px 20px',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'center'
                }}
              >
                <FaKey /> Connexion
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '14px 20px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'center'
                }}
              >
                <FaUserPlus /> Inscription
              </Link>
            </>
          )}
        </div>
      )}

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
