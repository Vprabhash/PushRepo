import axios from 'axios';
import {BASE_URL} from './Apis';

const api = axios.create({
  baseURL: BASE_URL, // Replace with your actual API base URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQzZWE0NTVhZWU1MzkwN2YwMjcwMTg3IiwidXNlcm5hbWUiOiJ2aWthcy5ndXB0YTVAdGhpbmtiYXIuaW4iLCJpYXQiOjE2ODE4MjY5MDEsImV4cCI6MTY4MjQzMTcwMX0.feT3-dcdfv2kPbwyh5xNiEHDKWPm1ofh0XUmL9ppaFg',
  },
});

export default api;
