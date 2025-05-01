import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";
import {ThemeContext} from "../Context/ThemeContext";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const {currentUser, logout} = useContext(AuthContext);
  const {theme, toggle} = useContext(ThemeContext);

  const handleThemeToggle = () => {
    toggle();
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-blue-900 dark:bg-gray-800">
      {/* Left: App Name & New Task */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white font-bold text-xl hover:opacity-90">
          Taskflow
        </Link>
        <Link to="/create" className="text-blue-200 hover:text-white transition">
          + New Task
        </Link>
      </div>

      {/* Right: Theme Switch, Username, Logout */}
      <div className="flex items-center justify-end space-x-4">
        <button onClick={handleThemeToggle} className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition">
          {theme === "light" ? "🌜" : "🌞"}
        </button>
        <span className="text-blue-100">{currentUser?.fullName}</span>
        <button onClick={logout} className="px-3 py-1 text-sm font-medium text-blue-100 border border-blue-200 rounded hover:bg-blue-800 transition">
          Logout
        </button>
      </div>

      <ToastContainer position="top-right" />
    </nav>
  );
}
