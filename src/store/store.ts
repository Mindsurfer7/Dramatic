import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./HomeSlice.ts";
import filterReducer from "./FilterSlice.ts";
import SingleMovieSlice from "./SingleMovieSlice.ts";
import loginReducer from "./LoginSlice.ts";
import favoritesReducer from "./FavoritesSlice.ts";
import RecomendedReducer from "./RecomendedSlice.ts";

export type RootState = ReturnType<typeof DramaticStore.getState>;

export type MyDispatch = typeof DramaticStore.dispatch;

// export const useMyDispatch = () => useDispatch<MyDispatch>();

export const DramaticStore = configureStore({
  reducer: {
    filter: filterReducer,
    home: homeReducer,
    singleMovie: SingleMovieSlice,
    login: loginReducer,
    favorites: favoritesReducer,
    recomended: RecomendedReducer,
  },
});
