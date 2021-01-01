import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
    }
});


// export type RootState = ReturnType<typeof store>