import React from "react";
import "./App.css";
import {Routes, Route} from "react-router";
import AuthPage from "./assets/Pages/AuthPage";
import Home from "./assets/Pages/Home";
import PagenotFound from "./assets/Pages/PagenotFound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
