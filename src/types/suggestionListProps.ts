export interface SuggestionsListProps {
  suggestions: string[];
  error: string | null;
  onSelect: (city: string) => void;
}
