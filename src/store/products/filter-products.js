import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicAxios } from '../../lib/fetech';

const initialState = {
  products: [],
  loading: false,
  error: null,
  categories: [],
  brands: [],
  page: 1,
  pages: 1,
  total: 1,
  brand: '',
  category: '',
};

export const getFilterProducts = createAsyncThunk(
  'products/filter',
  async (u) => {
    try {
      const { data } = await publicAxios.get(
        `/products/search?page=${u.n}&brand=${u.b}&category=${u.c}&query=${u.q}`
      );
      return data;
    } catch (error) {
      const message = setError(error);
      toast.error(message);
    }
  }
);

export const productFilterSlice = createSlice({
  name: 'products-filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilterProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFilterProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.productDocs;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.brands = action.payload.brands;
      state.categories = action.payload.categories;
      state.total = action.payload.countProducts;
    });
    builder.addCase(getFilterProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setCategory, setBrand } = productFilterSlice.actions;
export default productFilterSlice;
