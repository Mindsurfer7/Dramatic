import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_Key } from "../components/Home.tsx";
import { movieData } from "./FavoritesSlice.ts";

export const requestMovies = createAsyncThunk(
  "home/requestMovies",
  async (searchString: string) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${searchString}`
    );
    console.log(data);
    return data.results as movieData[];
  }
);
export const searchByGenre = createAsyncThunk(
  "home/searchByGenre",
  async (genreID: number) => {
    console.log(genreID);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&with_genres=${genreID}`
    );

    return data.results as movieData[];
  }
);
export const searchByActor = createAsyncThunk(
  "home/searchByActor",
  async (name: string) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${API_Key}&query=${name}`
    );
    const actorId = response.data.results[0].id;

    const moviesResponse = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&with_cast=${actorId}`
    );

    return moviesResponse.data.results;
  }
);

export const requestTV = createAsyncThunk("home/requestTV", async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_Key}&language=en-US&page=1`
  );
  console.log(data);
  return data.results;
});

type homeInitialState = {
  movies: movieData[];
  TVshows: TVshows[];
  mustWatchList: movieData[];
  loadingStatus: string;
};

const initialState: homeInitialState = {
  movies: [],
  TVshows: [],
  mustWatchList: [],
  loadingStatus: "pending",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<movieData[]>) => {
      state.movies = action.payload;
    },
    setMustWatch: (state, action: PayloadAction<movieData[]>) => {
      state.mustWatchList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      requestMovies.fulfilled,
      (state, action: PayloadAction<movieData[]>) => {
        state.movies = action.payload;
        state.loadingStatus = "success";
      }
    );
    builder.addCase(
      requestTV.fulfilled,
      (state, action: PayloadAction<TVshows[]>) => {
        state.TVshows = action.payload;
      }
    );
    builder.addCase(
      searchByGenre.fulfilled,
      (state, action: PayloadAction<movieData[]>) => {
        state.movies = action.payload;
      }
    );
    builder.addCase(
      searchByActor.fulfilled,
      (state, action: PayloadAction<movieData[]>) => {
        state.movies = action.payload;
      }
    );

    builder.addCase(requestMovies.rejected, (state, action) => {
      state.loadingStatus = "error";
      console.log("API error");
    });
    builder.addCase(requestMovies.pending, (state, action) => {
      state.loadingStatus = "pending";
    });
  },
});

export const { setMovies, setMustWatch } = homeSlice.actions;

export default homeSlice.reducer;

export type TVshows = {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  title?: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

// type request = Record<string, string>;

// enum Status {
//   PENDING = "pending",
//   SUCCESS = "success",
//   ERROR = "error",
// }
