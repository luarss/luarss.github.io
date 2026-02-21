import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children, lightTheme, darkTheme }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || THEME_MODES.LIGHT;
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const activeTheme = themeMode === THEME_MODES.DARK ? darkTheme : lightTheme;

  const value = {
    themeMode,
    setThemeMode,
    activeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
