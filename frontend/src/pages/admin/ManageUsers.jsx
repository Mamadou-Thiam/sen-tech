import React, { useEffect, useState } from 'react'
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const res = await getUsers()
      setUsers(res.data)
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await updateUser(editingUser._id, formData)
      } else {
        await createUser(formData)
      }
      setShowForm(false)
      setEditingUser(null)
      setFormData({ name: '', email: '', password: '', role: 'student' })
      loadUsers()
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr ?')) {
      try {
        await deleteUser(id)
        loadUsers()
      } catch (err) {
        console.error('Erreur:', err)
      }
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestion des Utilisateurs</h2>
        <button onClick={() => { setShowForm(true); setEditingUser(null); }} className="btn btn-primary">
          Nouvel Utilisateur
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingUser ? 'Modifier' : 'Créer'} un utilisateur</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            {!editingUser && (
              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
              </div>
            )}
            <div className="form-group">
              <label>Rôle</label>
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                <option value="student">Étudiant</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            <div>
              <button type="submit" className="btn btn-success">{editingUser ? 'Modifier' : 'Créer'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingUser(null); }} className="btn" style={{ marginLeft: '10px' }}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p>Chargement...</p> : (
        <div>
          {users.map(user => (
            <div key={user._id} className="card">
              <div className="admin-card-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email} - <span style={{ color: user.role === 'admin' ? 'red' : 'blue' }}>{user.role}</span></p>
                </div>
                <div className="admin-card-actions">
                  <button onClick={() => handleEdit(user)} className="btn btn-primary" style={{ marginRight: '5px' }}>Modifier</button>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageUsers
