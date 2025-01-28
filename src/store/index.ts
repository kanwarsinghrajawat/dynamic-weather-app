import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./slices/weatherDataSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
