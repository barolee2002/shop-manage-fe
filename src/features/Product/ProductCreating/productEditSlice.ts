import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from 'src/types/Product';

export const productEditSlice = createSlice({
  name: 'productEdit',
  initialState: {
    data: {} as ProductType,
  },
  reducers: {
    updateProductEdit: (state, action) => {
      state.data = action.payload;
    },
    addAttribute: (state, action) => {
      state.data.attributes.push(action.payload);
    },
    deleteAttribute: (state, action) => {
      state.data.attributes = state.data.attributes.filter((attribute) => attribute.id !== action.payload)
    },
    changeValue : (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      }
    }
  },
});

export const { updateProductEdit,addAttribute,deleteAttribute } = productEditSlice.actions;
export default productEditSlice.reducer;
