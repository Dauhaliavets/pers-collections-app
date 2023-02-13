import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice/authSlice'
import { collectionsSlice } from './slices/collectionsSlice/collectionsSlice'
import { itemsSlice } from './slices/itemsSlice/itemsSlice'
import { usersSlice } from './slices/usersSlice/usersSlice'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  collections: collectionsSlice.reducer,
  items: itemsSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
