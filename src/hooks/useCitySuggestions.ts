import { useState, useRef, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { API_KEY, CITY_SUGGESTION_API_URL } from "../constants/api";
import {
  ApiResponse,
  UseCitySuggestionsResult,
} from "../types/citySuggestionProps";

export const useCitySuggestions = (): UseCitySuggestionsResult => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchCitySuggestions = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSuggestions([]);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        CITY_SUGGESTION_API_URL,
        {
          params: {
            q: query,
            appid: API_KEY,
            type: "like",
            units: "metric",
          },
        }
      );

      if (response.data?.list?.length > 0) {
        setSuggestions(response.data.list.map((city) => city.name));
      } else {
        setSuggestions([]);
        setError(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setSuggestions([]);
        setError(true);
      } else {
        console.error("Error fetching city suggestions:", error);
        setSuggestions([]);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDebouncedSearch = (query: string): void => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchCitySuggestions(query);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return { suggestions, loading, error, handleDebouncedSearch };
};
