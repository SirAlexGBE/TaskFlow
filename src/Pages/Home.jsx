// File: src/pages/Home.js
import React, {useState, useEffect, useContext} from "react";
import {useSearchParams} from "react-router-dom";
import Navbar from "../Components/Navbar";
import TaskCard from "../Components/TaskCard";
import {AuthContext} from "../Context/AuthContext";

const STORAGE_KEY = "tasks";

export default function Home() {
  const {currentUser} = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const filter = searchParams.get("q") || "";

  // Load saved tasks on mount
  useEffect(() => {
    const loadTasks = () => {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        console.log("Tasks loaded from localStorage:", stored);
        setTasks(stored);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setTasks([]);
      }
    };

    loadTasks();

    // Add event listener to detect changes in localStorage from other tabs/windows
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        loadTasks();
      }
    });

    return () => {
      window.removeEventListener("storage", loadTasks);
    };
  }, []);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const filtered = tasks.filter((t) => {
    if (!t || !t.title) return false;
    const matchesFilter = t.title.toLowerCase().includes(filter.toLowerCase());
    return matchesFilter;
  });

  const columns = [
    {key: "To Do", label: "To Do"},
    {key: "In Progress", label: "In Progress"},
    {key: "Done", label: "Done"},
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-200">
      <Navbar />

      <div className="p-4">
        {/* Welcome Banner */}
        <div className="flex items-center bg-indigo-500 text-white p-4 rounded mb-6 space-x-4">
          <h1 className="text-2xl font-bold">Welcome to Taskflow{currentUser ? `, ${currentUser.fullName}` : ""}!</h1>
        </div>

        {/* Search Bar */}
        <input type="text" placeholder="Search tasks..." value={filter} onChange={(e) => setSearchParams({q: e.target.value})} className="w-full p-2 border rounded mb-4" />

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => (
            <div className="bg-white p-4 rounded shadow" key={col.key}>
              <h2 className="font-bold mb-2 text-xl text-black dark:text-gray-600">{col.label}</h2>
              {filtered
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <TaskCard key={task.id} task={task} onDelete={handleDelete} />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
