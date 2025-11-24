import axios from 'axios';

const baseApiUrl = import.meta.env.VITE_APP_BASE_API_URL;

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});
