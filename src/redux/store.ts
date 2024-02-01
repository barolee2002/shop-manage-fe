import { configureStore } from '@reduxjs/toolkit';
import productDetailReducer from 'src/features/Product/ProductDetail/productDetailSlice';
import productReducer from 'src/features/Product/ProductsList/ProductSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetail : productDetailReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
