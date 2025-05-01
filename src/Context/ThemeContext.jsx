// src/context/ThemeContext.js
import React, {createContext, useState, useEffect} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({children}) {
  // 1) initialize from localStorage (or default to light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // 2) whenever `theme` changes, update <html> and localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>;
}
