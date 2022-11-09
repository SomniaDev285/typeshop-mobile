import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAxios from '../../lib/fetech';
import { useToast } from 'react-native-toast-notifications';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const userOrders = createAsyncThunk('users/orders', async (thunkAPI) => {
  try {
    const { data } = await authAxios.get('/orders/orders-user');
    return data;
  } catch (error) {
    const message = setError(error);

    return thunkAPI.rejectWithValue(message);
  }
});

export const userOrdersSlice = createSlice({
  name: 'user-orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(userOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userOrdersSlice;
