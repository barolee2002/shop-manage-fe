import { RootState } from './store';

export const producrSelector = (state: RootState) => state.products.data;
export const productDetailSelector = (state: RootState) => state.productDetail.data;

