import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("greenTreesLanguage")
    ? localStorage.getItem("greenTreesLanguage")
    : "ar",
};
const languageReducer = createSlice({
  initialState,
  name: "Language-Changer",
  reducers: {
    change: (state, action) => {
      state.language = action?.payload;
      localStorage.setItem("greenTreesLanguage", action?.payload);
    },
  },
});

export const { change } = languageReducer?.actions;
export default languageReducer?.reducer;
