import { createSlice } from '@reduxjs/toolkit';
import { StockTakeType } from 'src/types/stokeTakeTypes';

export const stockTakeEditSlice = createSlice({
  name: 'stockTakeEdit',
  initialState: {
    data: {} as StockTakeType,
  },
  reducers: {
    updateStockTakeEdit: (state, action) => {
      state.data = action.payload;
    },
    addProductStockTakeEdit: (state, action) => {
      state.data.details.push(action.payload);
    },
    deleteProductStockTake: (state, action) => {
      state.data.details = state.data.details.filter((detail) => detail.productAttribute.id !== action.payload);
    },
    changeValueEditStockTake: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    changeStockTakeProductEdit: (
      state,
      action: {
        type: string;
        payload: {
          index: number;
          field: any;
        };
      }
    ) => {
      state.data = {
        ...state.data,
        details: state.data.details.map((detail, index) => {
          return index === action.payload.index ? { ...detail, ...action.payload.field } : detail;
        }),
      };
    },
  },
});

export const {
  updateStockTakeEdit,
  addProductStockTakeEdit,
  deleteProductStockTake,
  changeValueEditStockTake,
  changeStockTakeProductEdit,
} = stockTakeEditSlice.actions;
export default stockTakeEditSlice.reducer;
