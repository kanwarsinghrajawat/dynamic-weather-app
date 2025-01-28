import { useDispatch } from "react-redux";
import axios from "axios";
import { API_KEY, WEATHER_DATA_API_URL } from "../constants/api";
import { WeatherData } from "../types/api";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../store/slices/weatherDataSlice";

export const UseWeatherData = () => {
  const dispatch = useDispatch();

  const fetchWeather = async (city: string) => {
    try {
      dispatch(fetchWeatherStart());

      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      const response = await axios.get<WeatherData>(WEATHER_DATA_API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });

      dispatch(fetchWeatherSuccess(response.data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        dispatch(
          fetchWeatherFailure(
            error.response?.data?.message || "Failed to fetch weather data"
          )
        );
      } else if (error instanceof Error) {
        console.error("General error:", error.message);
        dispatch(fetchWeatherFailure(error.message));
      } else {
        console.error("Unexpected error:", error);
        dispatch(fetchWeatherFailure("An unknown error occurred."));
      }
    }
  };

  return { fetchWeather };
};
