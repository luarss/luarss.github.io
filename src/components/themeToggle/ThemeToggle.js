import React from "react";
import { useTheme, THEME_MODES } from "../../contexts/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { themeMode, setThemeMode } = useTheme();
  const isDark = themeMode === THEME_MODES.DARK;

  const toggleTheme = () => {
    setThemeMode(isDark ? THEME_MODES.LIGHT : THEME_MODES.DARK);
  };

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-icon">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default ThemeToggle;
