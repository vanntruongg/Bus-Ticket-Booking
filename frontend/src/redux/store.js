import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import tripReducer from './tripSlice';
import roundTripTicketReducer from './roundTripTicketSlice';
import sessionExpired from './sessionExpiredSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'trip', 'roundTripTicket', 'sessionExpired'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer,
  roundTripTicket: roundTripTicketReducer,
  sessionExpired: sessionExpired,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
