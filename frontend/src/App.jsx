import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import './index.css'

// Lazy loading des pages pour réduire la taille initiale du bundle
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Courses = lazy(() => import('./pages/Courses'))
const CourseDetail = lazy(() => import('./pages/CourseDetail'))
const ChapterDetail = lazy(() => import('./pages/ChapterDetail'))
const MyEnrollments = lazy(() => import('./pages/MyEnrollments'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const ManageCourses = lazy(() => import('./pages/admin/ManageCourses'))
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'))
const ManageEnrollments = lazy(() => import('./pages/admin/ManageEnrollments'))

const LoadingFallback = () => (
  <div className="container" style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="loading">
      <div className="spinner"></div>
    </div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/courses/:courseId/chapter/:chapterIndex" element={<ChapterDetail />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/my-enrollments" element={<PrivateRoute><MyEnrollments /></PrivateRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/courses" element={<AdminRoute><ManageCourses /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
              <Route path="/admin/enrollments" element={<AdminRoute><ManageEnrollments /></AdminRoute>} />
              <Route path="/" element={<Navigate to="/courses" />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
