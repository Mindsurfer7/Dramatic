import React, { useState } from "react";
import css from "./singlemovie.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_Key } from "../Home.tsx";
import { useDispatch } from "react-redux";
import IMDB from "../../pics/IMDB.png";
import {
  Actor,
  requestCredits,
  setMovieData,
} from "../../store/SingleMovieSlice.ts";
import { useSelector } from "react-redux";
import TrailerBlock from "../tools/TrailerBlock.tsx";
import { MyDispatch, RootState } from "../../store/store";

const SingleMovie = () => {
  const dispatch = useDispatch<MyDispatch>();
  const { ID } = useParams();
  const { movieData, credits } = useSelector(
    (state: RootState) => state.singleMovie
  );
  const [trailerURL, setTrailerURL] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${ID}?api_key=${API_Key}&append_to_response=videos`
      )
      .then((response) => {
        console.log(response.data);

        dispatch(setMovieData(response.data));

        const officialTrailer = response.data.videos.results.find(
          (video: any) => video.type === "Trailer" //Official T
        );
        if (officialTrailer) {
          setTrailerURL(officialTrailer.key);
        }
      });
  }, [ID]);

  useEffect(() => {
    //@ts-ignore
    dispatch(requestCredits(ID));
  }, [movieData]);

  return (
    movieData && (
      <div className={css.container}>
        <div className={css.movieInfo}>
          <div className={css.imgAndTitle}>
            <div>
              <img
                src={`http://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
              />
            </div>

            <div className={css.title}>{movieData.title}</div>
            <div className={css.overview}>{movieData.overview}</div>
          </div>

          <div className={css.youTube}>
            <TrailerBlock trailerURL={trailerURL} />
          </div>
        </div>
        <div className={css.info}>
          <span className={css.year}>Год: {movieData.release_date}</span>
          <div className={css.genres}>
            Жанры:{" "}
            {movieData.genres && movieData.genres.map((x) => `${x.name}, `)}{" "}
          </div>

          <div className={css.rating}>
            <img src={IMDB} /> {movieData.vote_average}
          </div>
        </div>
        <div className={css.xh2}>
          <h2>Actors of this movie</h2>
        </div>
        <div className={css.castWrapper}>
          {credits &&
            typeof credits === "object" &&
            "cast" in credits &&
            credits.cast.map((actor: Actor) => {
              return (
                <div className={css.cast}>
                  {" "}
                  <div className={css.pic}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    />
                  </div>
                  <div>Имя: {actor.name}</div>
                  <div>Кого Играл: {actor.character}</div>
                  <div>Популярность: {actor.popularity}</div>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default SingleMovie;

// /adult(pin): false
// gender(pin): 2
// id(pin): 62064
// known_for_department(pin): "Acting"
// name(pin): "Chris Pine"
// original_name(pin): "Chris Pine"
// popularity(pin): 47.242
// profile_path(pin): "/d8hGMH1igEFnpNFEEFdP3yFHV3U.jpg"
// cast_id(pin): 20
// character(pin): "Edgin Darvis"
// credit_id(pin): "5fd7fee2420228003e38e9b5"
// order(pin): 0
