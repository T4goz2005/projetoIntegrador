import axios from 'axios';

// Substitua pelo IP da sua máquina
const api = axios.create({
  baseURL: '26.223.111.102', 
  timeout: 5000,
});

export default api;
