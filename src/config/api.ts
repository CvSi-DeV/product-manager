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

export const getLSInfo = (key: string) => {
    return localStorage.getItem(key);
}

export const setLSInfo = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const removeLSInfo = (key: string) => localStorage.removeItem(key);

export const capitalizeFirst = (str: string) => {
    if (str.length === 0) return str;
    return (str.slice(0, 1).toUpperCase() + str.slice(1));
}