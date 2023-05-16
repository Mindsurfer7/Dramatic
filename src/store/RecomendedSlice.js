import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_Key } from "../components/Home";
import axios from "axios";
import {
  addToFavoritesAPI,
  removeFromFavoritesAPI,
  requestFavoritesAPI,
  signInAPI,
} from "../api/api";

//                         here were recomendations based on movie ID but they dont work
// `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_Key}&language=en-US&page=1`

const initialState = {
  recomendations: [],
  loadingStatus: "pending",
};

export const requestRecMovies = createAsyncThunk(
  "recomended/requestRecMovies",
  async ({ movieID }) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${API_Key}&language=en-US&page=1`
    );
    console.log(data);
    return data.results;
  }
);

export const RecomendedReducer = createSlice({
  name: "recomended",
  initialState,
  reducers: {
    // setFavoritesData: (state, action) => {
    //   state.favoritesData = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(requestRecMovies.fulfilled, (state, action) => {
      state.recomendations = action.payload;
      state.loadingStatus = "success";
    });

    builder.addCase(requestRecMovies.rejected, (state, action) => {
      console.log("API error");
    });
    builder.addCase(requestRecMovies.pending, (state, action) => {
      // state.loadingStatus = "pending";
    });
  },
});

export const {} = RecomendedReducer.actions;

export default RecomendedReducer.reducer;
