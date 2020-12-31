import { createSlice } from '@reduxjs/toolkit';

interface UserProps {
    name: string;
    username: string;
    email: string;
  }
  
const initialState: UserProps = {
    name: "",
    username: "",
    email: "",
  }
  
  const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
          addUser(state, action){
            return {...state, ...action.payload};
          }
      }
  })


  export const  { addUser } = userSlice.actions;

  export default userSlice.reducer;