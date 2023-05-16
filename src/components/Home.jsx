import React from "react";
import axios from "axios";
import css from "../styles/home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import MovieBlock from "./MovieBlock";

import BigMovie from "./BigMovie/BigMovie";
import { useSelector } from "react-redux";
import { requestMovies, requestTV, setMovies } from "../store/HomeSlice";
import { useDispatch } from "react-redux";

import MovieBlockPreloader from "./tools/MovieBlockPreloader";
import Recomended from "./Recomended";
import { requestFavorites } from "../store/FavoritesSlice";
import SearchBy from "./tools/SearchBy";

export const API_Key = "90a2d91e59493255d0f5b07d7bb87d05";

const Home = (props) => {
  const dispatch = useDispatch();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  const { isLogged } = useSelector((state) => state.login);
  const UserID = useSelector((state) => state.login.account.uid);
  const [modalWindow, setModalWindow] = useState(false);
  const { movies, loadingStatus, TVshows } = useSelector((state) => state.home);
  const { searchString } = useSelector((state) => state.filter);

  useEffect(() => {
    console.log("yes");
    dispatch(requestMovies(searchString));
  }, [searchString]);

  useEffect(() => {
    dispatch(requestFavorites(UserID));
  }, [isLogged]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_Key}&language=en-US`
      )
      .then((response) => {
        dispatch(setMovies(response.data.results));
      });

    dispatch(requestTV());
  }, []);

  const handleClick = () => {
    setModalWindow(!modalWindow);
  };

  return (
    <div className={css.home}>
      <BigMovie />

      <div className={css.wrapper}>
        <div onClick={handleClick} className={css.filters}>
          FILTERS
        </div>
        <div className={css.items}>
          <h2>Search Movies</h2>
        </div>
        {modalWindow && (
          <div className={css.popUp}>
            <SearchBy />
          </div>
        )}
        <div id="target-M" className={css.movieBlock}>
          {loadingStatus === "pending"
            ? array.map((x) => <MovieBlockPreloader />) // "LOADING..."
            : movies.map((movieData) => {
                return (
                  <MovieBlock
                    movieData={movieData}
                    key={movieData.id}
                    isLink={true}
                    selectMovie={() => {}}
                  />
                );
              })}
        </div>
      </div>
      <Recomended />
      <div id="target-TV" className={css.TVshows}>
        TV Shows
        <div className={css.movieBlock}>
          {loadingStatus === "pending"
            ? array.map((x) => <MovieBlockPreloader />) // "LOADING..."
            : TVshows.map((movieData) => {
                return (
                  <MovieBlock
                    movieData={movieData}
                    key={movieData.id}
                    isLink={true}
                    selectMovie={() => {}}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;

// useEffect(() => {
//   axios
//     .get(
//       `https://api.themoviedb.org/3/discover/tv?api_key=${API_Key}&language=en-US&sort_by=popularity.desc`
//     )
//     .then((response) => {
//       dispatch(setRecomendations(response.data.results));
//       //console.log(response);
//     });
// }, []);

{
  /* <div className={css.movieBlock}>
        Recomended 4 you!
        {loadingStatus === "pending"
          ? "LOADING..."
          : recomended.map((movieData) => {
              return <MovieBlock movieData={movieData} key={movieData.id} />;
            })}
      </div> */
}
