export interface City {
  name: string;
}

export interface ApiResponse {
  list: City[];
}

export interface UseCitySuggestionsResult {
  suggestions: string[];
  loading: boolean;
  error: boolean;
  handleDebouncedSearch: (query: string) => void;
}
