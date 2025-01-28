import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "../../types/api";
import { WeatherState } from "../types";

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherDataSlice.actions;

export default weatherDataSlice.reducer;
