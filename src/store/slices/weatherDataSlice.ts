import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "../../types/api";
import { WeatherState } from "../types";

const initialState: WeatherState = {
  data: null,
  cities: {}, // Stores weather data keyed by city name
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
      state.cities[action.payload.name] = action.payload;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeCity: (state, action: PayloadAction<string>) => {
      const cityName = action.payload;
      delete state.cities[cityName];
    },
  },
});

export const {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  removeCity,
} = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
