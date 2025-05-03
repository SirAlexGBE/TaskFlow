// File: src/App.js
import React, {useState, useEffect} from "react";
import "./index.css";
import {Routes, Route} from "react-router-dom";
import {AuthProvider} from "./Context/AuthContext";
import {ThemeProvider} from "./Context/ThemeContext";

import AuthPage from "./Pages/AuthPage";
import Home from "./Pages/Home";
import PagenotFound from "./Pages/PagenotFound";
import DetailsPage from "./Pages/DetailsPage";
import EditPage from "./Pages/EditPage";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleUpdateTask = (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {...task, ...updatedTask} // Merge the original task with updates
          : task
      )
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} onAddTask={handleAddTask} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/details/:id" element={<DetailsPage tasks={tasks} onDelete={handleDeleteTask} />} />
          <Route path="/edit/:id" element={<EditPage tasks={tasks} onUpdate={handleUpdateTask} />} />
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
