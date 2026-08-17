import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://campusflow-ai-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campusflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on 401 unauthorized
      localStorage.removeItem('campusflow_token');
      localStorage.removeItem('campusflow_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        window.location.href = '/login?expired=true';
      }
    }
    const message = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
    return Promise.reject(new Error(message));
  }
);

// API Endpoint Helper Services
export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

export const opportunityService = {
  getOpportunities: (params) => api.get('/opportunities', { params }),
  getById: (id) => api.get(`/opportunities/${id}`),
  create: (data) => api.post('/opportunities', data),
  update: (id, data) => api.put(`/opportunities/${id}`, data),
  delete: (id) => api.delete(`/opportunities/${id}`)
};

export const applicationService = {
  apply: (opportunityId, notes) => api.post('/applications', { opportunityId, notes }),
  getMyApplications: () => api.get('/applications/my'),
  getById: (id) => api.get(`/applications/${id}`),
  getAllAdmin: () => api.get('/admin/applications'),
  updateStatusAdmin: (id, status, note) => api.put(`/admin/applications/${id}/status`, { status, note })
};

export const savedService = {
  save: (opportunityId) => api.post('/saved', { opportunityId }),
  getSaved: () => api.get('/saved'),
  unsave: (id) => api.delete(`/saved/${id}`)
};

export const skillService = {
  analyze: (opportunityId, customRequiredSkills, customStudentSkills) =>
    api.post('/skills/analyze', { opportunityId, customRequiredSkills, customStudentSkills })
};

export const profileService = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  uploadResume: (formData) => api.post('/profile/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteResume: () => api.delete('/profile/resume')
};

export const notificationService = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all')
};

export const adminService = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  toggleUserStatus: (id, isActive) => api.put(`/admin/users/${id}/status`, { isActive })
};

export default api;
