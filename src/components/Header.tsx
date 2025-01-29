import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTheme } from "../store/slices/themeSlice";
import { ThemeMode } from "../types/theme";
import SearchBar from "./SearchBar";
import { FiSearch } from "react-icons/fi";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";
import { ModalWrapper } from "../utils/ModalWrapper";

const Header: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === ThemeMode.DARK);
  }, [theme]);

  return (
    <>
      <header
        className="flex items-center justify-between px-6 py-4 
    bg-white/10 dark:bg-gray-800/20 backdrop-blur-md 
    shadow-lg rounded-lg"
      >
        <button
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 
      text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          <FiSearch size={20} />
        </button>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full active:scale-95 transition-transform ease-in-out duration-150"
        >
          {theme !== ThemeMode.DARK ? (
            <MdOutlineWbSunny className="w-7 h-7 text-yellow-400 hover:text-yellow-300 transition-all duration-300" />
          ) : (
            <MdOutlineDarkMode className="w-7 h-7 text-gray-600 dark:text-gray-300 hover:text-gray-400 transition-all duration-300" />
          )}
        </button>
      </header>
      <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SearchBar setIsModalOpen={setIsModalOpen} />
      </ModalWrapper>
    </>
  );
};

export default Header;
