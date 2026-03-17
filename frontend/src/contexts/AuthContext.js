import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('nexora-token'));

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await axios.get(`${API}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ email: response.data.email });
    } catch (error) {
      localStorage.removeItem('nexora-token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(`${API}/auth/login`, { email, password });
    const { token: newToken, email: userEmail } = response.data;
    localStorage.setItem('nexora-token', newToken);
    setToken(newToken);
    setUser({ email: userEmail });
    return response.data;
  };

  const register = async (email, password) => {
    const response = await axios.post(`${API}/auth/register`, { email, password });
    const { token: newToken, email: userEmail } = response.data;
    localStorage.setItem('nexora-token', newToken);
    setToken(newToken);
    setUser({ email: userEmail });
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('nexora-token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;