import axios from 'axios';
import { store } from '../redux/store';

// Створення екземпляру Axios
const api = axios.create({
  baseURL: 'https://watertracker-app-if0o.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

// Інтерсептор для запитів
api.interceptors.request.use(config => {
  const state = store.getState(); // Отримуємо стан Redux
  const token = state.auth.token; // Токен беремо з Redux
  console.log({ state, token });

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Якщо запит використовує Multipart, змінюємо заголовок
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    config.headers['Authorization'] = `Bearer ${token}`; // Додаємо токен для multipart запитів
  }

  // console.log(token, config);
  return config;
});

// Інтерсептор для відповіді
api.interceptors.response.use(
  response => {
    // console.log(response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
