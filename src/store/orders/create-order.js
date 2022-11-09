import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAxios from '../../lib/fetech';

const initialState = {
  success: false,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'post/order',
  async (order, thunkAPI) => {
    try {
      const { data } = await authAxios.post(`/orders`, order);
      return data;
    } catch (error) {
      const message = setError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOrderSlice = createSlice({
  name: 'orders-create',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default createOrderSlice;
