import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getCourses } from '../services/courseService'
import { getCategories } from '../services/categoryService'
import { FaBook, FaClock, FaMoneyBillWave, FaTag, FaSearch, FaGraduationCap, FaArrowRight } from 'react-icons/fa'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [coursesRes, categoriesRes] = await Promise.all([
        getCourses(),
        getCategories()
      ])
      setCourses(coursesRes.data)
      setCategories(categoriesRes.data)
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = useMemo(() => courses.filter(course => {
    const matchCategory = !selectedCategory || course.category?._id === selectedCategory
    const matchSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  }), [courses, selectedCategory, searchQuery])

  const getCourseIcon = (index) => {
    const icons = ['🌐', '💻', '🎨', '📱', '🚀', '⚡', '🔥', '💡', '📊', '🎯']
    return icons[index % icons.length]
  }

  return (
    <div className="container" style={{ maxWidth: '1280px' }}>
      {/* Header */}
      <div className="courses-header" style={{
        padding: '48px 40px',
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #0ea5e9 100%)',
        borderRadius: '24px',
        marginBottom: '40px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)'
      }}>
        {/* Decorative elements */}
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
          bottom: '-120px',
          left: '-80px',
          width: '280px',
          height: '280px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="courses-header-flex" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div className="courses-header-icon" style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <FaGraduationCap />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '42px', 
                fontWeight: '800',
                marginBottom: '8px',
                lineHeight: '1.1'
              }}>
                Nos Formations
              </h2>
              <p style={{ 
                fontSize: '18px',
                color: '#ffffff',
                fontWeight: '600',
                margin: 0
              }}>
                Découvrez notre catalogue de formations et développez vos compétences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="courses-filters" style={{
        padding: '24px',
        background: 'white',
        borderRadius: '20px',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <FaSearch style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8',
            fontSize: '16px'
          }} />
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
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

        {/* Category Filter */}
        <div style={{ minWidth: '250px' }}>
          <div style={{ position: 'relative' }}>
            <FaTag style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
              fontSize: '14px'
            }} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '14px',
                background: '#f8fafc',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                appearance: 'none'
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
            >
              <option value="">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="courses-count" style={{
        marginBottom: '24px',
        padding: '12px 20px',
        background: 'white',
        borderRadius: '12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0'
      }}>
        <FaBook style={{ color: '#6366f1' }} />
        <span style={{ fontWeight: '600', color: '#1e293b' }}>
          {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} disponible{filteredCourses.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '28px' 
        }}>
          {filteredCourses.map((course, index) => (
            <div 
              key={course._id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Card Header with Gradient */}
              <div style={{
                padding: '32px 24px',
                background: `linear-gradient(135deg, ${
                  index % 3 === 0 ? '#6366f1, #4f46e5' :
                  index % 3 === 1 ? '#0ea5e9, #0284c7' :
                  '#10b981, #059669'
                })`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span style={{
                    fontSize: '48px',
                    display: 'block',
                    marginBottom: '12px'
                  }}>
                    {getCourseIcon(index)}
                  </span>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    {course.title}
                  </h3>
                  {course.category && (
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {course.category.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px' }}>
                <p style={{
                  color: '#334155',
                  fontSize: '15px',
                  fontWeight: '600',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  minHeight: '60px'
                }}>
                  {course.description?.substring(0, 120)}...
                </p>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '24px',
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaClock style={{ color: '#6366f1', width: '16px' }} />
                    <span style={{ fontSize: '14px', color: '#475569' }}>
                      <strong>Durée:</strong> {course.duration} jours
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaMoneyBillWave style={{ color: '#10b981', width: '16px' }} />
                    <span style={{ fontSize: '14px', color: '#475569' }}>
                      <strong>Prix:</strong> {course.price === 0 ? (
                        <span style={{ color: '#10b981', fontWeight: '700' }}>Gratuit</span>
                      ) : (
                        <strong>{course.price} FCFA</strong>
                      )}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaBook style={{ color: '#0ea5e9', width: '16px' }} />
                    <span style={{ fontSize: '14px', color: '#475569' }}>
                      <strong>Chapitres:</strong> {course.content?.length || 0}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link 
                  to={`/courses/${course._id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  Voir les détails
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">Aucune formation trouvée</div>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
            className="btn btn-primary"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .courses-header { padding: 32px 24px !important; margin-bottom: 24px !important; border-radius: 16px !important; }
          .courses-header h2 { font-size: 28px !important; }
          .courses-header p { font-size: 15px !important; }
          .courses-header-icon { width: 56px !important; height: 56px !important; font-size: 28px !important; }
          .courses-header-flex { flex-direction: column !important; text-align: center !important; }
          .courses-filters { padding: 16px !important; gap: 12px !important; }
          .courses-filters > div { min-width: 100% !important; }
          .courses-count { font-size: 13px !important; padding: 10px 16px !important; }
          .courses-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .courses-header { padding: 24px 16px !important; margin-bottom: 16px !important; border-radius: 12px !important; }
          .courses-header h2 { font-size: 22px !important; }
          .courses-header p { font-size: 14px !important; }
          .courses-header-icon { width: 48px !important; height: 48px !important; font-size: 24px !important; }
          .courses-filters { padding: 12px !important; }
        }
      `}</style>
    </div>
  )
}

export default Courses
