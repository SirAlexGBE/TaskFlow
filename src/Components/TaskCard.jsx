import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Lottie from "lottie-react";

export default function TaskCard({task, onDelete}) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
      toast.success("Task deleted");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow mb-4">
      <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">{task.title}</h3>
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">{task.description}</p>
      <div className="flex space-x-2">
        <Link to={`/details/${task.id}`} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          View
        </Link>
        <Link to={`/edit/${task.id}`} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
          Edit
        </Link>
        <button onClick={handleDelete} className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
          <span className="ml-1">Delete</span>
        </button>
      </div>
    </div>
  );
}
