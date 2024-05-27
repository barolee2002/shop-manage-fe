import { RootState } from './store';

export const productSelector = (state: RootState) => state.products.data;
export const productDetailSelector = (state: RootState) => state.productDetail.data;
export const productEditSelector = (state: RootState) => state.productEdit.data;
export const receiptEditSelector = (state: RootState) => state.receiptEdit.data;
export const alertSelector = (state: RootState) => state.alert.data;
export const stockTakeEditSelector = (state: RootState) => state.stockTakeEdit.data;