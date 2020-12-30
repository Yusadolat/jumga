import {createSlice} from '@reduxjs/toolkit';



const initialState:any = [];

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts(state, action){
            return [...state, ...action.payload];
        }
    }
})

export const { addProducts } = productsSlice.actions;

export default productsSlice.reducer;