import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Users, Mail, Calendar, Briefcase } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('nexora-token');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center" data-testid="loading-state">
        <p className="text-muted">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="py-16" data-testid="admin-dashboard">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold mb-12" data-testid="dashboard-title">Dashboard Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-border mb-12">
          <div className="md:col-span-3 p-8 border-r border-b border-border" data-testid="stat-case-studies">
            <FileText className="text-primary mb-4" size={32} />
            <div className="text-4xl font-bold mb-2">{stats?.case_studies || 0}</div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Case Studies</p>
          </div>
          <div className="md:col-span-3 p-8 border-r border-b border-border" data-testid="stat-blog-posts">
            <Calendar className="text-primary mb-4" size={32} />
            <div className="text-4xl font-bold mb-2">{stats?.blog_posts || 0}</div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Blog Posts</p>
          </div>
          <div className="md:col-span-3 p-8 border-r border-b border-border" data-testid="stat-contacts">
            <Mail className="text-primary mb-4" size={32} />
            <div className="text-4xl font-bold mb-2">{stats?.pending_contacts || 0}</div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">New Contacts</p>
          </div>
          <div className="md:col-span-3 p-8 border-r border-b border-border" data-testid="stat-demos">
            <Users className="text-primary mb-4" size={32} />
            <div className="text-4xl font-bold mb-2">{stats?.pending_demos || 0}</div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Demo Requests</p>
          </div>
        </div>

        {/* Quick Links */}
        <h2 className="text-2xl font-semibold mb-6" data-testid="quick-links-title">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-border">
          <Link
            to="/admin/case-studies"
            className="md:col-span-4 p-8 border-r border-b border-border hover:bg-secondary/30 transition-colors"
            data-testid="link-manage-cases"
          >
            <FileText className="text-primary mb-3" size={24} />
            <h3 className="text-lg font-medium mb-2">Manage Case Studies</h3>
            <p className="text-sm text-muted">Create, edit, and publish case studies</p>
          </Link>
          <Link
            to="/admin/blog"
            className="md:col-span-4 p-8 border-r border-b border-border hover:bg-secondary/30 transition-colors"
            data-testid="link-manage-blog"
          >
            <Calendar className="text-primary mb-3" size={24} />
            <h3 className="text-lg font-medium mb-2">Manage Blog</h3>
            <p className="text-sm text-muted">Write and publish insights</p>
          </Link>
          <Link
            to="/admin/contacts"
            className="md:col-span-4 p-8 border-r border-b border-border hover:bg-secondary/30 transition-colors"
            data-testid="link-view-contacts"
          >
            <Mail className="text-primary mb-3" size={24} />
            <h3 className="text-lg font-medium mb-2">Contact Submissions</h3>
            <p className="text-sm text-muted">View and respond to inquiries</p>
          </Link>
          <Link
            to="/admin/demos"
            className="md:col-span-4 p-8 border-r border-b border-border hover:bg-secondary/30 transition-colors"
            data-testid="link-view-demos"
          >
            <Users className="text-primary mb-3" size={24} />
            <h3 className="text-lg font-medium mb-2">Demo Requests</h3>
            <p className="text-sm text-muted">Review demo requests</p>
          </Link>
          <Link
            to="/admin/careers"
            className="md:col-span-4 p-8 border-r border-b border-border hover:bg-secondary/30 transition-colors"
            data-testid="link-manage-careers"
          >
            <Briefcase className="text-primary mb-3" size={24} />
            <h3 className="text-lg font-medium mb-2">Manage Careers</h3>
            <p className="text-sm text-muted">Post and manage job listings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;