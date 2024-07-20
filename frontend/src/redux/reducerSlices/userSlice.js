import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    isLoggedIn: false,
    token: '',
    userDetails: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
   




  },
})

export const{  } = userSlice.actions
export default userSlice.reducer