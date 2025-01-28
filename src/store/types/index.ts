import { WeatherData } from "../../types/api";

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}
