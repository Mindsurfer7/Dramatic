import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToFavoritesAPI,
  removeFromFavoritesAPI,
  requestFavoritesAPI,
} from "../api/api";

export type movieData = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
  };
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: any;
  genres?: Genre[];
};

type Genre = {
  id: number;
  name: string;
};

type initialstate = {
  favorites: number[];
  favoritesData: movieData[];
  status: string;
};

const initialState: initialstate = {
  favorites: [],
  favoritesData: [],
  status: "x",
};

export const addToFavoritesThunk = createAsyncThunk<
  void,
  { UserID: string | null; selectedMovie: number | null }
>("favorites/addToFavoritesThunk", async ({ UserID, selectedMovie }) => {
  await addToFavoritesAPI(UserID, selectedMovie);
});

export const requestFavorites = createAsyncThunk<number[], string | null>(
  "favorites/requestFavorites",
  async (userID) => {
    const result = await requestFavoritesAPI(userID);
    return result;
  }
);
export const removeFromFavorites = createAsyncThunk<
  Promise<{ status: number; message: string }>,
  { userID: string; movie_ID: number }
>("favorites/removeFromFavorites", async ({ userID, movie_ID }) => {
  console.log(userID, movie_ID);
  const result = await removeFromFavoritesAPI(userID, movie_ID);
  return result;
});

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoritesData: (state, action) => {
      state.favoritesData = action.payload;
    },
    resetStatus: (state, action) => {
      state.status = "x";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });

    builder.addCase(requestFavorites.rejected, (state, action) => {
      console.log("API error");
    });
    builder.addCase(requestFavorites.pending, (state, action) => {
      // state.loadingStatus = "pending";
    });
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      //@ts-ignore
      state.favorites.push(""); //= state.favorites.filter((movie) => movie !== movie_ID);
    });
    builder.addCase(addToFavoritesThunk.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(addToFavoritesThunk.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(addToFavoritesThunk.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export const { setFavoritesData, resetStatus } = favoritesSlice.actions;

export default favoritesSlice.reducer;
