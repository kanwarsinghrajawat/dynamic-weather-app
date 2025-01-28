import axios from "axios";
import { API_KEY, WEATHER_DATA_API_URL } from "../constants/api";
import { WeatherData } from "../types/api";

export const UseWeatherData = async (
  city: string
): Promise<WeatherData | null> => {
  try {
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

    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        `Failed to fetch weather data: ${
          error.response?.data?.message || error.message
        }`
      );
    } else if (error instanceof Error) {
      console.error("General error:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unknown error occurred.");
    }
  }
};
