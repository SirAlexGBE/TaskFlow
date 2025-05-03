import React from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Navbar from "../Components/Navbar";

const DetailsPage = ({tasks, onDelete}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const task = tasks?.find((task) => String(task.id) === id);

  // Removed all console.log statements
  if (!tasks || tasks.length === 0) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleDelete = () => {
    onDelete(task.id);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
      <Navbar />
      <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">{task.title}</h1>
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">{task.description}</p>
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">Status: {task.status}</p>
        <div className="flex justify-between">
          <Link to={`/edit/${task.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Edit
          </Link>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
