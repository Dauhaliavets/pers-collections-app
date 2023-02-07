import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { API_URL } from '../../../constants/api'
import {
  DeleteUserByIdRequest,
  FetchUserByIdRequest,
  FetchUsersRequest,
  IUser,
  UpdateUserByIdRequest,
  UsersState,
} from './model'

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk<
  IUser[],
  FetchUsersRequest,
  { rejectValue: { message: string } }
>('users/fetchAll', async ({ token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const data = await (response as Response).json()
      return rejectWithValue(data)
    }
    const user = (await (response as Response).json()) as IUser[]
    return user
  } catch (error) {
    return rejectWithValue({ message: 'Error fetching users' })
  }
})

export const fetchUserById = createAsyncThunk<
  IUser,
  FetchUserByIdRequest,
  { rejectValue: { message: string } }
>('users/fetchById', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const data = await (response as Response).json()
      return rejectWithValue(data)
    }
    const user = (await (response as Response).json()) as IUser
    return user
  } catch (error) {
    return rejectWithValue({ message: 'Error fetching User By ID' })
  }
})

export const deleteUserById = createAsyncThunk<
  IUser,
  DeleteUserByIdRequest,
  { rejectValue: { message: string } }
>('users/deleteById', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const data = await (response as Response).json()
      return rejectWithValue(data)
    }
    const user = (await (response as Response).json()) as IUser
    return user
  } catch (error) {
    return rejectWithValue({ message: 'Error fetching DELETE User By ID' })
  }
})

export const updateUserById = createAsyncThunk<
  IUser,
  UpdateUserByIdRequest,
  { rejectValue: { message: string } }
>('users/updateById', async ({ id, token, newBody }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBody),
    })
    if (!response.ok) {
      const data = await (response as Response).json()
      return rejectWithValue(data)
    }
    const user = (await (response as Response).json()) as IUser
    return user
  } catch (error) {
    return rejectWithValue({ message: 'Error fetching DELETE User By ID' })
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        state.users = [payload]
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteUserById.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((user) => user.id !== payload.id)
        state.isLoading = false
        state.error = null
      })
      .addCase(updateUserById.fulfilled, (state, { payload }) => {
        state.users = state.users.map((user) => (user.id === payload.id ? payload : user))
        state.isLoading = false
        state.error = null
      })
      .addMatcher(
        isAnyOf(
          fetchUsers.pending,
          fetchUserById.pending,
          deleteUserById.pending,
          updateUserById.pending,
        ),
        (state) => {
          state.isLoading = true
          state.error = null
        },
      )
      .addMatcher(
        isAnyOf(
          fetchUsers.rejected,
          fetchUserById.rejected,
          deleteUserById.rejected,
          updateUserById.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as { message: string }
        },
      )
  },
})

// export const { logOut } = usersSlice.actions

export { usersSlice }
