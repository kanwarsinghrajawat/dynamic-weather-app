import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTheme } from "../store/slices/themeSlice";
import { ThemeMode } from "../types/theme";

const Header: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === ThemeMode.DARK);
  }, [theme]);

  return (
    <>
      <p className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        Themed content
      </p>

      <button
        onClick={() => dispatch(toggleTheme())}
        className="px-4 py-2 rounded bg-blue-500 dark:bg-red-500 text-white"
      >
        Toggle Theme ({theme === ThemeMode.LIGHT ? "🌞 Light" : "🌙 Dark"})
      </button>
    </>
  );
};

export default Header;
