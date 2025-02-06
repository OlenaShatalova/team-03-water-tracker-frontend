import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { auth } from './auth/slice';
import { waterReducer } from './water/waterSlice';
// import { modal } from './modal/slice';

const persistConfig = {
  key: 'userToken', // ключ для збереження в сховищі
  storage, // сховище (localStorage)
  whitelist: ['token'], // вказуємо, що зберігати
};

const waterPersistConfig = {
  key: 'water',
  storage,
  whitelist: [],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, auth),
    water: persistReducer(waterPersistConfig, waterReducer),
    // modal: modal,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
