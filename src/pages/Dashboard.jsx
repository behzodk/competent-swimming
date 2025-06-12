// src/pages/Dashboard.jsx
import React from 'react'

const Dashboard = ({ session }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected dashboard page.</p>
      <p>User ID: {session?.user?.id}</p>
      <p>User Email: {session?.user?.email}</p>
      {/* You can display more user-specific data here */}
    </div>
  )
}

export default Dashboard