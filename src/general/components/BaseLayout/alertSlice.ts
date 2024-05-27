import { createSlice } from '@reduxjs/toolkit';
import { AlertType } from 'src/types/MetaData';

export const alertSlice = createSlice({
  name: 'receiptEdit',
  initialState: {
    data: {} as AlertType,
  },
  reducers: {
    openAlert: (
      state,
      action: {
        type: any;
        payload: {
          message: string;
          type: any;
        };
      }
    ) => {
      if (!state.data.open) {
        state.data.open = true;
      }
      state.data.message = action.payload.message;
      state.data.type = action.payload.type;
    },
    closeAlert: (state) => {
      state.data.open = false;
      state.data.message = '';
      state.data.type = '';
    },
  },
});

export const { openAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
