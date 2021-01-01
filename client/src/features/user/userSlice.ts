import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import axiosInstance from '../../axios';


interface UserProps {
    fullname: string;
    email: string;
    phone_number: string;
    country: string;
    business_name: string;
    bank_name: string;
    bank_code: string;
    account_number: string;
    password: string;
    isMerchant: boolean;
  }
interface User {
  user: UserProps;
  loading: boolean;
  error: string;
  isSignedIn: boolean;
}
const initialState: User = {
  user: {
    fullname: "",
    email: "",
    phone_number: "",
    country: "",
    business_name: "",
    bank_name: "",
    bank_code: "",
    account_number: "",
    password: "",
    isMerchant: false
},
  loading: false,
  error: "",
  isSignedIn: false
  
  }
  
  export const SignInUser = createAsyncThunk('user/login', async ({email, password}:any) => {
    const user = {
      email,
      password
    }
      axiosInstance.post("/users/login", {
        body: JSON.stringify(user)
      })
      .then((res:any) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => console.log({err}))
  });

  export const RegisterUser = createAsyncThunk('user/register', async (data:any) => {
      
    
    console.log(data)
      axiosInstance.post("/users/register", {
        body: JSON.stringify(data)
      })
      .then((res:any) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => console.log({err}))
  });


  const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
      },
      extraReducers: builder => {
        builder
        .addCase(SignInUser.pending, (state, action) => {
          state.loading = true;
          console.log("fetching")
        })
        .addCase(SignInUser.fulfilled, (state, action) => {
          console.log(action.payload)
          state.loading = false;
        })
        .addCase(SignInUser.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(RegisterUser.pending, (state, action) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(RegisterUser.fulfilled, (state, action) => {
          // const user:any = action.payload;
          console.log(action.payload)
          // state.user = user;
          // state.loading = false;
          
        })
      }
  })


  

  export default userSlice.reducer;