import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import productsReducer from '../features/products/productsSlice';
import  cartReducer  from '../features/cart/cartSlice';

console.log(productsReducer)
export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        cart: cartReducer
    }
});


// export type RootState = ReturnType<typeof store>