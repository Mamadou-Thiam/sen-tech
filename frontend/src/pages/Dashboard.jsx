import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getMyEnrollments } from '../services/enrollmentService'
import { FaTachometerAlt, FaBookOpen, FaClock, FaCheckCircle, FaExclamationTriangle, FaArrowRight, FaGraduationCap } from 'react-icons/fa'

const Dashboard = () => {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEnrollments()
  }, [])

  const loadEnrollments = async () => {
    try {
      const res = await getMyEnrollments()
      setEnrollments(res.data)
    } catch (err) {
      console.error('Erreur chargement inscriptions:', err)
    } finally {
      setLoading(false)
    }
  }

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date()
  }

  const activeEnrollments = enrollments.filter(e => e.isActive && !isExpired(e.endDate))
  const expiredEnrollments = enrollments.filter(e => isExpired(e.endDate))

  return (
    <div className="container" style={{ maxWidth: '1280px' }}>
      {/* Welcome Header */}
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #0ea5e9 100%)',
        borderRadius: '24px',
        marginBottom: '32px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: '800',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: '800',
              marginBottom: '8px'
            }}>
              Bienvenue, {user?.name}! 👋
            </h2>
            <p style={{ 
              fontSize: '18px',
              color: '#ffffff',
              fontWeight: '600',
              margin: 0
            }}>
              Votre espace personnel de formation
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Active Enrollments Card */}
        <div style={{
          padding: '28px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #10b981, #059669)'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}>
              <FaCheckCircle />
            </div>
          </div>
          
          <h3 style={{ 
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px'
          }}>
            Accès Actifs
          </h3>
          <p style={{ 
            fontSize: '42px',
            fontWeight: '800',
            color: '#10b981',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            {activeEnrollments.length}
          </p>
          <Link 
            to="/my-enrollments"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#10b981',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Voir tous mes accès <FaArrowRight style={{ fontSize: '12px' }} />
          </Link>
        </div>

        {/* Available Courses Card */}
        <div style={{
          padding: '28px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #6366f1, #4f46e5)'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}>
              <FaBookOpen />
            </div>
          </div>
          
          <h3 style={{ 
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px'
          }}>
            Formations Disponibles
          </h3>
          <p style={{ 
            fontSize: '42px',
            fontWeight: '800',
            color: '#6366f1',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            ∞
          </p>
          <Link 
            to="/courses"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6366f1',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Parcourir les formations <FaArrowRight style={{ fontSize: '12px' }} />
          </Link>
        </div>

        {/* Expired Card */}
        <div style={{
          padding: '28px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #f59e0b, #d97706)'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}>
              <FaClock />
            </div>
          </div>
          
          <h3 style={{ 
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px'
          }}>
            Accès Expirés
          </h3>
          <p style={{ 
            fontSize: '42px',
            fontWeight: '800',
            color: '#f59e0b',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            {expiredEnrollments.length}
          </p>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#f59e0b',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            <FaExclamationTriangle style={{ fontSize: '12px' }} /> Nécessitent un renouvellement
          </span>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div style={{
        padding: '32px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#1e293b'
        }}>
          <FaGraduationCap style={{ color: '#6366f1' }} />
          Mes Derniers Accès
        </h3>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : enrollments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {enrollments.slice(0, 5).map((enrollment) => {
              const expired = isExpired(enrollment.endDate)
              return (
                <div 
                  key={enrollment._id}
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                    borderRadius: '16px',
                    border: `1px solid ${expired ? '#fde68a' : '#bbf7d0'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: expired 
                        ? 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)'
                        : 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {expired ? '⚠️' : '✅'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ 
                        fontSize: '16px',
                        color: '#1e293b',
                        display: 'block',
                        marginBottom: '4px'
                      }}>
                        {enrollment.course?.title}
                      </strong>
                      <span style={{ 
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        Fin d'accès: {new Date(enrollment.endDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <span style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    background: expired ? '#fef3c7' : '#d1fae5',
                    color: expired ? '#92400e' : '#065f46'
                  }}>
                    {expired ? 'Expiré' : 'Actif'}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <div className="empty-state-text">Aucune inscription pour le moment</div>
            <Link to="/courses" className="btn btn-primary">
              Découvrir les formations
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
