import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import expensesReducer from './slices/expenses';
import dateReducer from './slices/date';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['expenses'],
};

const appReducer = combineReducers({
  expenses: expensesReducer,
  date: dateReducer,
});

/* const rootReducer = (state, action) => {
  if (!action) {
    return undefined;
  }
  return appReducer(state, action);
}; */

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
