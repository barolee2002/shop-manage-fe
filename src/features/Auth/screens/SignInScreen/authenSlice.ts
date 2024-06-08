import { createSlice } from "@reduxjs/toolkit";
import { updateAxiosAccessToken } from "src/api/axiosClient";

import { UserLogin } from "src/types/user.type";
export const authenSlice = createSlice({
  name: 'authentication',
  initialState: {
    data : {} as UserLogin,
  },
  reducers: {
    userLogin: (state, action) => {
        state.data = action.payload;
        updateAxiosAccessToken(state.data.token);
    }
  },
});

export const { userLogin } = authenSlice.actions;
export default authenSlice.reducer;