import { createSlice } from "@reduxjs/toolkit";
import { inventoryType } from "src/types/inventory";

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    data : [] as inventoryType[],
  },
  reducers: {
    updateInventory: (state, action) => {
        state.data = action.payload;
    }
  },
});

export const { updateInventory } = inventorySlice.actions;
export default inventorySlice.reducer;