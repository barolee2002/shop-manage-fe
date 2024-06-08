import { createSlice } from '@reduxjs/toolkit';
import { UserType } from 'src/types/user.type';

export const StaffEditSlice = createSlice({
  name: 'StaffEdit',
  initialState: {
    data: {} as UserType,
  },
  reducers: {
    updateStaffEdit: (state, action) => {
      state.data = action.payload;
    },
    changeValueEditStaff: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { updateStaffEdit, changeValueEditStaff } = StaffEditSlice.actions;
export default StaffEditSlice.reducer;
