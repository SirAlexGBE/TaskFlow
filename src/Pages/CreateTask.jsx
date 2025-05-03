import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../Components/Navbar";

const STORAGE_KEY = "tasks";

export default function CreateTask({onAddTask}) {
  const [task, setTask] = useState({title: "", description: "", status: "To Do"});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setTask((prevTask) => ({...prevTask, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newTask = {...task, id: Date.now()};
      onAddTask(newTask);
      navigate("/");
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please try again.");
    }
  };

  return (
    <div style={{background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh"}}>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-black">Create New Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-black">
              Title
            </label>
            <input type="text" id="title" name="title" value={task.title} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-black">
              Description
            </label>
            <textarea id="description" name="description" value={task.description} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-black">
              Status
            </label>
            <select id="status" name="status" value={task.status} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
