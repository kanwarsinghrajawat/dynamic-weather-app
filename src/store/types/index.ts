import { WeatherData } from "../../types/api";

export interface WeatherState {
  data: WeatherData | null;
  cities: { [cityName: string]: WeatherData }; // Stores multiple cities
  loading: boolean;
  error: string | null;
}
