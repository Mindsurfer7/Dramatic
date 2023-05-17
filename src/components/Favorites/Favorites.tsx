import React from "react";
import css from "./favorites.module.css";
import axios from "axios";
import { useEffect } from "react";
import { API_Key } from "../Home.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  movieData,
  removeFromFavorites,
  requestFavorites,
  setFavoritesData,
} from "../../store/FavoritesSlice.ts";
import TrailerBlock from "../tools/TrailerBlock.tsx";
import { MyDispatch, RootState } from "~/store/store.ts";

const Favorites: React.FC = () => {
  const UserID = useSelector((state: RootState) => state.login.account.uid);
  const { favorites, favoritesData } = useSelector(
    (state: RootState) => state.favorites
  );
  const dispatch = useDispatch<MyDispatch>();
  console.log(favorites);

  useEffect(() => {
    dispatch(requestFavorites(UserID));

    const fetchData = async () => {
      const movieDataArray = await Promise.all(
        favorites //@ts-ignore
          .filter((movieId) => movieId !== "")
          .map((movieId) =>
            axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_Key}&append_to_response=videos`
            )
          )
      );

      let favoritesData: movieData[] = [];

      movieDataArray.forEach((response) => {
        favoritesData.push(response.data);
      });

      dispatch(setFavoritesData(favoritesData));
    };

    if (favorites.length > 0) {
      fetchData();
    }
  }, [UserID, favorites.length]); //user id needed only while developing

  const deleteHandler = (userID: string | null, movie_ID: number) => {
    if (userID) {
      dispatch(removeFromFavorites({ userID, movie_ID }));
    } else {
      // Handle the case when UserID is null
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>My Favorites</h1>
      </div>
      {favoritesData.map((movie) => {
        return (
          <FavMovie
            movie={movie}
            deleteHandler={deleteHandler}
            UserID={UserID}
          />
        );
      })}
    </div>
  );
};

export default Favorites;

type FavMovieProps = {
  movie: movieData;
  deleteHandler: (userID: string, movie_ID: number) => void;
  UserID: string | null;
};

const FavMovie: React.FC<FavMovieProps> = ({
  movie,
  deleteHandler,
  UserID,
}) => {
  const trailerURL = movie.videos.results.find(
    (video: any) => video.type === "Trailer" //Official T
  );

  return (
    <div className={css.container}>
      <div className={css.flex}>
        <TrailerBlock trailerURL={trailerURL.key} />

        <div className={css.info}>
          <h1>{movie.title}</h1>

          <div className={css.year}>Год: {movie.release_date}</div>
          <div className={css.genres}>
            Жанры: {movie.genres && movie.genres.map((x) => `${x.name}, `)}{" "}
          </div>
          <div className={css.overview}>{movie.overview}</div>
          <div className={css.rating}>Rating: {movie.vote_average}</div>
          <div
            className={css.delBTN}
            onClick={() => {
              if (UserID) {
                deleteHandler(UserID, movie.id);
              }
            }}
          >
            Delete from Favorites
          </div>
        </div>
      </div>
    </div>
  );
};
