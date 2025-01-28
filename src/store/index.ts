import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./slices/weatherDataSlice";

export const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
