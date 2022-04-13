import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GameProvider } from "./context/gameContext";
import { ThemeProvider } from "./context/themeContext";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);

const app = <React.StrictMode>
  <ThemeProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </ThemeProvider>
</React.StrictMode>

root.render(app);

reportWebVitals();
