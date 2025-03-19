import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import persistedReducer from './auth/credentialSlice';
import { persistStore } from 'redux-persist';
import searchslicereducer from './candidateSearchSlice';

import { apiSlice } from './apiSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        credentials: persistedReducer,
        search:searchslicereducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;