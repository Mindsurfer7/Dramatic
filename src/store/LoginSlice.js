import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_Key } from "../components/Home";
import axios from "axios";
import { signInAPI } from "../api/api";

const initialState = {
  isLogged: false,
  token: "",
  account: {},
};

export const requestToken = createAsyncThunk("login/requestToken", async () => {
  //const { searchString } = params;
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_Key}`
  );
  console.log(data);
  return data;
});
export const createSession = createAsyncThunk(
  "login/requestToken",
  async () => {
    //const { searchString } = params;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_Key}`
    );
    console.log(data);
    return data;
  }
);
export const loginWithGoogle = createAsyncThunk(
  "login/loginWithGoogle",
  async () => {
    const result = await signInAPI();
    return result;
  }
);

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    get: (state, action) => {
      //state.movieData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestToken.fulfilled, (state, action) => {
      state.token = action.payload;
      // state.loadingStatus = "success";
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      const profile = {
        uid: action.payload.profile.uid,
        email: action.payload.profile.email,
        displayName: action.payload.profile.displayName,
        photoURL: action.payload.profile.photoURL,
      };

      state.isLogged = true;
      state.account = profile;
    });
    builder.addCase(requestToken.rejected, (state, action) => {
      // state.loadingStatus = "error";
      console.log("API error");
    });
    builder.addCase(requestToken.pending, (state, action) => {
      // state.loadingStatus = "pending";
    });
  },
});

export const { get } = loginReducer.actions;

export default loginReducer.reducer;
