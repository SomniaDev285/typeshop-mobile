import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productFilterSlice from './products/filter-products';
import productListSlice from './products/product-list';
import loginSlice from './users/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import cartbasketSlice from './cart/cart';
import { authorizationProvider } from '../lib/fetech';
import userOrdersSlice from './orders/user-orders';
import commentSlice from './products/comment';
import productDetailsSlice from './products/product-details';

const reducers = combineReducers({
  products: productListSlice.reducer,
  productDetails: productDetailsSlice.reducer,
  filterProducts: productFilterSlice.reducer,
  login: loginSlice.reducer,
  cart: cartbasketSlice.reducer,
  //orders
  userOrders: userOrdersSlice.reducer,
  comment: commentSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['filterProducts'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

authorizationProvider(store);
