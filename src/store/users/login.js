import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicAxios } from '../../lib/fetech';
import { setError } from '../../utils/error';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  isAuth: false,
};

export const userLogin = createAsyncThunk(
  'users/login',
  async (user, thunkAPI) => {
    try {
      const { data } = await publicAxios.post('/users/login', user);

      return data;
    } catch (error) {
      const message = setError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginSlice = createSlice({
  name: 'auth-login',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = null;
      state.isAuth = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      // Add user to the state array
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.isAuth = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    });
  },
});

export const { userLogout, resetError } = loginSlice.actions;

export default loginSlice;
