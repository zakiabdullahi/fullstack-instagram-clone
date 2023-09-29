import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/apiSlice/baseApiSlice'
import AuthSliceReducer from "./features/appSlices/authSlice"




export const store = configureStore({

    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthSliceReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})