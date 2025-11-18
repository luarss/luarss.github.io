import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { chosenLightTheme, chosenDarkTheme } from "./theme";
import { GlobalStyles } from "./global";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function AppContent() {
  const { activeTheme } = useTheme();

  return (
    <StyledThemeProvider theme={activeTheme}>
      <>
        <GlobalStyles />
        <div>
          <Main theme={activeTheme} />
        </div>
      </>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider lightTheme={chosenLightTheme} darkTheme={chosenDarkTheme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
