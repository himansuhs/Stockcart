import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      // console.log("userdetail", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
