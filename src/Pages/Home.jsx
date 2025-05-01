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
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setTasks(stored);
  }, []);

  // Persist tasks whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase()));

  const columns = [
    {key: "todo", label: "To Do"},
    {key: "inprogress", label: "In Progress"},
    {key: "done", label: "Done"},
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            <div key={col.key}>
              <h2 className="font-bold mb-2 text-xl text-gray-700 dark:text-gray-200">{col.label}</h2>
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
