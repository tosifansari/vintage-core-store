import axios from 'axios';

// Render backend URL
export const API_URL = 'https://vintage-core-store.onrender.com';

const API = axios.create({
  baseURL: API_URL,
});

export default API;