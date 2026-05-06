import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { getCourse } from '../services/courseService'
import { getMyEnrollments } from '../services/enrollmentService'
import { useAuth } from '../context/useAuth'
import api from '../services/api'
import { FaArrowLeft, FaClock, FaMoneyBillWave, FaTag, FaBookOpen, FaPlayCircle, FaGraduationCap, FaLock, FaUsers, FaChartBar, FaTimes } from 'react-icons/fa'

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [showStats, setShowStats] = useState(false)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } })
      return
    }
    loadCourse()
    checkAccess()
  }, [id, user])

  const loadCourse = async () => {
    try {
      const res = await getCourse(id)
      setCourse(res.data)
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkAccess = async () => {
    if (!user) {
      setCheckingAccess(false)
      return
    }
    
    if (user.role === 'admin') {
      setHasAccess(true)
      setCheckingAccess(false)
      return
    }

    try {
      const res = await getMyEnrollments()
      const enrollments = res.data
      console.log('Enrollments found:', enrollments)
      console.log('Looking for Course ID:', id)
      
      const hasValidEnrollment = enrollments.some(e => {
        const courseIdMatch = String(e.course?._id) === String(id)
        console.log('Match found?', courseIdMatch, 'Active?', e.isActive, 'Enrollment:', e)
        return courseIdMatch && e.isActive === true
      })
      
      console.log('Access granted:', hasValidEnrollment)
      setHasAccess(hasValidEnrollment)
    } catch (err) {
      console.error('Erreur vérification accès:', err)
      setHasAccess(false)
    } finally {
      setCheckingAccess(false)
    }
  }

  const loadStats = async () => {
    try {
      const res = await api.get(`/enrollments`)
      const allEnrollments = res.data
      const courseEnrollments = allEnrollments.filter(e => String(e.course?._id) === String(id))
      const active = courseEnrollments.filter(e => e.isActive === true).length
      const inactive = courseEnrollments.length - active
      const revenue = active * (course.price || 0)
      setStats({ total: courseEnrollments.length, active, inactive, revenue })
      setShowStats(true)
    } catch (err) {
      console.error('Erreur stats:', err)
    }
  }

  const getChapterIcon = (index) => {
    const icons = ['🌐', '📝', '🎨', '📦', '🧠', '📊', '⚡', '🔧', '💡', '🚀']
    return icons[index] || '📖'
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-text">Formation non trouvée</div>
          <Link to="/courses" className="btn btn-primary">
            <FaArrowLeft /> Retour aux formations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '1200px' }}>
      {/* Navigation retour */}
      <Link 
        to="/courses" 
        style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
          color: '#6366f1',
          textDecoration: 'none',
          padding: '12px 20px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.3s ease',
          border: '1px solid #e2e8f0'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-4px)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}
      >
        <FaArrowLeft /> Retour aux formations
      </Link>

      {/* Header du cours */}
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
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '250px',
          height: '250px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{
              fontSize: '56px',
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <FaGraduationCap />
            </span>
            <div>
              <h2 style={{ 
                fontSize: '36px', 
                marginBottom: '8px',
                fontWeight: '800',
                lineHeight: '1.2'
              }}>
                {course.title}
              </h2>
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <FaTag /> {course.category?.name}
              </div>
            </div>
          </div>
          
          <p style={{ 
            fontSize: '18px',
            color: '#ffffff',
            fontWeight: '600',
            lineHeight: '1.6',
            maxWidth: '800px',
            marginBottom: '32px'
          }}>
            {course.description}
          </p>

          {/* Stats */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                <FaClock />
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Durée d'accès</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{course.duration} jours</div>
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              background: course.price === 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                <FaMoneyBillWave />
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Prix</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>
                  {course.price === 0 ? 'Gratuit' : `${course.price} FCFA`}
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                <FaBookOpen />
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Chapitres</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{course.content?.length || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      {user?.role === 'admin' && (
        <div style={{
          padding: '20px',
          background: 'white',
          borderRadius: '16px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          gap: '12px'
        }}>
          <button onClick={() => navigate('/admin/courses')} className="btn btn-primary">
            ✏️ Modifier le cours
          </button>
          <button onClick={loadStats} className="btn btn-secondary">
            📊 Voir les statistiques
          </button>
        </div>
      )}

      {/* Contenu de la formation */}
      <div style={{
        padding: '32px',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#1e293b'
        }}>
          <FaBookOpen style={{ color: '#6366f1' }} />
          Contenu de la formation
        </h3>

        {checkingAccess ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : !hasAccess && user?.role !== 'admin' ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            borderRadius: '16px',
            border: '1px solid #fecaca'
          }}>
            <FaLock style={{ fontSize: '48px', color: '#ef4444', marginBottom: '16px' }} />
            <h4 style={{ fontSize: '20px', color: '#991b1b', marginBottom: '12px', fontWeight: '700' }}>
              Accès non disponible
            </h4>
            <p style={{ color: '#7f1d1d', fontSize: '15px', marginBottom: '24px' }}>
              Vous n'avez pas encore accès à cette formation. Inscrivez-vous pour commencer.
            </p>
            <Link to="/courses" className="btn btn-primary">
              <FaArrowLeft /> Retour aux formations
            </Link>
          </div>
        ) : course.content?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {course.content.map((item, index) => (
              <div 
                key={index} 
                style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.15)'
                  e.currentTarget.style.borderColor = '#6366f1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = '#e2e8f0'
                }}
              >
                {/* Decorative gradient on hover */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: 'linear-gradient(180deg, #6366f1, #0ea5e9)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }} />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                  <span style={{
                    fontSize: '32px',
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    flexShrink: 0
                  }}>
                    {getChapterIcon(index)}
                  </span>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        background: 'linear-gradient(135deg, #a5b4fc 0%, #c7d2fe 100%)',
                        color: '#4f46e5'
                      }}>
                        {item.type}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#64748b',
                        fontWeight: '500'
                      }}>
                        Chapitre {index + 1}
                      </span>
                    </div>
                    <strong style={{ 
                      fontSize: '18px',
                      color: '#1e293b',
                      display: 'block',
                      marginBottom: '6px'
                    }}>
                      {item.title}
                    </strong>
                    {item.description && (
                      <p style={{ 
                        margin: 0,
                        color: '#64748b',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <Link 
                  to={`/courses/${id}/chapter/${index}`} 
                  className="btn btn-primary"
                  style={{ 
                    whiteSpace: 'nowrap',
                    padding: '14px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginLeft: '20px'
                  }}
                >
                  <FaPlayCircle /> Voir le chapitre
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-text">Aucun contenu ajouté pour le moment</div>
          </div>
        )}
      </div>

      {/* Stats Modal */}
      {showStats && stats && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowStats(false)}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowStats(false)} style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#64748b',
              padding: '8px'
            }}>
              <FaTimes />
            </button>
            <h3 style={{ fontSize: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FaChartBar style={{ color: '#6366f1' }} />
              Statistiques du cours
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '20px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', borderRadius: '16px', color: 'white' }}>
                <FaUsers style={{ fontSize: '24px', marginBottom: '8px' }} />
                <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.total}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Total inscrits</div>
              </div>
              <div style={{ padding: '20px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '16px', color: 'white' }}>
                <FaUsers style={{ fontSize: '24px', marginBottom: '8px' }} />
                <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.active}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Actifs</div>
              </div>
              <div style={{ padding: '20px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', borderRadius: '16px', color: 'white' }}>
                <FaUsers style={{ fontSize: '24px', marginBottom: '8px' }} />
                <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.inactive}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Inactifs</div>
              </div>
              <div style={{ padding: '20px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '16px', color: 'white' }}>
                <FaMoneyBillWave style={{ fontSize: '24px', marginBottom: '8px' }} />
                <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.revenue} FCFA</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Revenus</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetail
