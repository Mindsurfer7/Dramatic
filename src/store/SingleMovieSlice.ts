import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_Key } from "../components/Home.tsx";
import axios from "axios";
import { movieData } from "./FavoritesSlice.ts";

const initialState: singleMovieInitialState = {
  movieData: {} as movieData,
  credits: [],
};

export const requestCredits = createAsyncThunk(
  "singleMovie/requestCredits",
  async (id: string) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_Key}&language=en-US`
    );

    return data;
  }
);

export const SingleMovieSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {
    setMovieData: (state, action) => {
      state.movieData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestCredits.fulfilled, (state, action) => {
      state.credits = action.payload;
    });
  },
});

export const { setMovieData } = SingleMovieSlice.actions;

export default SingleMovieSlice.reducer;

export type Actor = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type singleMovieInitialState = {
  movieData: movieData;
  credits:
    | {
        id: boolean;
        cast: Actor[];
        crew: any;
      }
    | [];
};
