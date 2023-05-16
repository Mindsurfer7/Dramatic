import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// type FilterReducer = {
//   categoryID: number;
//   currentPage: number;
//   searchString: string;
//   sort: SortItem;
// };

const initialState = {
  //categoryID: 0,
  //currentPage: 1,
  searchString: "",
  //sort: { name: "популярности", type: "rating" },
};

export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setcategoryID: (state, action) => {
      state.categoryID = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchString: (state, action) => {
      console.log("reduxx");
      state.searchString = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryID = Number(action.payload.categoryID);
    },
  },
});

export const {
  setSort,
  setcategoryID,
  setCurrentPage,
  setSearchString,
  setFilters,
} = filterReducer.actions;

export default filterReducer.reducer;
