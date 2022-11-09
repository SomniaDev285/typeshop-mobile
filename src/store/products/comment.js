import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAxios from '../../lib/fetech';
import { setError } from '../../utils/error';

const initialState = {
  updatedProduct: null,
  refresh: false,
  success: false,
  loading: false,
  error: null,
};

export const createComment = createAsyncThunk(
  'products/comment',
  async (review) => {
    try {
      const { data } = await authAxios.post(
        `/products/${review.id}/reviews`,
        review
      );
      return data;
    } catch (error) {
      const message = setError(error);
      return message;
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.refresh = false;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.updatedProduct = action.payload;
      state.refresh = !state.refresh;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.refresh = false;
    });
  },
});

export default commentSlice;
