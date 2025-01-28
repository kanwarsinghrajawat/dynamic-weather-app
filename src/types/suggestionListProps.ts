export interface SuggestionsListProps {
  suggestions: string[];
  error: boolean;
  onSelect: (city: string) => void;
}
