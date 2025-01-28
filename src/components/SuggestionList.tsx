import React from "react";
import { SuggestionsListProps } from "../types/suggestionListProps";

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  error,
  onSelect,
}) => {
  if (suggestions.length === 0 && !error) return null;

  return (
    <ul className="absolute top-10 left-0 w-full bg-white border rounded shadow-lg">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
      {error && (
        <li className="p-2 text-gray-500 cursor-default">No results found</li>
      )}
    </ul>
  );
};

export default SuggestionsList;
