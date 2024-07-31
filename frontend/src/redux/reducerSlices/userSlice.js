import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    isLoggedIn: false,
    token: '',
    role:'',
    
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
   setLoginDetails(state,action){
    const {role,token,username} = action.payload
return {
    ...state,
    isLoggedIn: true,
    token:token,
    role:role,
    username:username
       }
   }




  },
})

export const{ setLoginDetails } = userSlice.actions
export default userSlice.reducer