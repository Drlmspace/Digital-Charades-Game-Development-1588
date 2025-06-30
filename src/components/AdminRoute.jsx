import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function AdminRoute({ children }) {
  const { state } = useGame();
  
  if (!state.isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}

export default AdminRoute;