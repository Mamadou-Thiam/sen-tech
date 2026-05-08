import React, { useEffect, useState } from 'react'
import { getMyEnrollments } from '../services/enrollmentService'

const MyEnrollments = () => {
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
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date()
  }

  const getDaysRemaining = (endDate) => {
    const diff = new Date(endDate) - new Date()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="container">
      <h2>Mes Accès aux Formations</h2>

      {loading ? <p>Chargement...</p> : (
        <div>
          {enrollments.length === 0 ? (
            <div className="card">
              <p>Vous n'avez aucun accès pour le moment.</p>
              <a href="/courses" className="btn btn-primary">Voir les formations</a>
            </div>
          ) : (
            enrollments.map(enrollment => (
              <div key={enrollment._id} className="card">
                <div className="admin-card-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3>{enrollment.course?.title}</h3>
                    <p>Date de début: {new Date(enrollment.startDate).toLocaleDateString()}</p>
                    <p>Date de fin: {new Date(enrollment.endDate).toLocaleDateString()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {isExpired(enrollment.endDate) ? (
                      <span className="badge badge-error">EXPIRÉ</span>
                    ) : (
                      <>
                        <span className="badge badge-success">ACTIF</span>
                        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748b' }}>{getDaysRemaining(enrollment.endDate)} jours restants</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default MyEnrollments
