// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, session }) => {
  if (!session) {
    // User is not authenticated, redirect to the login/auth page
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute