import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" data-testid="admin-login">
      <div className="w-full max-w-[400px] px-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2" data-testid="login-title">Admin Login</h1>
          <p className="text-muted">Enter your credentials to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
          <div>
            <label htmlFor="email" className="block text-sm uppercase tracking-[0.2em] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-4 border border-border bg-transparent focus:border-primary focus:outline-none transition-colors rounded-sm"
              data-testid="login-email-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm uppercase tracking-[0.2em] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-4 border border-border bg-transparent focus:border-primary focus:outline-none transition-colors rounded-sm"
              data-testid="login-password-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 disabled:opacity-50"
            data-testid="login-submit-btn"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;