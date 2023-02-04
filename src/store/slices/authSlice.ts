import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { API_URL } from '../../constants/api'

interface IUser {
  username: string
  role: 'ADMIN' | 'USER'
  token: string
}

interface AuthState {
  isAuth: boolean
  user: IUser | null
  isLoading: boolean
  error: string | null
}

type LoginRequest = {
  username: string
  password: string
}

type SignUpRequest = {
  username: string
  email: string
  password: string
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isLoading: false,
  error: null,
}

export const logIn = createAsyncThunk<IUser, LoginRequest, { rejectValue: string }>(
  'auth/signIn',
  async (loginObj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginObj),
      })
      const user = (await (response as Response).json()) as IUser
      return user
    } catch (error) {
      console.log('error: ', error)
      return rejectWithValue('Error fetching recipes')
    }
  },
)

export const signUp = createAsyncThunk<IUser, SignUpRequest, { rejectValue: string }>(
  'auth/signUp',
  async (signUpObj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpObj),
      }).catch((error: Error) => error)
      const user = (await (response as Response).json()) as IUser
      return user
    } catch (error) {
      console.log('error: ', error)
      return rejectWithValue('Error fetching recipes')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(logIn.pending, (state) => {
      //   state.isLoading = true
      //   state.error = null
      // })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isLoading = false
        state.isAuth = true
        state.error = null
      })
      // .addCase(logIn.rejected, (state, { payload }) => {
      //   state.isLoading = false
      //   state.error = payload as string
      // })
      // .addCase(signUp.pending, (state) => {
      //   state.isLoading = true
      //   state.error = null
      // })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isLoading = false
        state.isAuth = true
        state.error = null
      })
      // .addCase(signUp.rejected, (state, { payload }) => {
      //   state.isLoading = false
      //   state.error = payload as string
      // })
      .addMatcher(isAnyOf(logIn.pending, signUp.pending), (state) => {
        state.isLoading = true
        state.error = null
      })
      .addMatcher(isAnyOf(logIn.rejected, signUp.rejected), (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

// function isPending(action: AnyAction) {
//   return action.type.endsWith('pending')
// }
// function isFulfilled(action: AnyAction) {
//   return action.type.endsWith('rejected')
// }
// function isRejected(action: AnyAction) {
//   return action.type.endsWith('rejected')
// }

export { authSlice }
