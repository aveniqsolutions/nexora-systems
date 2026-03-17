import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Admin Header */}
      <div className="border-b border-border bg-secondary/30" data-testid="admin-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            data-testid="logout-btn"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;