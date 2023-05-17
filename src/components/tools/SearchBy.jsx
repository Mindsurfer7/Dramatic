import React, { useCallback, useEffect, useState } from "react";
import { Button, Input } from "antd";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setSearchString } from "../../store/FilterSlice.ts";
import axios from "axios";
import { API_Key } from "../Home.tsx";
import css from "../home.module.css";
import { searchByGenre } from "../../store/HomeSlice.ts";

const SearchBy = () => {
  const [genres, setGenresList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_Key}&language=en-US`
      )
      .then((response) => {
        console.log(response);
        setGenresList(response.data.genres);
      });
  }, []);

  const handleClick = (id) => {
    dispatch(searchByGenre(id));
  };

  return (
    <div className="genreslist">
      {genres &&
        genres.map((g) => {
          return (
            <div onClick={() => handleClick(g.id)} className={css.anyGenge}>
              {g.name}
            </div>
          );
        })}
    </div>
  );
};
export default SearchBy;
