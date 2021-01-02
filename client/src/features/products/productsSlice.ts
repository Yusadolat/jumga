import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';



const initialState:any = {
    loading: false,
    error: "",
    products: []
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await fetch('https://jumga.herokuapp.com/api/v1/products');
        const responseJson = await response.json();
        console.log(responseJson)
        return responseJson;
    } catch (error) {
        console.log(error.message);
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
            state.products = payload;
            state.error = "";
            state.loading = false;
          })
          .addCase(fetchProducts.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
          })
      }
})

export default productsSlice.reducer;