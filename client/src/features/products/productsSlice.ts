import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {BASE_URL} from '../../api'

const initialState:any = {
    loading: false,
    error: "",
    products: []
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const responseJson = await response.json();
        return responseJson.data.products;
    } catch (error) {
      return {status: "Failed", message: error.message}
    }
  })

  
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
          .addCase(fetchProducts.pending, (state, action) => {
            state.loading =  true;
            state.error = "";
          })
          .addCase(fetchProducts.fulfilled, (state, {payload}) => {
            if(typeof payload === undefined || payload.status === "Failed"){
              state.error = payload.message || "Something went wrong with the request";
            }
            else {
              state.products = payload;
              state.error = "";
            }
            
            state.loading = false;
          })
          .addCase(fetchProducts.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
          })
      }
})

export default productsSlice.reducer;