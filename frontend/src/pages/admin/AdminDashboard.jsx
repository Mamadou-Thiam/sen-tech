import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCourses } from '../../services/courseService'
import { getUsers } from '../../services/userService'
import { getEnrollments } from '../../services/enrollmentService'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    users: 0,
    enrollments: 0,
    activeEnrollments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [coursesRes, usersRes, enrollmentsRes] = await Promise.all([
        getCourses(),
        getUsers(),
        getEnrollments()
      ])

      const activeEnrollments = enrollmentsRes.data.filter(e =>
        e.isActive && new Date(e.endDate) > new Date()
      ).length

      setStats({
        courses: coursesRes.data.length,
        users: usersRes.data.length,
        enrollments: enrollmentsRes.data.length,
        activeEnrollments
      })
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container">Chargement...</div>

  return (
    <div className="container">
      <h2>Tableau de Bord Administrateur</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '20px 0' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Formations</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.courses}</p>
          <Link to="/admin/courses">Gérer</Link>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Étudiants</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.users}</p>
          <Link to="/admin/users">Gérer</Link>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Accès Totaux</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.enrollments}</p>
          <Link to="/admin/enrollments">Gérer</Link>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Accès Actifs</h3>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: 'green' }}>{stats.activeEnrollments}</p>
        </div>
      </div>

      <div className="card">
        <h3>Actions Rapides</h3>
        <div className="admin-quick-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
          <Link to="/admin/courses" className="btn btn-primary">Créer une formation</Link>
          <Link to="/admin/users" className="btn btn-success">Ajouter un étudiant</Link>
          <Link to="/admin/enrollments" className="btn btn-primary">Attribuer un accès</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
