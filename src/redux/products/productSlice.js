import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://dummyjson.com/products')
    console.log(response)
    return response.data.products
  }
)

const initialState = {
  products: [],
  loading: false,
  error: null,
  searchText: '',
  filteredProducts: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload
    },
    setFilterProduct: (state, action) => {
      state.filteredProducts = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.filteredProducts = action.payload
        state.loading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  },
})

export const { setSearchText, setFilterProduct } = productSlice.actions

export const selectProducts = state => {
  return state.products.products
}

export const selectFilterProducts = state => {
  return state.products.filteredProducts
}

export const productsReducer = productSlice.reducer
