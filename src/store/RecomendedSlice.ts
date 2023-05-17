import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_Key } from "../components/Home.tsx";
import axios from "axios";
import { movieData } from "./FavoritesSlice.ts";

type recInitialState = {
  recomendations: movieData[] | null;
  loadingStatus: string;
};

const initialState: recInitialState = {
  recomendations: [],
  loadingStatus: "pending",
};

export const requestRecMovies = createAsyncThunk<
  movieData[],
  { movieID: number }
>("recomended/requestRecMovies", async ({ movieID }) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${API_Key}&language=en-US&page=1`
  );

  return data.results;
});

export const RecomendedSlice = createSlice({
  name: "recomended",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requestRecMovies.fulfilled,
      (state, action: PayloadAction<movieData[]>) => {
        state.recomendations = action.payload;
        state.loadingStatus = "success";
      }
    );

    builder.addCase(requestRecMovies.rejected, (state, action) => {
      console.log("API error");
    });
    builder.addCase(requestRecMovies.pending, (state, action) => {});
  },
});

export const {} = RecomendedSlice.actions;

export default RecomendedSlice.reducer;
