import { RootState } from './store';

export const productSelector = (state: RootState) => state.products.data;
export const productDetailSelector = (state: RootState) => state.productDetail.data;
export const productEditSelector = (state: RootState) => state.productEdit.data;
export const receiptEditSelector = (state: RootState) => state.receiptEdit.data;
export const alertSelector = (state: RootState) => state.alert.data;
export const stockTakeEditSelector = (state: RootState) => state.stockTakeEdit.data;
export const userModelSelector = (state: RootState) => state.userLogin.data;
export const staffEditSelector = (state: RootState) => state.staffEdit.data;
export const inventorySelector = (state: RootState) => state.inventory.data
