import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"
import { persistReducer, persistStore } from 'redux-persist'
const storage = {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: { user: persistedReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // redux-persist uses non-serializable values internally
        }),
})

export const persistor = persistStore(store)