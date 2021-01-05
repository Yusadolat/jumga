import { createSlice } from '@reduxjs/toolkit';

interface UserProps {
    _id: string;
    fullname: string;
    email: string;
    phone_number: string;
    country: string;
    business_name: string;
    isMerchant: boolean;
    token: string;
    account_status: boolean;
  }
interface User {
  user: UserProps;
  isSignedIn: boolean;
}
const initialState:User = {
  user: {
    _id: "",
    fullname: "",
    email: "",
    phone_number: "",
    country: "",
    business_name: "",
    isMerchant: false,
    token: "",
    account_status: false,
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
        },
        logoutUser(state:any, action) {
          state.user = {...initialState};
          state.isSignedIn = false;
        }
      },
      
  })

export const { addUser, logoutUser } = userSlice.actions;
  
export default userSlice.reducer;