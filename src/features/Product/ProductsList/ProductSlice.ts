import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from 'src/types/Product';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [] as ProductType[],
  },
  reducers: {
    updateProduct: (state, action) => {
      state.data = action.payload;
    },
    changeProduct: (state, action) => {
      state.data = state.data.map((data) => {
        return data.id === action.payload.id ? action.payload : data;
      });
    },
  },
});

export const { updateProduct,changeProduct } = productSlice.actions;
export default productSlice.reducer;
