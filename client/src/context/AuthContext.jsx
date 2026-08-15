import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campusflow_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('campusflow_token') || null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          if (response.success && response.data?.user) {
            setUser(response.data.user);
            localStorage.setItem('campusflow_user', JSON.stringify(response.data.user));
          }
        } catch (err) {
          console.error('Session verification failed:', err);
          logout(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        const { token: authToken, user: userData } = response.data;
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('campusflow_token', authToken);
        localStorage.setItem('campusflow_user', JSON.stringify(userData));
        showToast(response.message || 'Welcome back!', 'success');
        return { success: true, user: userData };
      }
    } catch (error) {
      showToast(error.message || 'Login failed', 'error');
      return { success: false, error: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      if (response.success) {
        const { token: authToken, user: userData } = response.data;
        setToken(authToken);
        setUser(userData);
        localStorage.setItem('campusflow_token', authToken);
        localStorage.setItem('campusflow_user', JSON.stringify(userData));
        showToast('Account created successfully!', 'success');
        return { success: true, user: userData };
      }
    } catch (error) {
      showToast(error.message || 'Registration failed', 'error');
      return { success: false, error: error.message };
    }
  };

  const logout = (notify = true) => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('campusflow_token');
    localStorage.removeItem('campusflow_user');
    if (notify) showToast('Logged out successfully', 'info');
  };

  const updateUserLocal = (updatedData) => {
    setUser((prev) => {
      const nextUser = { ...prev, ...updatedData };
      localStorage.setItem('campusflow_user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateUserLocal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
