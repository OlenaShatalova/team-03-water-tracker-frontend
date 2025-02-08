import axios from 'axios';
// import { store } from '../redux/store';
// import { logout, refreshUser } from '../redux/auth/operations';

// Створення екземпляру Axios
const api = axios.create({
  baseURL: 'https://watertracker-app-if0o.onrender.com/api',
  // baseURL: 'http://localhost:3000/api/',
  headers: { 'Content-Type': 'application/json' },
});

export default api;

// const getToken = () => {
//   const persistedData = localStorage.getItem('persist:userToken');
//   if (!persistedData) return null;

//   try {
//     const parsedData = JSON.parse(persistedData);
//     return parsedData.token ? parsedData.token.replace(/^"|"$/g, '') : null;
//   } catch (error) {
//     console.error('Error parsing token:', error);
//     return null;
//   }
// };

// // Інтерсептор для запитів
// api.interceptors.request.use(config => {
//   const state = store.getState(); // Отримуємо стан Redux
//   const token = state.auth.token; // Токен беремо з Redux
//   console.log({ state, token });

//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }

//   // Якщо запит використовує Multipart, змінюємо заголовок
//   if (config.headers['Content-Type'] === 'multipart/form-data') {
//     config.headers['Authorization'] = `Bearer ${token}`; // Додаємо токен для multipart запитів
//   }

//   // console.log(token, config);
//   console.log('[REQUEST] Sending request to:', config.url);
//   console.log('[REQUEST] Current token:', token);
//   return config;
// });

// Інтерсептор для відповіді
// api.interceptors.response.use(
//   response => {
//     console.log('[RESPONSE] Success:', response.config.url, response.status);

//     return response;
//   },
//   async error => {
//     console.log(
//       '[ERROR] Response error:',
//       error.response?.status,
//       error.config?.url
//     );

//     const originalRequest = error.config;

//     // Якщо токен невалідний і запит ще не був повторений
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       console.log('[REFRESH] Token expired, trying to refresh...');

//       originalRequest._retry = true;
//       try {
//         const { payload } = await store.dispatch(refreshUser());

//         if (payload?.accessToken) {
//           console.log(
//             '[REFRESH] Token refreshed successfully:',
//             payload.accessToken
//           );

//           originalRequest.headers[
//             'Authorization'
//           ] = `Bearer ${payload.accessToken}`;
//           return api(originalRequest); // Повторюємо оригінальний запит
//         }
//       } catch (refreshError) {
//         console.log('[REFRESH] Token refresh failed, logging out...');

//         store.dispatch(logout()); // Якщо рефреш не вдався – вихід з акаунту
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
