//export const API_URL = 'http://localhost:3000';
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const PRODUCT_URL = '/api/products';
export const AUTH_URL = '/api/auth';

export const getFetchOption = (method: string, body?: object) => ({
    method: `${method}`,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' as RequestCredentials,
    body: body && JSON.stringify(body)
});

export const capitalizeFirst = (str: string) => {
    if (str.length === 0) return str;
    return (str.slice(0, 1).toUpperCase() + str.slice(1));
};