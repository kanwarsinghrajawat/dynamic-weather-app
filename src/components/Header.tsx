import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { toggleTheme } from "../store/slices/themeSlice";
import { ThemeMode } from "../types/theme";

const Header: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme ({theme === ThemeMode.LIGHT ? "🌞 Light" : "🌙 Dark"})
      </button>
    </div>
  );
};

export default Header;
