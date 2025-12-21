// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    ME: `${API_BASE_URL}/auth/me`,
    GET_ALL_USERS: `${API_BASE_URL}/auth/users`,
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/products`,
    GET_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
    CREATE: `${API_BASE_URL}/products`,
    UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id) => `${API_BASE_URL}/products/${id}`,
  },
  COMPLETE_SETS: {
    GET_ALL: `${API_BASE_URL}/complete-sets`,
    GET_BY_ID: (id) => `${API_BASE_URL}/complete-sets/${id}`,
    CREATE: `${API_BASE_URL}/complete-sets`,
    UPDATE: (id) => `${API_BASE_URL}/complete-sets/${id}`,
    DELETE: (id) => `${API_BASE_URL}/complete-sets/${id}`,
  },
  CONTACTS: {
    GET_ALL: `${API_BASE_URL}/contacts`,
    GET_BY_ID: (id) => `${API_BASE_URL}/contacts/${id}`,
    CREATE: `${API_BASE_URL}/contacts`,
    UPDATE: (id) => `${API_BASE_URL}/contacts/${id}`,
    DELETE: (id) => `${API_BASE_URL}/contacts/${id}`,
  },
  BLOGS: {
    GET_ALL: `${API_BASE_URL}/blogs`,
    GET_BY_ID: (id) => `${API_BASE_URL}/blogs/${id}`,
    CREATE: `${API_BASE_URL}/blogs`,
    UPDATE: (id) => `${API_BASE_URL}/blogs/${id}`,
    DELETE: (id) => `${API_BASE_URL}/blogs/${id}`,
  },
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;

