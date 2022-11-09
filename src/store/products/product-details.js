import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicAxios } from '../../lib/fetech';
import { setError } from '../../utils/error';

const initialState = {
  product: null,
  loading: false,
  error: null,
};

export const getProductById = createAsyncThunk('products/:id', async (id) => {
  try {
    const { data } = await publicAxios.get(`/products/${id}`);
    return data;
  } catch (error) {
    const message = setError(error);
    console.warn(message);
  }
});

const productDetailsSlice = createSlice({
  name: 'products-details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productDetailsSlice;
