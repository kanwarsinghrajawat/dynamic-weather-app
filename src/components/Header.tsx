import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTheme } from "../store/slices/themeSlice";
import { ThemeMode } from "../types/theme";
import SearchBar from "./SearchBar";
import { FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { ModalWrapper } from "../utils/ModalWrapper";

const Header: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === ThemeMode.DARK);
  }, [theme]);

  return (
    <header
      className="flex items-center justify-between px-6 py-4 
      bg-white/10 dark:bg-gray-800/20 backdrop-blur-md 
      shadow-lg rounded-lg mx-4 mt-4"
    >
      <button
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 
        text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        <FiSearch size={20} />
      </button>

      <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SearchBar setIsModalOpen={setIsModalOpen} />
      </ModalWrapper>
      <div className="flex items-center space-x-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === ThemeMode.DARK}
            onChange={() => dispatch(toggleTheme())}
            className="sr-only peer"
          />
          <div
            className="w-14 h-7 bg-gray-300 dark:bg-gray-700 bg-opacity-50 
            backdrop-blur-lg rounded-full flex items-center transition-all duration-300 p-1 shadow-md relative"
          >
            <FiSun
              className={`absolute left-2 w-5 h-5 text-yellow-400 transition-all duration-300 ${
                theme === ThemeMode.DARK
                  ? "opacity-0 scale-0"
                  : "opacity-100 scale-100"
              }`}
            />
            <FiMoon
              className={`absolute right-2 w-5 h-5 text-gray-200 transition-all duration-300 ${
                theme === ThemeMode.DARK
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
            />
            <div
              className={`w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-lg 
              transition-all duration-300 transform ${
                theme === ThemeMode.DARK ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </div>
        </label>
      </div>
    </header>
  );
};

export default Header;
