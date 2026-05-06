import React, { useEffect, useState } from 'react'
import { getEnrollments, createEnrollment, extendEnrollment, deleteEnrollment } from '../../services/enrollmentService'
import { getUsers } from '../../services/userService'
import { getCourses } from '../../services/courseService'

const ManageEnrollments = () => {
  const [enrollments, setEnrollments] = useState([])
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showExtendForm, setShowExtendForm] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState(null)
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    startDate: new Date().toISOString().split('T')[0],
    duration: 30
  })
  const [extendDays, setExtendDays] = useState(30)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [enrollmentsRes, usersRes, coursesRes] = await Promise.all([
        getEnrollments(),
        getUsers(),
        getCourses()
      ])
      setEnrollments(enrollmentsRes.data)
      setUsers(usersRes.data)
      setCourses(coursesRes.data)
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createEnrollment(formData)
      setShowForm(false)
      setFormData({ studentId: '', courseId: '', startDate: new Date().toISOString().split('T')[0], duration: 30 })
      loadData()
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleExtend = async (e) => {
    e.preventDefault()
    try {
      await extendEnrollment(selectedEnrollment._id, extendDays)
      setShowExtendForm(false)
      setSelectedEnrollment(null)
      loadData()
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet accès ?')) {
      try {
        await deleteEnrollment(id)
        loadData()
      } catch (err) {
        console.error('Erreur:', err)
      }
    }
  }

  const isExpired = (endDate) => new Date(endDate) < new Date()

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestion des Accès</h2>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Attribuer un accès
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Attribuer un accès à un étudiant</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Étudiant</label>
              <select value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} required>
                <option value="">Sélectionner...</option>
                {users.filter(u => u.role === 'student').map(user => (
                  <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Formation</label>
              <select value={formData.courseId} onChange={(e) => setFormData({...formData, courseId: e.target.value})} required>
                <option value="">Sélectionner...</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.title} ({course.duration} jours)</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label>Date de début</label>
                <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
              </div>
              <div>
                <label>Durée (jours)</label>
                <input type="number" value={formData.duration} onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})} />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-success">Attribuer</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn" style={{ marginLeft: '10px' }}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {showExtendForm && selectedEnrollment && (
        <div className="card">
          <h3>Prolonger l'accès - {selectedEnrollment.student?.name}</h3>
          <p>Formation: {selectedEnrollment.course?.title}</p>
          <p>Date de fin actuelle: {new Date(selectedEnrollment.endDate).toLocaleDateString()}</p>
          <form onSubmit={handleExtend}>
            <div className="form-group">
              <label>Nombre de jours à ajouter</label>
              <input type="number" value={extendDays} onChange={(e) => setExtendDays(parseInt(e.target.value))} />
            </div>
            <div>
              <button type="submit" className="btn btn-success">Prolonger</button>
              <button type="button" onClick={() => { setShowExtendForm(false); setSelectedEnrollment(null); }} className="btn" style={{ marginLeft: '10px' }}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p>Chargement...</p> : (
        <div>
          {enrollments.map(enrollment => (
            <div key={enrollment._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>{enrollment.student?.name} - {enrollment.course?.title}</h3>
                  <p>Début: {new Date(enrollment.startDate).toLocaleDateString()} | Fin: {new Date(enrollment.endDate).toLocaleDateString()}</p>
                  <p style={{ color: isExpired(enrollment.endDate) ? 'red' : 'green' }}>
                    {isExpired(enrollment.endDate) ? 'EXPIRÉ' : 'ACTIF'}
                  </p>
                </div>
                <div>
                  <button onClick={() => { setSelectedEnrollment(enrollment); setShowExtendForm(true); }} className="btn btn-primary" style={{ marginRight: '5px' }}>
                    Prolonger
                  </button>
                  <button onClick={() => handleDelete(enrollment._id)} className="btn btn-danger">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageEnrollments
