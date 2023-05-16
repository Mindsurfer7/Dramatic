import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./HomeSlice.js";
import filterReducer from "./FilterSlice.js";
import SingleMovieSlice from "./SingleMovieSlice.js";
import loginReducer from "./LoginSlice.js";
import favoritesReducer from "./FavoritesSlice.js";
import RecomendedReducer from "./RecomendedSlice.js";

// export type RootState = ReturnType<typeof PizzaStore.getState>;

// export type MyDispatch = typeof PizzaStore.dispatch;

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
