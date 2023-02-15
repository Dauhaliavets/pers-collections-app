import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { API_URL } from '../../../constants/api'
import {
  IItem,
  ItemsState,
  IRejectValue,
  FetchItemsByCollectionIdRequest,
  CreateItemRequest,
  DeleteItemRequest,
  UpdateItemRequest,
} from './model'

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: null,
}

export const fetchItems = createAsyncThunk<IItem[], void, { rejectValue: IRejectValue }>(
  'items/fetchAll',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}items`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const data = await response.json()
        return rejectWithValue(data)
      }
      const items = (await response.json()) as IItem[]
      return items
    } catch (error) {
      return rejectWithValue({ message: 'Error fetching ITEMS' })
    }
  },
)

export const fetchItemsByCollectionId = createAsyncThunk<
  IItem[],
  FetchItemsByCollectionIdRequest,
  { rejectValue: IRejectValue }
>('items/fetchItemsByCollectionId', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}items/collectionId/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const data = await response.json()
      return rejectWithValue(data)
    }
    const items = (await response.json()) as IItem[]
    return items
  } catch (error) {
    return rejectWithValue({ message: 'Error fetching Items By collection ID' })
  }
})

export const createItem = createAsyncThunk<IItem, CreateItemRequest, { rejectValue: IRejectValue }>(
  'items/create',
  async ({ token, body }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}items`, {
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
      const newItem = (await response.json()) as IItem
      return newItem
    } catch (error) {
      return rejectWithValue({ message: 'Error Create item' })
    }
  },
)

export const deleteItemById = createAsyncThunk<
  IItem,
  DeleteItemRequest,
  { rejectValue: IRejectValue }
>('items/delete', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}items/${id}`, {
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
    const deletedItem = (await response.json()) as IItem
    return deletedItem
  } catch (error) {
    return rejectWithValue({ message: 'Error delete Item By ID' })
  }
})

export const updateItemById = createAsyncThunk<
  IItem,
  UpdateItemRequest,
  { rejectValue: IRejectValue }
>('items/update', async ({ id, token, newBody }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}items/${id}`, {
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
    const updatedItem = (await response.json()) as IItem
    return updatedItem
  } catch (error) {
    return rejectWithValue({ message: 'Error update Item By ID' })
  }
})

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.items = payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchItemsByCollectionId.fulfilled, (state, { payload }) => {
        state.items = payload
        state.isLoading = false
        state.error = null
      })
      .addCase(createItem.fulfilled, (state, { payload }) => {
        state.items = [...state.items, payload]
        state.isLoading = false
        state.error = null
      })
      .addCase(deleteItemById.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload._id)
        state.isLoading = false
        state.error = null
      })
      .addCase(updateItemById.fulfilled, (state, { payload }) => {
        state.items = state.items.map((item) => (item._id === payload._id ? payload : item))
        state.isLoading = false
        state.error = null
      })
      .addMatcher(
        isAnyOf(
          fetchItems.pending,
          fetchItemsByCollectionId.pending,
          createItem.pending,
          deleteItemById.pending,
          updateItemById.pending,
        ),
        (state) => {
          state.isLoading = true
          state.error = null
        },
      )
      .addMatcher(
        isAnyOf(
          fetchItems.rejected,
          fetchItemsByCollectionId.rejected,
          createItem.rejected,
          deleteItemById.rejected,
          updateItemById.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as IRejectValue
        },
      )
  },
})

export { itemsSlice }
