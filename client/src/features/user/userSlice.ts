import { createSlice } from '@reduxjs/toolkit';

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
  isSignedIn: boolean;
}
const initialState:User = {
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
  isSignedIn: false
}
  



  const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
        addUser(state, action) {
          state.user = action.payload;
          state.isSignedIn = true;
        }
      },
      
  })

export const { addUser } = userSlice.actions;
  
export default userSlice.reducer;