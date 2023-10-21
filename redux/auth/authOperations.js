import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password, name, photo }, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      const data = {
        user: {
          name: user.displayName,
          email: user.email,
          id: user.uid,
          avatar: user.photoURL,
        },
      };

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const user = response.user;

      const data = {
        user: {
          name: user.displayName,
          email: user.email,
          id: user.uid,
          avatar: user.photoURL,
        },
      };

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
