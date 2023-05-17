import React, { useEffect, useState } from "react";
import css from "./BigMovie.module.css";
import axios from "axios";
import { API_Key } from "../Home.tsx";
import { setMustWatch } from "../../store/HomeSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import MovieBlock from "../MovieBlock/MovieBlock.tsx";
import {
  addToFavoritesThunk,
  movieData,
  requestFavorites,
} from "../../store/FavoritesSlice.ts";
import TrailerBlock from "../tools/TrailerBlock.tsx";
import { requestTrailerURL } from "../../api/api";
import { MyDispatch, RootState } from "../../store/store.ts";

const BigMovie = () => {
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const { mustWatchList } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&language=en-US&sort_by=popularity.desc`
      )
      .then((response) => {
        dispatch(setMustWatch(response.data.results));
      });
  }, []);

  useEffect(() => {
    if (mustWatchList.length > 0) {
      setSelectedMovie(mustWatchList[2].id);
    }
  }, [mustWatchList.length]);

  return (
    <div className={css.container}>
      {selectedMovie && (
        <ShowDisplay
          mustWatchList={mustWatchList}
          selectedMovie={selectedMovie}
        />
      )}

      <div className={css.movieListWrapper}>
        <div className={css.trand}>
          <h2>Trand Movies</h2>
        </div>
        <div className={css.movieList}>
          {mustWatchList.map((x, i) => {
            return <MovieBlock movieData={x} selectMovie={setSelectedMovie} />;
          })}
        </div>
      </div>
    </div>
  );
};

type ShowDisplayProps = {
  selectedMovie: number | null;
  mustWatchList: movieData[];
};

const ShowDisplay: React.FC<ShowDisplayProps> = ({
  selectedMovie,
  mustWatchList,
}) => {
  const dispatch = useDispatch<MyDispatch>();
  const UserID = useSelector((state: RootState) => state.login.account.uid);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [TrailerURL, setTrailerURL] = useState("");
  const neededMovie: movieData | undefined = mustWatchList.find(
    (movie) => movie.id === selectedMovie
  );
  const { favorites, status } = useSelector(
    (state: RootState) => state.favorites
  );

  const addToWatchList = () => {
    if (!UserID) {
      alert("Please, log in first");
    }
    setIsLoading(true);
    dispatch(
      addToFavoritesThunk({ UserID: UserID, selectedMovie: selectedMovie })
    );
  };

  ////////////////// UseEffects /////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const checkFavorite = favorites.some((item) => item === selectedMovie);

    setIsFavorite(checkFavorite);
  }, [favorites.length, selectedMovie]);

  useEffect(() => {
    if (status === "success") {
      setIsLoading(false);
      dispatch(requestFavorites(UserID));
    }
  }, [status]);

  useEffect(() => {
    const getURL = async (id: number) => {
      const vidURL = await requestTrailerURL(id);
      setTrailerURL(vidURL);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (neededMovie) {
      getURL(neededMovie.id);
    }
  }, [selectedMovie]);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  if (!neededMovie) {
    return null; // or render a loading state
  }

  return (
    <div className={css.BigMovie}>
      <div className={css.filmPoster}>
        <div className={css.pic}>
          <img
            src={`http://image.tmdb.org/t/p/w500/${neededMovie.poster_path}`}
          />
          <div className={css.textValues}>
            <h2> {neededMovie.title}</h2>
            <div className={css.description}>{neededMovie.overview}</div>
          </div>
          <div onClick={toggleVideoPlay} className={css.buttons}>
            <div className={css.watch}>Watch</div>
            <div
              onClick={addToWatchList}
              className={isFavorite ? css.favGreen : css.myList}
            >
              To Favorites!
            </div>
            <div className={css.loader}>{isLoading ? "Loading..." : ""}</div>
          </div>
        </div>
      </div>

      <div className={css.youTube}>
        <TrailerBlock trailerURL={TrailerURL} isPlaying={isVideoPlaying} />
      </div>
    </div>
  );
};

export default BigMovie;

// const [showNotification, setShowNotification] = useState(false);
// const [message, setMessage] = useState("");
