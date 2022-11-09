import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicAxios } from '../../lib/fetech';
import { setError } from '../../utils/error';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk('products/list', async () => {
  try {
    const { data } = await publicAxios.get('/products');
    return data;
  } catch (error) {
    const message = setError(error);
    console.warn(message);
  }
});

export const productListSlice = createSlice({
  name: 'products-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productListSlice;
