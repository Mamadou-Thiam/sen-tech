import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../services/courseService'
import { getCategories } from '../../services/categoryService'

const ManageCourses = () => {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: 30,
    price: 0,
    content: []
  })

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

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category?._id || course.category || '',
      duration: course.duration,
      price: course.price,
      content: course.content || []
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id, formData)
        alert('Formation modifiée avec succès !')
      } else {
        await createCourse(formData)
        alert('Formation créée avec succès !')
      }
      setShowForm(false)
      setEditingCourse(null)
      setFormData({ title: '', description: '', category: '', duration: 30, price: 0, content: [] })
      loadData()
    } catch (err) {
      console.error('Erreur:', err)
      alert('Erreur lors de l\'opération : ' + (err.response?.data?.message || err.message))
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await deleteCourse(id)
        loadData()
      } catch (err) {
        console.error('Erreur:', err)
      }
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestion des Formations</h2>
        <button onClick={() => { setShowForm(true); setEditingCourse(null); }} className="btn btn-primary">
          Nouvelle Formation
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingCourse ? 'Modifier' : 'Créer'} une formation</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Titre</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Catégorie</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                <option value="">Sélectionner...</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label>Durée d'accès (jours)</label>
                <input type="number" value={formData.duration} onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})} />
              </div>
              <div>
                <label>Prix (FCFA)</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})} />
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <button type="submit" className="btn btn-success">{editingCourse ? 'Modifier' : 'Créer'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingCourse(null); }} className="btn" style={{ marginLeft: '10px' }}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p>Chargement...</p> : (
        <div>
          {courses.map(course => (
            <div key={course._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>{course.title}</h3>
                  <p>{course.category?.name} - {course.duration} jours - {course.price} FCFA</p>
                </div>
                <div>
                  <button onClick={() => handleEdit(course)} className="btn btn-primary" style={{ marginRight: '5px' }}>Modifier</button>
                  <button onClick={() => handleDelete(course._id)} className="btn btn-danger">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageCourses
