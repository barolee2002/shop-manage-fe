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
    addAttributeEdit: (state, action) => {
      state.data.attributes.push(action.payload);
    },
    deleteAttribute: (state, action) => {
      state.data.attributes = state.data.attributes.filter((attribute) => attribute.id !== action.payload);
    },
    changeValueEditProduct: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    changeAttributeEdit: (state, action) => {
      console.log(action.payload);

      state.data = {
        ...state.data,
        attributes: state.data.attributes.map((attribute, index) => {
          return index === action.payload.index ? action.payload.attribute : attribute;
        }),
      };
    },
  },
});

export const { updateProductEdit, changeAttributeEdit, addAttributeEdit, deleteAttribute, changeValueEditProduct } =
  productEditSlice.actions;
export default productEditSlice.reducer;
