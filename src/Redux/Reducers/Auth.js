import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("profile"));
let isAuth = false;
if (user) {
  isAuth = true;
} else {
  isAuth = false;
}

const initialAuthState = {
  isAuth,
  errMessage: null,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.errMessage = null;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuth = false;
      localStorage.clear();
    },
    authError(state, action) {
      state.isAuth = false;
      state.errMessage = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
