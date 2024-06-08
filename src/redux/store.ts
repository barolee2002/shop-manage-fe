import { configureStore } from '@reduxjs/toolkit';
import productEditReducer from 'src/features/Product/ProductCreating/productEditSlice';
import productDetailReducer from 'src/features/Product/ProductDetail/productDetailSlice';
import productReducer from 'src/features/Product/ProductsList/ProductSlice';
import receiptEditReducer from 'src/features/ReceiptProduct/ReceiptProductCreating/receiptSlice';
import alertReducer from 'src/general/components/BaseLayout/alertSlice';
import stockTakeReducer from 'src/features/StokeTake/StockTakeEdit/stockTakeSlice';
import authenReducer from 'src/features/Auth/screens/SignInScreen/authenSlice';
import staffReducer from 'src/features/Staff/StaffEdit/staffSlice';
import inventoryReducer from 'src/features/Auth/screens/SignInScreen/inventorySlice';
const store = configureStore({
  reducer: {
    products: productReducer,
    productDetail: productDetailReducer,
    productEdit: productEditReducer,
    receiptEdit: receiptEditReducer,
    alert: alertReducer,
    stockTakeEdit: stockTakeReducer,
    userLogin: authenReducer,
    staffEdit: staffReducer,
    inventory: inventoryReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
