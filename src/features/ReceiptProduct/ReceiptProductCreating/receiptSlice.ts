import { createSlice } from '@reduxjs/toolkit';
import { ReceiptsType } from 'src/types/ReceiptType';

export const receiptEditSlice = createSlice({
  name: 'receiptEdit',
  initialState: {
    data: {} as ReceiptsType,
  },
  reducers: {
    updateReceiptEdit: (state, action) => {
      state.data = action.payload;
    },
    addProductReceiptEdit: (state, action) => {
      state.data.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.data.products = state.data.products.filter((product) => product.id !== action.payload);
    },
    changeValueEditReceipt: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    changeReceiptProductEdit: (
      state,
      action: {
        type: string;
        payload: {
          index: number;
          field: any;
        };
      }
    ) => {
      console.log(action.payload);

      state.data = {
        ...state.data,
        products: state.data.products.map((product, index) => {
          return index === action.payload.index ? { ...product, ...action.payload.field } : product;
        }),
      };
    },
  },
});

export const {
  updateReceiptEdit,
  addProductReceiptEdit,
  deleteProduct,
  changeValueEditReceipt,
  changeReceiptProductEdit,
} = receiptEditSlice.actions;
export default receiptEditSlice.reducer;
