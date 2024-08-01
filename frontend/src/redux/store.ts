import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/ProductApi";
import { userApi } from "./api/uesrApi";
import { userReducer } from "./reducer/userReducer";

export const server = import.meta.env.VITE_SERVER
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [userReducer.name]: userReducer.reducer
    },
    middleware: (mid) => mid().concat(userApi.middleware, productAPI.middleware)

})

export type RootState = ReturnType<typeof store.getState>;