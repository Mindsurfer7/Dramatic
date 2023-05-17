import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  searchString: string;
};

const initialState: initialStateType = {
  searchString: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
  },
});

export const { setSearchString } = filterSlice.actions;

export default filterSlice.reducer;
