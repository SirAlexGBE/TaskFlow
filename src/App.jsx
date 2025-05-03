// File: src/App.js
import React from "react";
import "./index.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./Context/AuthContext";
import {ThemeProvider} from "./Context/ThemeContext";

import AuthPage from "./Pages/AuthPage";
import Home from "./Pages/Home";
import PagenotFound from "./Pages/PagenotFound";
import CreateTask from "./Pages/CreateTask";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<PagenotFound />} />
          <Route path="/create" element={<CreateTask />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
