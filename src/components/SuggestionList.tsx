import React from "react";
import { SuggestionsListProps } from "../types/suggestionListProps";

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  error,
  onSelect,
}) => {
  if (suggestions.length === 0 && !error) return null;

  return (
    <ul className="absolute left-0 w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded shadow-lg">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
      {error && (
        <li className="p-2 text-gray-500 dark:text-gray-400 cursor-default">
          No results found
        </li>
      )}
    </ul>
  );
};

export default SuggestionsList;
