import React from "react";
import "./App.css";
import {Routes, Route} from "react-router";
import AuthPage from "./assets/Pages/AuthPage";
function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
