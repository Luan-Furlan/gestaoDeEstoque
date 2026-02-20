import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Movements from './pages/Movements'
import Navbar from './components/Navbar'

export default function App() {
  const [token] = React.useState(localStorage.getItem('token'))

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="px-4 py-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/products" element={token ? <Products /> : <Navigate to="/login" replace />} />
          <Route path="/movements" element={token ? <Movements /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}
