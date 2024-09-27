import { configureStore, createSlice } from "@reduxjs/toolkit";

let currentUser = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    initializeUser(state, action){
      return state = action.payload
    }
  }
})

export let { initializeUser } = currentUser.actions

export default configureStore({
  reducer: {
    currentUser: currentUser.reducer
  }
})