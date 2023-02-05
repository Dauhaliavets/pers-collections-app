import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice/authSlice'
import { usersSlice } from './slices/usersSlice/usersSlice'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
