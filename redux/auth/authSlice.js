import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, logOutThunk } from "./authOperations";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    avatar: false,
  },
  stateChanged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshUser: (state, { payload }) => {
      state.user = payload.user;
      state.stateChanged = payload.stateChanged;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logOutThunk.fulfilled, (state) => {
        state.user = initialState.user;
        state.stateChanged = initialState.stateChanged;
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, { payload }) => {
          state.user = payload.user;
          state.stateChanged = true;
        }
      );
  },
});

export const { refreshUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
