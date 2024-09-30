import { configureStore, createSlice } from "@reduxjs/toolkit";

let currentUser = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    initializeUser(state, action){
      return state = action.payload
    }
  }
});

let userStatus = createSlice({
  name: 'userStatus',
  initialState: false,
  reducers: {
    isLogin(state, action){
      return state = action.payload
    }
  }
})

export let { initializeUser } = currentUser.actions
export let { isLogin } = userStatus.actions

export default configureStore({
  reducer: {
    currentUser: currentUser.reducer,
    userStatus: currentUser.reducer
  }
})