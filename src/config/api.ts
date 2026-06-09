export const API_URL = 'http://localhost:3000';
export const PRODUCT_URL = '/api/products';
export const AUTH_URL = '/api/auth';

export const getHeaders = () => ({
    'Content-Type': 'application/json'
});

export const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});