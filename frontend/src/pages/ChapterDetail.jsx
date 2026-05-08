import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { getCourse } from '../services/courseService'
import { getMyEnrollments } from '../services/enrollmentService'
import { useAuth } from '../context/useAuth'
import ReactMarkdown from 'react-markdown'
import { FaArrowLeft, FaBook, FaChevronLeft, FaChevronRight, FaGraduationCap, FaLock } from 'react-icons/fa'

const ChapterDetail = () => {
  const { courseId, chapterIndex } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [course, setCourse] = useState(null)
  const [chapter, setChapter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } })
      return
    }
    loadCourse()
    checkAccess()
  }, [courseId, chapterIndex, user])

  const loadCourse = async () => {
    try {
      const res = await getCourse(courseId)
      setCourse(res.data)
      const idx = parseInt(chapterIndex)
      if (res.data.content && res.data.content[idx]) {
        setChapter(res.data.content[idx])
      }
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
      const hasValidEnrollment = enrollments.some(e => {
        const courseIdMatch = String(e.course?._id) === String(courseId)
        return courseIdMatch && e.isActive === true
      })
      setHasAccess(hasValidEnrollment)
    } catch (err) {
      console.error('Erreur vérification accès:', err)
      setHasAccess(false)
    } finally {
      setCheckingAccess(false)
    }
  }

  const goToChapter = (index) => {
    navigate(`/courses/${courseId}/chapter/${index}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cleanTitle = (title) => {
    return title.replace(/Chapitre \d+ : |Projet Final : /, '')
  }

  const getChapterIcon = (index) => {
    const icons = ['🌐', '📝', '🎨', '📦', '🧠', '📊', '⚡', '🔧', '💡', '🚀']
    return icons[index] || '📖'
  }

  if (loading || checkingAccess) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }
  
  if (!course || !chapter) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-text">Chapitre non trouvé</div>
          <Link to={`/courses/${courseId}`} className="btn btn-primary">
            <FaArrowLeft /> Retour au cours
          </Link>
        </div>
      </div>
    )
  }

  if (!hasAccess && user?.role !== 'admin') {
    return (
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center', padding: '80px 20px' }}>
        <div style={{
          padding: '60px 40px',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          borderRadius: '24px',
          border: '1px solid #fecaca',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
        }}>
          <FaLock style={{ fontSize: '64px', color: '#ef4444', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '24px', color: '#991b1b', marginBottom: '12px', fontWeight: '800' }}>
            Accès non autorisé
          </h2>
          <p style={{ color: '#7f1d1d', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
            Vous n'avez pas accès à ce chapitre. Inscrivez-vous à la formation pour commencer.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/courses" className="btn btn-primary">
              <FaArrowLeft /> Formations
            </Link>
            <Link to={`/courses/${courseId}`} className="btn btn-secondary">
              Voir le cours
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentIndex = parseInt(chapterIndex)
  const progress = ((currentIndex + 1) / course.content.length) * 100

  return (
    <div className="chapter-layout" style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '24px',
      display: 'flex',
      gap: '32px',
      alignItems: 'flex-start'
    }}>
      {/* Sidebar - Liste des chapitres */}
      <aside className="chapter-sidebar" style={{ 
        width: sidebarOpen ? '320px' : '60px',
        flexShrink: 0,
        position: 'sticky',
        top: '100px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '20px',
        padding: sidebarOpen ? '24px' : '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        maxHeight: 'calc(100vh - 120px)',
        overflow: 'hidden'
      }}>
        {/* Toggle Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarOpen ? 'space-between' : 'center',
            marginBottom: sidebarOpen ? '20px' : '12px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          {sidebarOpen && <span>📚 Chapitres</span>}
          <FaBook style={{ transform: sidebarOpen ? 'rotate(0)' : 'rotate(180deg)', transition: 'transform 0.3s' }} />
        </button>

        {/* Progress Bar */}
        {sidebarOpen && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              height: '8px', 
              background: '#e2e8f0', 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #6366f1, #0ea5e9)',
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }} />
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', margin: 0 }}>
              {currentIndex + 1}/{course.content.length} chapitres
            </p>
          </div>
        )}

        {/* Chapter List */}
        {sidebarOpen && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            maxHeight: 'calc(100vh - 280px)',
            overflowY: 'auto',
            paddingRight: '8px'
          }}>
            {course.content.map((item, index) => {
              const isActive = index === currentIndex
              const isCompleted = index < currentIndex
              
              return (
                <button
                  key={index}
                  onClick={() => goToChapter(index)}
                  style={{
                    padding: '14px 16px',
                    border: isActive ? '2px solid #6366f1' : '2px solid transparent',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    background: isActive 
                      ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
                      : isCompleted 
                        ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                        : 'transparent',
                    color: isActive ? 'white' : isCompleted ? '#065f46' : '#1e293b',
                    fontWeight: isActive ? '700' : '500',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    lineHeight: '1.4',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                    transform: isActive ? 'translateX(4px)' : 'translateX(0)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f1f5f9'
                      e.currentTarget.style.transform = 'translateX(8px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = isCompleted 
                        ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                        : 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: '20px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}>
                    {isCompleted ? '✅' : getChapterIcon(index)}
                  </span>
                  <span style={{ flex: 1 }}>
                    {cleanTitle(item.title)}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </aside>

      {/* Contenu du chapitre */}
      <main className="chapter-content" style={{ flex: 1, minWidth: 0 }}>
        {/* Navigation retour */}
        <Link 
          to={`/courses/${courseId}`} 
          className="chapter-back-btn"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            color: '#6366f1',
            textDecoration: 'none',
            padding: '10px 16px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            border: '1px solid #e2e8f0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-4px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
          <FaArrowLeft /> Retour au cours
        </Link>

        {/* Header du chapitre */}
        <div className="chapter-header" style={{ 
          marginBottom: '32px',
          padding: '32px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative element */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1))',
            borderRadius: '50%'
          }} />
          
          <div className="chapter-header-flex" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span className="chapter-header-icon" style={{
              fontSize: '48px',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
            }}>
              {getChapterIcon(currentIndex)}
            </span>
            <div style={{ flex: 1 }}>
              <h1 className="chapter-title" style={{ 
                fontSize: '32px', 
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.2'
              }}>
                {chapter.title}
              </h1>
              <p style={{ 
                color: '#64748b', 
                fontSize: '16px',
                margin: 0
              }}>
                {chapter.description}
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ 
                height: '6px', 
                background: '#e2e8f0', 
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #0ea5e9)',
                  borderRadius: '3px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#6366f1',
              whiteSpace: 'nowrap'
            }}>
              {Math.round(progress)}% complété
            </span>
          </div>
        </div>

        {/* Contenu Markdown */}
        <div style={{
          padding: '32px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          lineHeight: '1.8',
          fontSize: '16px',
          color: '#1e293b'
        }}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 style={{ 
                  fontSize: '32px', 
                  marginTop: '48px', 
                  marginBottom: '20px', 
                  paddingBottom: '12px',
                  borderBottom: '3px solid #6366f1',
                  background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '800'
                }} {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 style={{ 
                  fontSize: '26px', 
                  marginTop: '40px', 
                  marginBottom: '16px',
                  color: '#1e293b',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }} {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 style={{ 
                  fontSize: '20px', 
                  marginTop: '32px', 
                  marginBottom: '12px', 
                  color: '#475569',
                  fontWeight: '600'
                }} {...props} />
              ),
              p: ({ node, ...props }) => (
                <p style={{ 
                  marginBottom: '20px', 
                  lineHeight: '1.8',
                  color: '#334155'
                }} {...props} />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code style={{ 
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '14px', 
                    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                    color: '#6366f1',
                    fontWeight: '500'
                  }} {...props} />
                ) : (
                  <div style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '16px',
                    padding: '24px',
                    margin: '24px 0',
                    overflowX: 'auto',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    border: '1px solid #334155',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      display: 'flex',
                      gap: '6px'
                    }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                    </div>
                    <code style={{ 
                      color: '#e2e8f0',
                      fontSize: '14px', 
                      fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                      lineHeight: '1.6',
                      display: 'block',
                      paddingTop: '8px'
                    }} {...props} />
                  </div>
                ),
              table: ({ node, ...props }) => (
                <div style={{
                  overflowX: 'auto',
                  margin: '24px 0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    background: 'white'
                  }} {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th style={{ 
                  border: '1px solid #e2e8f0', 
                  padding: '16px', 
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '14px'
                }} {...props} />
              ),
              td: ({ node, ...props }) => (
                <td style={{ 
                  border: '1px solid #e2e8f0', 
                  padding: '14px',
                  fontSize: '14px',
                  color: '#334155'
                }} {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote style={{ 
                  borderLeft: '4px solid #6366f1', 
                  paddingLeft: '24px', 
                  margin: '24px 0', 
                  color: '#475569',
                  fontStyle: 'italic', 
                  background: 'linear-gradient(135deg, #f0f7ff 0%, #e0e7ff 100%)',
                  padding: '20px 24px', 
                  borderRadius: '0 12px 12px 0',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
                }} {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul style={{ 
                  marginBottom: '20px', 
                  paddingLeft: '24px',
                  listStyle: 'none'
                }} {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol style={{ 
                  marginBottom: '20px', 
                  paddingLeft: '24px'
                }} {...props} />
              ),
              li: ({ node, ...props }) => (
                <li style={{ 
                  marginBottom: '10px', 
                  lineHeight: '1.7',
                  color: '#334155',
                  position: 'relative',
                  paddingLeft: '24px'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#6366f1',
                    fontWeight: 'bold'
                  }}>•</span>
                  {props.children}
                </li>
              ),
              hr: ({ node, ...props }) => (
                <hr style={{ 
                  border: 'none', 
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                  margin: '40px 0'
                }} {...props} />
              ),
              details: ({ node, ...props }) => (
                <details style={{
                  margin: '24px 0',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  border: '1px solid #fcd34d',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
                }} {...props} />
              ),
              summary: ({ node, ...props }) => (
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#92400e',
                  fontSize: '16px',
                  padding: '8px 0'
                }} {...props} />
              ),
              a: ({ node, ...props }) => (
                <a style={{
                  color: '#6366f1',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.2s ease'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#6366f1'}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                {...props} />
              )
            }}
          >
            {chapter.fullContent || chapter.description || 'Contenu non disponible.'}
          </ReactMarkdown>
        </div>

        {/* Navigation précédent / suivant */}
        <div className="chapter-nav" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '32px',
          padding: '24px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0'
        }}>
          {currentIndex > 0 ? (
            <button
              onClick={() => goToChapter(currentIndex - 1)}
              style={{ 
                padding: '14px 28px', 
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                color: '#1e293b',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-4px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <FaChevronLeft /> Précédent
            </button>
          ) : <div />}
          
          {currentIndex < course.content.length - 1 ? (
            <button
              onClick={() => goToChapter(currentIndex + 1)}
              style={{ 
                padding: '14px 28px', 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)'
              }}
            >
              Suivant <FaChevronRight />
            </button>
          ) : <div />}
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) {
          .chapter-layout { flex-direction: column !important; }
          .chapter-sidebar { 
            width: 100% !important; 
            position: static !important;
            max-height: none !important;
            margin-bottom: 20px !important;
          }
          .chapter-sidebar > div { max-height: 300px !important; }
        }
        @media (max-width: 768px) {
          .chapter-layout { padding: 16px !important; gap: 20px !important; }
          .chapter-sidebar { padding: 16px !important; border-radius: 16px !important; }
          .chapter-header { padding: 24px !important; border-radius: 16px !important; }
          .chapter-header-flex { flex-direction: column !important; text-align: center !important; }
          .chapter-header-icon { width: 64px !important; height: 64px !important; font-size: 36px !important; }
          .chapter-title { font-size: 26px !important; }
          .chapter-back-btn { margin-bottom: 16px !important; font-size: 13px !important; }
        }
        @media (max-width: 480px) {
          .chapter-layout { padding: 10px !important; }
          .chapter-sidebar { padding: 12px !important; border-radius: 12px !important; }
          .chapter-header { padding: 20px 16px !important; border-radius: 12px !important; }
          .chapter-header-icon { width: 56px !important; height: 56px !important; font-size: 28px !important; }
          .chapter-title { font-size: 22px !important; }
        }
      `}</style>
    </div>
  )
}

export default ChapterDetail
