import axios from 'axios';
import { BASE_URL } from './Apis';

const api = axios.create({
  baseURL: BASE_URL, // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;