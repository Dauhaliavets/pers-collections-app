import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { API_URL } from '../../../constants/api'
import {
  ICollection,
  CollectionsState,
  IRejectValue,
  FetchCollectionsByIdRequest,
  CreateCollectionRequest,
  DeleteCollectionRequest,
  UpdateCollectionRequest,
} from './model'

const initialState: CollectionsState = {
  collections: [],
  isLoading: false,
  error: null,
}

export const fetchCollections = createAsyncThunk<
  ICollection[],
  void,
  { rejectValue: IRejectValue }
>('collections/fetchAll', async (_: void, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}collections`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const data = await response.json()
      return rejectWithValue(data)
    }
    const collections = (await response.json()) as ICollection[]
    return collections
  } catch (error) {
    return rejectWithValue({ message: 'Error fetching Collections' })
  }
})

export const fetchCollectionsByOwnerId = createAsyncThunk<
  ICollection[],
  FetchCollectionsByIdRequest,
  { rejectValue: IRejectValue }
>('collections/fetchByOwnerId', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}collections/ownerId/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const data = await response.json()
      return rejectWithValue(data)
    }
    const collections = (await response.json()) as ICollection[]
    return collections
  } catch (error) {
    return rejectWithValue({ message: 'Error fetching Collections By Owner ID' })
  }
})

export const createCollection = createAsyncThunk<
  ICollection,
  CreateCollectionRequest,
  { rejectValue: IRejectValue }
>('collections/create', async ({ token, body }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      const data = await response.json()
      return rejectWithValue(data)
    }
    const newCollection = (await response.json()) as ICollection
    return newCollection
  } catch (error) {
    return rejectWithValue({ message: 'Error create collection' })
  }
})

export const deleteCollectionById = createAsyncThunk<
  ICollection,
  DeleteCollectionRequest,
  { rejectValue: IRejectValue }
>('collections/delete', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}collections/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const data = await response.json()
      return rejectWithValue(data)
    }
    const deletedCollection = (await response.json()) as ICollection
    return deletedCollection
  } catch (error) {
    return rejectWithValue({ message: 'Error delete Collection By ID' })
  }
})

export const updateCollectionById = createAsyncThunk<
  ICollection,
  UpdateCollectionRequest,
  { rejectValue: IRejectValue }
>('collections/update', async ({ id, token, newBody }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}collections/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBody),
    })
    if (!response.ok) {
      const data = await response.json()
      return rejectWithValue(data)
    }
    const updatedCollection = (await response.json()) as ICollection
    return updatedCollection
  } catch (error) {
    return rejectWithValue({ message: 'Error update Collection By ID' })
  }
})

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.fulfilled, (state, { payload }) => {
        state.collections = payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchCollectionsByOwnerId.fulfilled, (state, { payload }) => {
        state.collections = payload
        state.isLoading = false
        state.error = null
      })
      .addCase(createCollection.fulfilled, (state, { payload }) => {
        state.collections = [...state.collections, payload]
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteCollectionById.fulfilled, (state, { payload }) => {
        state.collections = state.collections.filter((collection) => collection._id !== payload._id)
        state.isLoading = false
        state.error = null
      })
      .addCase(updateCollectionById.fulfilled, (state, { payload }) => {
        state.collections = state.collections.map((collection) =>
          collection._id === collection._id ? payload : collection,
        )
        state.isLoading = false
        state.error = null
      })
      .addMatcher(
        isAnyOf(
          fetchCollections.pending,
          fetchCollectionsByOwnerId.pending,
          createCollection.pending,
          deleteCollectionById.pending,
          updateCollectionById.pending,
        ),
        (state) => {
          state.isLoading = true
          state.error = null
        },
      )
      .addMatcher(
        isAnyOf(
          fetchCollections.rejected,
          fetchCollectionsByOwnerId.rejected,
          createCollection.rejected,
          deleteCollectionById.rejected,
          updateCollectionById.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as IRejectValue
        },
      )
  },
})

export { collectionsSlice }
