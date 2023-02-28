import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { API_URL } from '../../../constants/api'
import { IAuthUser } from '../../../models/User.model'
import { AuthState, IRejectValue, LoginRequest, SignUpRequest } from './authSlice.types'

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isLoading: false,
  error: null,
}

export const logIn = createAsyncThunk<IAuthUser, LoginRequest, { rejectValue: IRejectValue }>(
  'auth/signIn',
  async (loginObj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}auth/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginObj),
      })
      if (!response.ok) {
        const data = await response.json()
        return rejectWithValue(data)
      }
      const user = (await response.json()) as IAuthUser
      return user
    } catch (error) {
      return rejectWithValue({ message: 'Error login' })
    }
  },
)

export const signUp = createAsyncThunk<IAuthUser, SignUpRequest, { rejectValue: IRejectValue }>(
  'auth/signUp',
  async (signUpObj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpObj),
      })
      if (!response.ok) {
        const data = await response.json()
        return rejectWithValue(data)
      }
      const user = (await response.json()) as IAuthUser
      return user
    } catch (error) {
      return rejectWithValue({ message: 'Error signUp' })
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(logIn.pending, signUp.pending), (state) => {
        state.isLoading = true
        state.error = null
      })
      .addMatcher(isAnyOf(logIn.fulfilled, signUp.fulfilled), (state, { payload }) => {
        state.user = payload
        state.isLoading = false
        state.isAuth = true
        state.error = null
      })
      .addMatcher(isAnyOf(logIn.rejected, signUp.rejected), (state, action) => {
        state.isLoading = false
        state.error = action.payload as IRejectValue
      })
  },
})

export const { logOut } = authSlice.actions

export { authSlice }
