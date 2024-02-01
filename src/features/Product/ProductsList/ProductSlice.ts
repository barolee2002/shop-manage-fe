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
  },
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
