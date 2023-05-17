import React, { useCallback, useState } from "react";
import { Button, Input } from "antd";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setSearchString } from "../../store/FilterSlice.ts";
import css from "../Header/header.module.css";

const SearchBtn = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const search2Redux = useCallback(
    debounce((str) => {
      dispatch(setSearchString(str));
    }, 1000),
    [search]
  );

  const searchOnType = (e) => {
    setSearch(e);

    search2Redux(search);
  };
  return (
    <Input
      className={css.search}
      value={search}
      placeholder="movie search..."
      allowClear
      onSearch={setSearch}
      onChange={(e) => searchOnType(e.target.value)}
      style={{ height: 30, width: 200, borderRadius: 15 }}
    />
  );
};
export default SearchBtn;
