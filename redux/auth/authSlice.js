import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, logOutThunk } from "./authOperations";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
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
    updateAvatar: (state, { payload }) => {
      state.user.avatar = payload.photo;
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

export const { refreshUser, updateAvatar } = authSlice.actions;
export const authReducer = authSlice.reducer;
