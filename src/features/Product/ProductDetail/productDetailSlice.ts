import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from 'src/types/Product';

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    data: {} as ProductType,
  },
  reducers: {
    updateProductDetail: (state, action) => {
      state.data = action.payload;
    },
    addAttribute: (state, action) => {
      state.data.attributes.push(action.payload);
    },
    deleteAttribute: (state, action) => {
      state.data.attributes = state.data.attributes.filter((attribute) => attribute.id !== action.payload)
    }
  },
});

export const { updateProductDetail,addAttribute,deleteAttribute } = productDetailSlice.actions;
export default productDetailSlice.reducer;
