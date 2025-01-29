import { createSlice } from "@reduxjs/toolkit";
import { ThemeMode } from "../../types/theme";

const storedTheme =
  (localStorage.getItem("theme") as ThemeMode) || ThemeMode.DARK;

interface ThemeState {
  theme: ThemeMode;
}

const initialState: ThemeState = { theme: storedTheme };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme =
        state.theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
      localStorage.setItem("theme", state.theme);

      if (state.theme === ThemeMode.DARK) {
        document.documentElement.classList.add(ThemeMode.DARK);
      } else {
        document.documentElement.classList.remove(ThemeMode.DARK);
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
