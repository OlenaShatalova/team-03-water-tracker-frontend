import axios from 'axios';

// Створення екземпляру Axios
const api = axios.create({
  baseURL: 'https://watertracker-app-if0o.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

// Інтерсептор для відповіді
api.interceptors.response.use(
  response => {
    // Якщо сервер повернув токен після логінізації чи реєстрації
    const {
      data: { data },
    } = response;
    console.log({ data });

    if (data.accessToken) {
      // Записуємо токен в Local Storage
      localStorage.setItem('userToken', data.accessToken);
    }

    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

// Інтерсептор для запитів
api.interceptors.request.use(config => {
  // Якщо є токен, додаємо його до заголовка Authorization
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  console.log(token, config);

  // Якщо запит використовує Multipart, змінюємо заголовок
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    config.headers['Authorization'] = `Bearer ${token}`; // Додаємо токен для multipart запитів
  }

  return config;
});

export default api;
