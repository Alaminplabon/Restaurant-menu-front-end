import axios from 'axios';

// Create an Axios instance with default settings
const API = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add an interceptor to include the JWT token in requests
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const login = (data) => API.post('/login', data);
export const signup = (data) => API.post('/signup', data);

export const fetchCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

export const fetchSubcategories = (categoryId) => API.get(`/categories/${categoryId}/subcategories`);
export const createSubcategory = (categoryId, data) => API.post(`/categories/${categoryId}/subcategories`, data);
export const updateSubcategory = (categoryId, subcategoryId, data) => API.put(`/categories/${categoryId}/subcategories/${subcategoryId}`, data);
export const deleteSubcategory = (categoryId, subcategoryId) => API.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);

export const fetchItems = (categoryId, subcategoryId) => API.get(`/categories/${categoryId}/subcategories/${subcategoryId}/items`);
export const createItem = (categoryId, subcategoryId, data) => API.post(`/categories/${categoryId}/subcategories/${subcategoryId}/items`, data);
export const updateItem = (categoryId, subcategoryId, itemId, data) => API.put(`/categories/${categoryId}/subcategories/${subcategoryId}/items/${itemId}`, data);
export const deleteItem = (categoryId, subcategoryId, itemId) => API.delete(`/categories/${categoryId}/subcategories/${subcategoryId}/items/${itemId}`);